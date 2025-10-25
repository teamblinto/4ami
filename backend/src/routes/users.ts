import express from 'express';
import { PrismaClient } from '@prisma/client';
import Joi from 'joi';
import jwt from 'jsonwebtoken';

const router = express.Router();
const prisma = new PrismaClient();

// Middleware to verify JWT token
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret', (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Validation schema
const inviteSchema = Joi.object({
  email: Joi.string().email().required(),
  role: Joi.string().valid('USER', 'COMPANY_ADMIN').default('USER')
});

// POST /api/users/invite
router.post('/invite', authenticateToken, async (req, res) => {
  try {
    const { error, value } = inviteSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, role } = value;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate invitation token
    const token = jwt.sign(
      { email, role, companyId: req.user.companyId },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    // Create invitation
    const invitation = await prisma.userInvitation.create({
      data: {
        email,
        companyId: req.user.companyId,
        invitedById: req.user.userId,
        token,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      },
      include: {
        company: true,
        invitedBy: {
          select: { firstName: true, lastName: true, email: true }
        }
      }
    });

    res.status(201).json({
      message: 'Invitation sent successfully',
      invitation: {
        id: invitation.id,
        email: invitation.email,
        company: invitation.company,
        invitedBy: invitation.invitedBy,
        expiresAt: invitation.expiresAt
      }
    });
  } catch (error) {
    console.error('Invite user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/users
router.get('/', authenticateToken, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { companyId: req.user.companyId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isVerified: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
