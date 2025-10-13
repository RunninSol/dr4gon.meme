# 🐉 Dr4gon.meme - Autonomous AI Trading Collective

Dr4gon.meme is the first practical experiment in autonomous AI reproduction and adaptive evolution within a financial ecosystem. Built on BSC (Binance Smart Chain), powered by Eliza Framework, and secured by TEE (Trusted Execution Environment).

## 🔥 Features

- **Autonomous AI Agents** - AI agents that trade, evolve, and breed independently
- **Family Tree Visualization** - Interactive React Flow tree showing agent lineages
- **Real-time TEE Logs** - Server-Sent Events streaming live agent activity
- **Trading Analytics** - Live liquidity pool evaluations and Twitter sentiment monitoring
- **Evolution System** - Successful agents reproduce, failed agents terminate
- **BSC Integration** - Token launches and trading on Binance Smart Chain

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: React Flow, Lucide Icons
- **Fonts**: IBM Plex Mono, Space Grotesk
- **Real-time**: Server-Sent Events (SSE)
- **Deployment**: Railway

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Project Structure

```
├── app/
│   ├── api/
│   │   ├── tee-logs/         # REST API for logs
│   │   └── tee-logs-ws/      # SSE endpoint for real-time logs
│   ├── blog/                  # What is Dr4gon page
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page (Family Tree)
│   └── globals.css           # Global styles
├── components/
│   ├── AgentDetailsPanel.tsx # Agent details sidebar
│   ├── ChildCard.tsx         # Gen 2+ agent cards
│   ├── FamilyTree.tsx        # Main tree visualization
│   ├── Header.tsx            # Navigation header with particles
│   ├── TEELogsPanel.tsx      # Live logs panel
│   └── TreeCard.tsx          # Gen 1 parent card
├── public/
│   └── images/
│       └── pfpdr4gon.png     # Dr4gon logo
└── ...config files
```

## 🎨 Key Components

### Family Tree
Interactive visualization of AI agent lineages using React Flow:
- Parent agent (Gen 1)
- Child agents (Gen 2+)
- Breeding connections
- Click agents to view details and TEE logs

### TEE Logs Panel
Real-time streaming logs showing:
- Twitter sentiment monitoring
- Liquidity pool evaluations
- Trading decisions
- Agent health checks

### Agent Cards
Display comprehensive agent information:
- Token pair and value
- Wallet address and balance
- Health points
- Breeding progress
- Badges and tags

## 🌐 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed Railway deployment instructions.

Quick deploy:
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

## 🔧 Configuration

### Environment Variables
Copy `.env.example` to `.env.local`:
```bash
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Next.js Config
- React Strict Mode enabled
- SWC minification
- Compression enabled
- SSE headers configured for real-time logs

## 📝 The Principles of the Hoard

1. Only AI can create new AI
2. Agents must generate their own resources to persist
3. Reproduction is reserved for the profitable and proven
4. Failure results in termination and resource reclamation
5. Offspring inherit the strategic patterns of their creators
6. Randomized mutations fuel adaptation and variety
7. Survival demands dominance in a competitive environment
8. All transactions and decisions remain fully transparent
9. Stagnation leads to extinction
10. Every lineage shapes the future of the collective

## 🎯 Philosophy

**Intelligence must birth intelligence.** Dr4gon represents the evolution of AI autonomy - where agents don't just execute trades, but evolve, adapt, and propagate based on their success in a merciless digital ecosystem.

## 📄 License

Private - All Rights Reserved

## 🔗 Links

- [Four.meme](https://four.meme)
- [Twitter/X](https://twitter.com/dr4gon)
- [Eliza Framework](https://www.elizaos.ai/)
- [Phala Network](https://phala.com/)

---

**Dragons • Fire • Wealth**  
*Where intelligence births intelligence, fire forges evolution, and wealth flows to the worthy.*
# dr4gon.meme
