import { Router, Request, Response } from 'express';
import { prisma } from '../prisma/prismaClient';
import { client } from '../services/suiClient';

const router = Router();

// Cache for coin metadata to avoid repeated API calls
const metadataCache = new Map<string, { 
  symbol: string; 
  name: string; 
  decimals: number;
  iconUrl: string | null;
} | null>();

// Known token icons (fallback mapping)
const KNOWN_TOKEN_ICONS: Record<string, string> = {
  'SUI': 'https://coin-images.coingecko.com/coins/images/26375/small/sui_asset.jpeg',
  'USDC': 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png',
  'USDT': 'https://coin-images.coingecko.com/coins/images/325/small/Tether.png',
  'WETH': 'https://coin-images.coingecko.com/coins/images/2518/small/weth.png',
  'WBTC': 'https://coin-images.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png',
  'SOL': 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png',
  'CETUS': 'https://coin-images.coingecko.com/coins/images/30556/small/cetus.png',
};

// Fetch coin metadata with caching including icon
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
        decimals: metadata.decimals,
        iconUrl: metadata.iconUrl || null
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

  // Check for SUI native coin first
  if (type === "0x2::sui::SUI" || type.toLowerCase() === "0x2::sui::sui") return "SUI";

  // Extract module/type name from pattern like 0xADDRESS::module::Token
  const moduleMatch = type.match(/::\w+::(\w+)/);
  if (moduleMatch && moduleMatch[1]) {
    return moduleMatch[1].toUpperCase();
  }

  // Last resort: take last segment of type string
  const parts = type.split(/::|</);
  const last = parts[parts.length - 1] ?? type;
  return last.replace(/>.*/g, "").toUpperCase().slice(0, 10);
}

// Generate fallback icon URL
function getFallbackIconUrl(symbol: string): string {
  // Check if we have a known icon for this symbol
  if (KNOWN_TOKEN_ICONS[symbol]) {
    return KNOWN_TOKEN_ICONS[symbol];
  }
  
  // Generate a unique icon using DiceBear
  return `https://api.dicebear.com/7.x/identicon/svg?seed=${symbol}&backgroundColor=3b82f6`;
}

// GET /api/pools - fetch all pools from DB with enhanced data
router.get('/', async (req: Request, res: Response) => {
  try {
    const pools = await prisma.pool.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
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
      
      // Get token symbols and icons
      let token1Symbol = "UNKNOWN";
      let token2Symbol = "UNKNOWN";
      let token1Icon = "";
      let token2Icon = "";
      
      if (pool.token1) {
        const meta1 = await getCoinMetadata(pool.token1);
        token1Symbol = meta1?.symbol || getTokenSymbolFromType(pool.token1);
        token1Icon = meta1?.iconUrl || getFallbackIconUrl(token1Symbol);
      }
      
      if (pool.token2) {
        const meta2 = await getCoinMetadata(pool.token2);
        token2Symbol = meta2?.symbol || getTokenSymbolFromType(pool.token2);
        token2Icon = meta2?.iconUrl || getFallbackIconUrl(token2Symbol);
      }
      
      // Calculate total liquidity
      const totalLiquidity = (reserveA + reserveB).toFixed(2);
      
      return {
        id: pool.poolId,
        poolId: pool.poolId,
        token1: pool.token1 || "",
        token2: pool.token2 || "",
        token1Symbol,
        token2Symbol,
        token1Icon,
        token2Icon,
        reserveA: pool.reserveA.toString(),
        reserveB: pool.reserveB.toString(),
        totalLiquidity,
        price: price,
        apr: "—",
        fee: "0.30%",
        volume: "—",
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