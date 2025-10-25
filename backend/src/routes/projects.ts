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

// Validation schemas
const createProjectSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().max(500).optional()
});

// POST /api/projects
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { error, value } = createProjectSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, description } = value;

    const project = await prisma.project.create({
      data: {
        name,
        description,
        companyId: req.user.companyId,
        createdById: req.user.userId
      },
      include: {
        company: {
          select: { id: true, name: true }
        },
        createdBy: {
          select: { id: true, firstName: true, lastName: true, email: true }
        }
      }
    });

    res.status(201).json({
      message: 'Project created successfully',
      project: {
        id: project.id,
        name: project.name,
        description: project.description,
        status: project.status,
        company: project.company,
        createdBy: project.createdBy,
        createdAt: project.createdAt
      }
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/projects
router.get('/', authenticateToken, async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { companyId: req.user.companyId },
      include: {
        createdBy: {
          select: { firstName: true, lastName: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ projects });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/projects/types
router.get('/types', authenticateToken, async (req, res) => {
  try {
    // Return project types/categories
    const projectTypes = [
      { id: 'residual-analysis', name: 'Residual Analysis', description: 'Analysis of residual values' },
      { id: 'asset-management', name: 'Asset Management', description: 'Management of company assets' },
      { id: 'project-reporting', name: 'Project Reporting', description: 'Project status and reporting' },
      { id: 'user-management', name: 'User Management', description: 'User administration and roles' }
    ];

    res.json({ types: projectTypes });
  } catch (error) {
    console.error('Get project types error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
