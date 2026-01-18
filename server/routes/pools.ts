import { Router, Request, Response } from 'express';
import { prisma } from '../prisma/prismaClient';
import { client } from '../services/suiClient';

const router = Router();

// Cache for coin metadata to avoid repeated API calls
const metadataCache = new Map<string, { symbol: string; name: string; decimals: number } | null>();

// Fetch coin metadata with caching
async function getCoinMetadata(coinType: string) {
  if (metadataCache.has(coinType)) {
    return metadataCache.get(coinType);
  }

  try {
    const metadata = await client.getCoinMetadata({ coinType });
    
    if (metadata) {
      const result = {
        symbol: metadata.symbol,
        name: metadata.name,
        decimals: metadata.decimals
      };
      metadataCache.set(coinType, result);
      return result;
    }
    
    metadataCache.set(coinType, null);
    return null;
  } catch (error) {
    console.error(`Error fetching metadata for ${coinType}:`, error);
    metadataCache.set(coinType, null);
    return null;
  }
}

// Fallback: extract symbol from coin type string
function getTokenSymbolFromType(type: string): string {
  if (!type) return "UNKNOWN";
  const lower = type.toLowerCase();
  
  // Check for SUI native coin first
  if (type === "0x2::sui::SUI" || lower === "0x2::sui::sui") return "SUI";
  
  // Common token mappings
  if (lower.includes("usdc")) return "USDC";
  if (lower.includes("usdt")) return "USDT";
  if (lower.includes("weth")) return "WETH";
  if (lower.includes("wbtc")) return "WBTC";
  if (lower.includes("wal")) return "WAL";
  if (lower.includes("sol")) return "SOL";
  if (lower.includes("cetus")) return "CETUS";
  if (lower.includes("turbos")) return "TURBOS";
  
  // Extract module name from pattern like 0xADDRESS::module::Type
  const moduleMatch = type.match(/::\w+::(\w+)/);
  if (moduleMatch && moduleMatch[1]) {
    return moduleMatch[1].toUpperCase();
  }
  
  // Last resort: extract last segment
  const parts = type.split(/::|</);
  const last = parts[parts.length - 1] ?? type;
  return last.replace(/>.*/g, "").toUpperCase().slice(0, 10);
}

// GET /api/pools - fetch all pools from DB with enhanced data
router.get('/', async (req: Request, res: Response) => {
  try {
    const pools = await prisma.pool.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Fetch metadata for all unique token types
    const uniqueTokenTypes = new Set<string>();
    pools.forEach(pool => {
      if (pool.token1) uniqueTokenTypes.add(pool.token1);
      if (pool.token2) uniqueTokenTypes.add(pool.token2);
    });

    // Fetch all metadata in parallel
    await Promise.all(
      Array.from(uniqueTokenTypes).map(type => getCoinMetadata(type))
    );

    // Convert BigInt fields to string and add computed fields
    const serializedPools = await Promise.all(pools.map(async pool => {
      const reserveA = Number(pool.reserveA) / 1e9;
      const reserveB = Number(pool.reserveB) / 1e9;
      
      // Calculate price (tokenB per tokenA)
      const price = reserveA > 0 ? (reserveB / reserveA).toFixed(4) : "—";
      
      // Get token symbols - first try metadata, then fallback to parsing
      let token1Symbol = "UNKNOWN";
      let token2Symbol = "UNKNOWN";
      
      if (pool.token1) {
        const meta1 = await getCoinMetadata(pool.token1);
        token1Symbol = meta1?.symbol || getTokenSymbolFromType(pool.token1);
      }
      
      if (pool.token2) {
        const meta2 = await getCoinMetadata(pool.token2);
        token2Symbol = meta2?.symbol || getTokenSymbolFromType(pool.token2);
      }
      
      // Calculate total liquidity in USD (you can enhance this with real price feeds)
      const totalLiquidity = (reserveA + reserveB).toFixed(2);
      
      return {
        id: pool.poolId, // Use poolId as the id for the frontend
        poolId: pool.poolId,
        token1: pool.token1 || "",
        token2: pool.token2 || "",
        token1Symbol,
        token2Symbol,
        reserveA: pool.reserveA.toString(),
        reserveB: pool.reserveB.toString(),
        totalLiquidity,
        price: price,
        apr: "—", // Calculate based on fees earned / liquidity
        fee: "0.30%", // Your pool's fee rate
        volume: "—", // Track this separately in your DB
        createdAt: pool.createdAt.toISOString(),
      };
    }));

    res.json({ success: true, data: serializedPools });
  } catch (err) {
    console.error('Error fetching pools:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch pools' });
  }
});

export default router;