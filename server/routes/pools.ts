import { Router, Request, Response } from 'express';
import { prisma } from '../prisma/prismaClient';

const router = Router();

// GET /api/pools - fetch all pools from DB
router.get('/', async (req: Request, res: Response) => {
  try {
    const pools = await prisma.pool.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Convert BigInt fields to string
    const serializedPools = pools.map(pool => ({
      ...pool,
      id: pool.id.toString(),
      createdAt: pool.createdAt.toISOString(), // if it's Date, optional
      // convert BigInt fields to strings
      reserveA: pool.reserveA.toString(),
      reserveB: pool.reserveB.toString(),
      // compute totalLiquidity from reserves (both are bigint)
      totalLiquidity: (pool.reserveA + pool.reserveB).toString(),
    }));

    res.json({ success: true, data: serializedPools });
  } catch (err) {
    console.error('Error fetching pools:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch pools' });
  }
});


export default router;
