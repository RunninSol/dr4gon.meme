import { NextResponse } from 'next/server';

// Generate random tweet ID
function generateTweetId(): string {
  return (Math.floor(Math.random() * 900000000000000000) + 1000000000000000000).toString();
}

// Generate random token address
function generateTokenAddress(): string {
  const chars = '0123456789abcdef';
  let address = '0x';
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address;
}

// Token pairs for realistic trading logs
const tokenPairs = [
  { base: 'WBNB', quote: 'BUSD', dex: 'PancakeSwap' },
  { base: 'WBNB', quote: 'USDT', dex: 'PancakeSwap' },
  { base: 'CAKE', quote: 'WBNB', dex: 'PancakeSwap' },
  { base: 'ETH', quote: 'USDC', dex: 'Uniswap' },
  { base: 'PEPE', quote: 'WBNB', dex: 'PancakeSwap' },
  { base: 'SHIB', quote: 'WBNB', dex: 'PancakeSwap' },
  { base: 'DOGE', quote: 'BUSD', dex: 'PancakeSwap' },
  { base: 'BTC', quote: 'USDT', dex: 'Binance DEX' },
  { base: 'ADA', quote: 'WBNB', dex: 'PancakeSwap' },
  { base: 'DOT', quote: 'BUSD', dex: 'PancakeSwap' },
];

// Generate random tweet log entry
function generateTweetLogEntry() {
  const isUnprocessed = Math.random() > 0.7;
  const isRecent = isUnprocessed || Math.random() > 0.5;
  const isReply = Math.random() > 0.3;
  const isRetweet = Math.random() > 0.9;

  return {
    tweetId: generateTweetId(),
    checks: {
      isUnprocessed,
      isRecent,
      isReply,
      isRetweet,
    },
  };
}

// Generate random trading log entry
function generateTradingLogEntry() {
  const pair = tokenPairs[Math.floor(Math.random() * tokenPairs.length)];
  const liquidity = (Math.random() * 5000000 + 100000).toFixed(2);
  const volume24h = (Math.random() * 2000000 + 50000).toFixed(2);
  const priceImpact = (Math.random() * 5).toFixed(3);
  const hasLiquidity = parseFloat(liquidity) > 500000;
  const isViable = hasLiquidity && parseFloat(priceImpact) < 2;

  return {
    pair: `${pair.base}/${pair.quote}`,
    dex: pair.dex,
    address: generateTokenAddress(),
    liquidity: `$${liquidity}`,
    volume24h: `$${volume24h}`,
    priceImpact: `${priceImpact}%`,
    hasLiquidity,
    isViable,
  };
}

// Generate a batch of log entries
function generateLogs(count: number = 50) {
  const logs: string[] = [];
  const mixedEntries: Array<{ type: 'tweet' | 'trading' }> = [];
  
  // Create a mix of tweet and trading logs (60% tweets, 40% trading)
  for (let i = 0; i < count; i++) {
    mixedEntries.push({ type: Math.random() > 0.4 ? 'tweet' : 'trading' });
  }
  
  // Shuffle the entries
  mixedEntries.sort(() => Math.random() - 0.5);
  
  for (const entry of mixedEntries) {
    if (entry.type === 'tweet') {
      const tweetEntry = generateTweetLogEntry();
      logs.push(`   ◎ LOGS`);
      logs.push(`     Tweet ${tweetEntry.tweetId} checks:`);
      logs.push(`     ${JSON.stringify(tweetEntry.checks)}`);
    } else {
      const tradingEntry = generateTradingLogEntry();
      logs.push(`   ◎ LOGS`);
      logs.push(`     Evaluating liquidity pair ${tradingEntry.pair} on ${tradingEntry.dex}:`);
      logs.push(`     ${JSON.stringify({
        liquidity: tradingEntry.liquidity,
        volume24h: tradingEntry.volume24h,
        priceImpact: tradingEntry.priceImpact,
        hasLiquidity: tradingEntry.hasLiquidity,
        isViable: tradingEntry.isViable,
      })}`);
    }
  }
  
  logs.push(`   ["◎ Finished checking Twitter interactions"]`);
  logs.push(`   ["◎ Finished evaluating liquidity pools"]`);
  
  return logs.join('\n');
}

export async function GET() {
  const logs = generateLogs(50);
  
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    logs: logs,
  });
}

