# Railway Deployment Guide for Dr4gon.meme

## Prerequisites
- Railway account (sign up at https://railway.app)
- GitHub account (recommended for automatic deployments)

## Deployment Steps

### Option 1: Deploy from GitHub (Recommended)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Railway**
   - Go to https://railway.app/new
   - Click "Deploy from GitHub repo"
   - Select your repository
   - Railway will automatically detect Next.js and deploy

3. **Configure Environment Variables** (if needed)
   - Go to your project settings in Railway
   - Add any environment variables from `.env.example`

4. **Access Your Deployment**
   - Railway will provide a URL like `https://your-app.railway.app`
   - Your site will be live!

### Option 2: Deploy with Railway CLI

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**
   ```bash
   railway login
   ```

3. **Initialize Project**
   ```bash
   railway init
   ```

4. **Deploy**
   ```bash
   railway up
   ```

5. **Generate Domain**
   ```bash
   railway domain
   ```

## Configuration Files

The following files have been created for Railway deployment:

- **`railway.json`** - Railway configuration
- **`nixpacks.toml`** - Build configuration for Nixpacks
- **`.railwayignore`** - Files to ignore during deployment
- **`.env.example`** - Environment variables template

## Build Configuration

- **Node Version**: 20.x
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`
- **Port**: Railway automatically assigns (Next.js uses PORT env var)

## Features Enabled

✅ Server-Sent Events (SSE) for real-time logs  
✅ Static assets from `/public` directory  
✅ API routes for TEE logs  
✅ Automatic restarts on failure  

## Troubleshooting

### Build Fails
- Check Node.js version (should be 20.x)
- Ensure all dependencies are in `package.json`
- Check build logs in Railway dashboard

### Application Won't Start
- Verify `npm run start` works locally
- Check Railway logs for errors
- Ensure PORT environment variable is used

### Static Assets Not Loading
- Verify files are in `/public` directory
- Check Railway logs for 404 errors
- Ensure image paths start with `/` (e.g., `/images/logo.png`)

## Automatic Deployments

Railway will automatically deploy when you:
- Push to your main branch (GitHub)
- Manually trigger from Railway dashboard

## Custom Domain

To add a custom domain:
1. Go to your project settings in Railway
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## Monitoring

Railway provides:
- Real-time logs
- Metrics (CPU, Memory, Network)
- Deployment history
- Build logs

Access these in your Railway dashboard.

## Cost

Railway offers:
- **Free Tier**: $5 credit/month (sufficient for hobby projects)
- **Pro Plan**: $20/month with more resources

Monitor your usage in the Railway dashboard.

## Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Next.js Docs: https://nextjs.org/docs

