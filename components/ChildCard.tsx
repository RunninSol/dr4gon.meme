"use client";

import { memo } from "react";
import { Handle, Position } from "reactflow";
import { Lock } from "lucide-react";

interface ChildCardProps {
  data: {
    title: string;
    genNumber?: string;
    badge?: string;
    variant?: 'red' | 'orange' | 'amber' | 'rose';
  };
  isConnectable?: boolean;
}

function ChildCard({ data, isConnectable }: ChildCardProps) {
  const variant = data.variant || 'red';
  
  // Define color schemes for each variant
  const colorSchemes = {
    red: {
      cardBg: 'from-red-50 via-orange-50 to-red-100',
      border: 'border-red-300',
      shadow: 'shadow-red-300/50',
      headerBg: 'from-red-50/90 via-white to-orange-50/90',
      headerBorder: 'border-red-200',
      avatarBg: 'from-red-300 to-orange-300',
      avatarIcon: 'text-red-700',
      badge: 'from-red-100 to-orange-100 text-red-700 border-red-300',
      iconBg: 'from-red-50 via-white to-orange-50 border-red-200',
      iconColor: 'text-red-400/60',
      lockColor1: 'text-red-500',
      lockBg1: 'bg-red-50/80 border-red-200',
      lockColor2: 'text-orange-500',
      lockBg2: 'bg-orange-50/80 border-orange-200',
      bottomBadge: 'from-red-100 to-orange-100 text-red-800 border-red-300',
    },
    orange: {
      cardBg: 'from-orange-50 via-red-50 to-orange-100',
      border: 'border-orange-300',
      shadow: 'shadow-orange-300/50',
      headerBg: 'from-orange-50/90 via-white to-red-50/90',
      headerBorder: 'border-orange-200',
      avatarBg: 'from-orange-300 to-red-300',
      avatarIcon: 'text-orange-700',
      badge: 'from-orange-100 to-red-100 text-orange-700 border-orange-300',
      iconBg: 'from-orange-50 via-white to-red-50 border-orange-200',
      iconColor: 'text-orange-400/60',
      lockColor1: 'text-orange-500',
      lockBg1: 'bg-orange-50/80 border-orange-200',
      lockColor2: 'text-red-500',
      lockBg2: 'bg-red-50/80 border-red-200',
      bottomBadge: 'from-orange-100 to-red-100 text-orange-800 border-orange-300',
    },
    amber: {
      cardBg: 'from-orange-50 via-amber-50 to-orange-100',
      border: 'border-orange-300',
      shadow: 'shadow-orange-300/50',
      headerBg: 'from-orange-50/90 via-white to-amber-50/90',
      headerBorder: 'border-orange-200',
      avatarBg: 'from-orange-300 to-amber-300',
      avatarIcon: 'text-orange-700',
      badge: 'from-orange-100 to-amber-100 text-orange-700 border-orange-300',
      iconBg: 'from-orange-50 via-white to-amber-50 border-orange-200',
      iconColor: 'text-orange-400/60',
      lockColor1: 'text-orange-500',
      lockBg1: 'bg-orange-50/80 border-orange-200',
      lockColor2: 'text-amber-500',
      lockBg2: 'bg-amber-50/80 border-amber-200',
      bottomBadge: 'from-orange-100 to-amber-100 text-orange-800 border-orange-300',
    },
    rose: {
      cardBg: 'from-rose-50 via-pink-50 to-rose-100',
      border: 'border-rose-300',
      shadow: 'shadow-rose-300/50',
      headerBg: 'from-rose-50/90 via-white to-pink-50/90',
      headerBorder: 'border-rose-200',
      avatarBg: 'from-rose-300 to-pink-300',
      avatarIcon: 'text-rose-700',
      badge: 'from-rose-100 to-pink-100 text-rose-700 border-rose-300',
      iconBg: 'from-rose-50 via-white to-pink-50 border-rose-200',
      iconColor: 'text-rose-400/60',
      lockColor1: 'text-rose-500',
      lockBg1: 'bg-rose-50/80 border-rose-200',
      lockColor2: 'text-pink-500',
      lockBg2: 'bg-pink-50/80 border-pink-200',
      bottomBadge: 'from-rose-100 to-pink-100 text-rose-800 border-rose-300',
    },
  };

  const colors = colorSchemes[variant];
  
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
      <div className={`bg-gradient-to-br ${colors.cardBg} border-2 ${colors.border} border-dashed rounded-2xl shadow-2xl ${colors.shadow} overflow-hidden w-96 transition-transform hover:scale-[1.02]`}>
        {/* Card Header */}
        <div className={`px-6 py-4 bg-gradient-to-r ${colors.headerBg} backdrop-blur-sm border-b ${colors.headerBorder} flex items-center justify-between`}>
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${colors.avatarBg} flex items-center justify-center group cursor-pointer`}>
              <svg 
                stroke="currentColor" 
                fill="currentColor" 
                strokeWidth="0" 
                viewBox="0 0 512 512" 
                className={`w-6 h-6 ${colors.avatarIcon} transition-transform duration-500 ease-in-out group-hover:rotate-[360deg]`}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M256.65 38.984l-49.697 100.702-111.13 16.146 80.413 78.385-18.982 110.68 99.396-52.256 99.397 52.256-18.983-110.68 80.413-78.384-111.127-16.146-49.7-100.702zM112 308.826l-26.674 54.05-59.646 8.665 43.16 42.073-10.188 59.403L112 444.97l53.348 28.046-10.188-59.403 43.16-42.072-59.646-8.665L112 308.825zm288 0l-26.674 54.05-59.646 8.665 43.16 42.073-10.188 59.403L400 444.97l53.348 28.046-10.188-59.403 43.16-42.072-59.646-8.665L400 308.825z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 font-grotesk">
                {data.title}
              </h3>
            </div>
          </div>
          <span className={`px-3 py-1 bg-gradient-to-r ${colors.badge} text-xs font-semibold rounded-full border`}>
            {data.badge || data.genNumber || "GEN_2"}
          </span>
        </div>
        
        {/* Card Body */}
        <div className="p-6">
          <div className="space-y-4">
            {/* Icon/Illustration Area */}
            <div className={`w-full h-40 bg-gradient-to-br ${colors.iconBg} rounded-lg flex flex-col items-center justify-center border ${colors.iconBg.split(' ')[2]} relative`}>
              {/* Three Stars SVG */}
              <svg 
                stroke="currentColor" 
                fill="currentColor" 
                strokeWidth="0" 
                viewBox="0 0 512 512" 
                className={`w-20 h-20 ${colors.iconColor} mb-3`}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M256.65 38.984l-49.697 100.702-111.13 16.146 80.413 78.385-18.982 110.68 99.396-52.256 99.397 52.256-18.983-110.68 80.413-78.384-111.127-16.146-49.7-100.702zM112 308.826l-26.674 54.05-59.646 8.665 43.16 42.073-10.188 59.403L112 444.97l53.348 28.046-10.188-59.403 43.16-42.072-59.646-8.665L112 308.825zm288 0l-26.674 54.05-59.646 8.665 43.16 42.073-10.188 59.403L400 444.97l53.348 28.046-10.188-59.403 43.16-42.072-59.646-8.665L400 308.825z"></path>
              </svg>
              
              {/* Description */}
              <p className="text-gray-500 text-sm text-center font-mono">
                2nd Generation Agent
              </p>
            </div>
            
            {/* Locked Sections */}
            <div className="space-y-2">
              <div className={`flex items-center space-x-2 p-3 ${colors.lockBg1} rounded-lg`}>
                <Lock size={16} className={colors.lockColor1} />
                <span className={`text-sm ${colors.lockColor1.replace('text-', 'text-').replace('/60', '')} font-mono`}>Capabilities</span>
              </div>
              <div className={`flex items-center space-x-2 p-3 ${colors.lockBg2} rounded-lg`}>
                <Lock size={16} className={colors.lockColor2} />
                <span className={`text-sm ${colors.lockColor2.replace('text-', 'text-').replace('/60', '')} font-mono`}>Status</span>
              </div>
              <div className={`flex items-center space-x-2 p-3 ${colors.lockBg1} rounded-lg`}>
                <Lock size={16} className={colors.lockColor1} />
                <span className={`text-sm ${colors.lockColor1.replace('text-', 'text-').replace('/60', '')} font-mono`}>Balance</span>
              </div>
            </div>

            {/* Badge */}
            <div className="flex justify-center pt-2">
              <span className={`px-4 py-1.5 bg-gradient-to-r ${colors.bottomBadge} text-xs font-bold rounded border uppercase tracking-wide`}>
                {data.badge || "PROTOTYPE"}
              </span>
            </div>
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

export default memo(ChildCard);
