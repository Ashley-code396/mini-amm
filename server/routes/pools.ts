import { Router, Request, Response } from 'express';
import { prisma } from '../prisma/prismaClient';

const router = Router();

// GET /api/pools - fetch all pools from DB
router.get('/', async (req: Request, res: Response) => {
  try {
    const pools = await prisma.pool.findMany({
      orderBy: { createdAt: 'desc' }, 
    });

    res.json({ success: true, data: pools });
  } catch (err) {
    console.error('Error fetching pools:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch pools' });
  }
});

export default router;
