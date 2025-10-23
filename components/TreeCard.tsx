"use client";

import { memo } from "react";
import { Handle, Position } from "reactflow";
import { Copy, ExternalLink } from "lucide-react";

interface TreeCardProps {
  data: {
    title: string;
    description: string;
    number?: string;
    tokenCA?: string;
    tokenValue?: string;
    walletAddress?: string;
    balance?: string;
    healthPoints?: number;
    breedProgress?: number;
    tags?: string[];
    badges?: string[];
  };
  isConnectable?: boolean;
}

function TreeCard({ data, isConnectable }: TreeCardProps) {
  return (
    <div className="relative">
        {/* Top handle for receiving connections */}
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
          className="w-3 h-3 !bg-orange-500"
        />
      
      {/* Card Content */}
      <div 
        className="bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 border-2 border-red-300 rounded-2xl shadow-2xl shadow-red-200/50 overflow-hidden w-96 transition-transform hover:scale-[1.02] cursor-pointer"
      >
        {/* Card Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-red-50/80 to-orange-50/80 backdrop-blur-sm border-b border-red-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full border-2 border-orange-500 bg-black flex items-center justify-center p-1.5 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 group">
                <img 
                  src="/images/pfpdr4gon.png" 
                  alt="Dragon Logo" 
                  className="w-full h-full object-contain transition-transform duration-500 ease-in-out group-hover:rotate-[360deg]"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 font-grotesk">
                  {data.title}
                </h3>
                <p className="text-sm text-gray-500 font-mono">
                  {data.number || "#1"} • 1 day ago
                </p>
              </div>
            </div>
            <span className="px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-red-600 text-xs font-semibold rounded-full border border-red-300">
              GEN_1
            </span>
          </div>
        </div>
        
        {/* Card Body */}
        <div 
          className="p-6 space-y-4"
        >
          {/* Token Pair Section */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-lg p-3">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs text-red-700 uppercase tracking-wide font-semibold">Token Pair</span>
              <span className="text-xs text-red-700 uppercase tracking-wide font-semibold">Token Value</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span 
                  className="font-mono text-sm text-orange-600 font-bold"
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  COMING SOON
                </span>
              </div>
              <span className="text-gray-500 font-bold text-lg">N/A</span>
            </div>
          </div>

          {/* Wallet Address Section */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-lg p-3">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs text-red-700 uppercase tracking-wide font-semibold">Wallet Address</span>
              <span className="text-xs text-red-700 uppercase tracking-wide font-semibold">Balance</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <a 
                  href={data.walletAddress ? `https://bscscan.com/address/${data.walletAddress}` : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="font-mono text-sm text-gray-400 hover:text-orange-600 transition-colors cursor-pointer"
                >
                  {data.walletAddress || "—"}
                </a>
                {data.walletAddress && (
                  <button 
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="text-gray-400 hover:text-orange-600 cursor-pointer"
                  >
                    <ExternalLink size={14} />
                  </button>
                )}
              </div>
              <span className="text-gray-500 font-bold text-lg">N/A</span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex gap-2 flex-wrap">
            {(data.badges || ["TEE RUNNING", "BREED INCOMPLETE"]).map((badge, idx) => (
              <span
                key={idx}
                className={`px-3 py-1 text-xs font-semibold rounded border ${
                  idx === 0
                    ? "bg-red-50 text-red-600 border-red-300"
                    : "bg-orange-50 text-orange-700 border-orange-300"
                }`}
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap">
            {(data.tags || ["STRATEGIC", "CUNNING", "LUCKY"]).map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Health Points */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-red-900">HEALTH POINTS</span>
              <span className="text-sm font-bold text-red-900">{data.healthPoints || 100}</span>
            </div>
            <div className="w-full bg-red-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full"
                style={{ width: `${data.healthPoints || 100}%` }}
              ></div>
            </div>
          </div>

          {/* Breed Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-red-900">BREED PROGRESS</span>
              <span className="text-sm font-medium text-gray-600">
                Market Cap: <span className="text-gray-500">N/A</span> <span className="text-orange-600 font-bold">{data.breedProgress || 0}%</span>
              </span>
            </div>
            <div className="w-full bg-red-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full"
                style={{ width: `${data.breedProgress || 0}%` }}
              ></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div 
            className="flex gap-2 pt-2"
            onClick={(e) => e.stopPropagation()}
            style={{ pointerEvents: 'all' }}
          >
            <a 
              href="https://four.meme"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 text-orange-600 border border-orange-300 rounded-lg text-sm font-semibold hover:from-orange-100 hover:to-red-100 transition-colors cursor-pointer"
            >
              <ExternalLink size={14} />
              <span>FOUR.MEME</span>
            </a>
            <a 
              href="https://twitter.com/dr4gondotmeme"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-50 to-red-50 text-red-600 border border-red-300 rounded-lg text-sm font-semibold hover:from-red-100 hover:to-orange-100 transition-colors cursor-pointer"
            >
              <span>𝕏</span>
              <span>DR4GON</span>
            </a>
          </div>
        </div>
      </div>
      
        {/* Bottom handle for connecting to children */}
        <Handle
          type="source"
          position={Position.Bottom}
          isConnectable={isConnectable}
          className="w-3 h-3 !bg-orange-500"
        />
    </div>
  );
}

export default memo(TreeCard);

