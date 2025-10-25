import express from 'express';
import { PrismaClient } from '@prisma/client';
import Joi from 'joi';

const router = express.Router();
const prisma = new PrismaClient();

// Validation schema
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  domain: Joi.string().domain().optional()
});

// POST /api/companies/register
router.post('/register', async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, domain } = value;

    // Check if company already exists
    const existingCompany = await prisma.company.findFirst({
      where: {
        OR: [
          { name },
          ...(domain ? [{ domain }] : [])
        ]
      }
    });

    if (existingCompany) {
      return res.status(400).json({ message: 'Company already exists' });
    }

    // Create company
    const company = await prisma.company.create({
      data: { name, domain }
    });

    res.status(201).json({
      message: 'Company registered successfully',
      company: {
        id: company.id,
        name: company.name,
        domain: company.domain,
        createdAt: company.createdAt
      }
    });
  } catch (error) {
    console.error('Company registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
