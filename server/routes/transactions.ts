import { Router, Request, Response } from 'express';
import { prisma } from '../prisma/prismaClient';

const router = Router();


function getTokenSymbolFromType(type?: string | null): string | null {
  if (!type) return null;

  if (type === '0x2::sui::SUI' || type.toLowerCase() === '0x2::sui::sui') {
    return 'SUI';
  }

  const match = type.match(/::\w+::(\w+)/);
  if (match?.[1]) return match[1].toUpperCase();

  const parts = type.split(/::|</);
  return parts[parts.length - 1]?.replace(/>.*/g, '').toUpperCase() || null;
}


router.get('/', async (req: Request, res: Response) => {
  try {
    const {
      userAddress,
      type,            // LiquidityAdded | LiquidityRemoved | SwapEvent
      take = '50',
      skip = '0',
    } = req.query;

    const where: any = {};
    if (userAddress) where.userAddress = userAddress;
    if (type) where.type = type;

    const transactions = await prisma.userTransaction.findMany({
      where,
      take: Number(take),
      skip: Number(skip),
      orderBy: { timestamp: 'desc' },
    });

    const total = await prisma.userTransaction.count({ where });

    const data = await Promise.all(
      transactions.map(async (tx) => {
        const pool = tx.poolId
          ? await prisma.pool.findUnique({
              where: { poolId: tx.poolId },
              select: {
                poolId: true,
                token1: true,
                token2: true,
              },
            })
          : null;

        return {
          id: tx.id,
          txDigest: tx.txDigest,
          type: tx.type,
          userAddress: tx.userAddress,
          timestamp: tx.timestamp ? new Date(Number(tx.timestamp)).toISOString() : null,

          token1: tx.token1,
          token2: tx.token2,
          token1Symbol: getTokenSymbolFromType(tx.token1),
          token2Symbol: getTokenSymbolFromType(tx.token2),

          amount1: tx.amount1,
          amount2: tx.amount2,
          lpAmount: tx.lpAmount,

          pool,
        };
      })
    );

    res.json({
      success: true,
      data,
      pagination: {
        total,
        take: Number(take),
        skip: Number(skip),
        hasMore: Number(skip) + Number(take) < total,
      },
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch transactions',
    });
  }
});

export default router;
