import { NextRequest } from 'next/server';

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
    type: 'tweet',
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
    type: 'trading',
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

export async function GET(req: NextRequest) {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      
      const sendLog = () => {
        // Randomly choose between tweet and trading log
        const entry = Math.random() > 0.4 ? generateTweetLogEntry() : generateTradingLogEntry();
        
        // Send as Server-Sent Events format
        const data = `data: ${JSON.stringify(entry)}\n\n`;
        controller.enqueue(encoder.encode(data));
      };

      // Send initial log immediately
      sendLog();

      // Then send a new log every 2-4 seconds (randomized for more realistic feel)
      const interval = setInterval(() => {
        sendLog();
      }, Math.random() * 2000 + 2000);

      // Cleanup on close
      req.signal.addEventListener('abort', () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}


