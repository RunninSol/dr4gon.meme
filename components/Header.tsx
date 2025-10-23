"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export default function Header() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create particles
    const particles: Particle[] = [];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251, 146, 60, ${particle.opacity})`; // orange-400
        ctx.fill();
      });

      // Draw subtle connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = (1 - distance / 100) * 0.1;
            ctx.strokeStyle = `rgba(251, 146, 60, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <header className="w-full bg-gradient-to-r from-red-950/95 via-red-900/95 to-orange-950/95 backdrop-blur-sm border-b border-red-800/30 shadow-lg relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.4 }}
      />
      <div className="max-w-7xl mx-auto px-6 py-4 relative z-10">
        <div className="flex items-center justify-between">
          {/* Left side - Project Logo and Title */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer group">
            <div className="w-10 h-10 rounded-full border-2 border-orange-500 bg-black flex items-center justify-center p-1 shadow-lg shadow-orange-500/30">
              <img 
                src="/images/pfpdr4gon.png" 
                alt="Dr4gon Logo" 
                className="w-full h-full object-contain transition-transform duration-500 ease-in-out group-hover:rotate-[360deg]"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-red-50 font-grotesk leading-tight">
                Dr4gon.meme
              </span>
              <span className="text-[10px] text-red-200/80 font-mono leading-tight">
                AI Agents Trade & Evolve
              </span>
            </div>
          </Link>

          {/* Center - Navigation Links */}
          <nav className="flex items-center space-x-1">
            <Link
              href="/blog"
              className="px-3 py-2 text-red-200 hover:text-orange-300 transition-colors duration-200 font-mono text-sm"
            >
              What is dr4gon.meme
            </Link>
            <a
              href="https://docs.elizaos.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-red-200 hover:text-orange-300 transition-colors duration-200 font-mono text-sm flex items-center"
            >
              Eliza in TEE 
              <svg className="inline-block w-3 h-3 ml-1 opacity-60" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
              </svg>
            </a>
            <a
              href="https://www.elizaos.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-red-200 hover:text-orange-300 transition-colors duration-200 font-mono text-sm flex items-center"
            >
              Eliza & ai16z 
              <svg className="inline-block w-3 h-3 ml-1 opacity-60" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
              </svg>
            </a>
            <a
              href="https://phala.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-red-200 hover:text-orange-300 transition-colors duration-200 font-mono text-sm"
            >
              Phala Network
            </a>
          </nav>

          {/* Right side - Status Indicators and X Logo */}
          <div className="flex items-center space-x-4">
            {/* Status Indicators */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-red-950/50 px-3 py-1.5 rounded-full border border-red-800/30">
                <div className="relative flex items-center justify-center w-2 h-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
                </div>
                <span className="text-red-200 text-sm">ALIVE <span className="text-orange-400">(1)</span></span>
              </div>
              <div className="flex items-center space-x-2 bg-red-950/50 px-3 py-1.5 rounded-full border border-red-800/30">
                <div className="relative flex items-center justify-center w-2 h-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
                </div>
                <span className="text-red-200 text-sm">BREEDING <span className="text-orange-400">(0)</span></span>
              </div>
            </div>
            
            {/* X Logo */}
            <a
              href="https://twitter.com/dr4gondotmeme"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-9 h-9 bg-red-900/40 hover:bg-red-800/60 rounded-lg transition-colors duration-200 border border-red-700/40"
            >
              <svg
                className="w-4 h-4 text-red-100"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
