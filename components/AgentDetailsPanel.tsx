"use client";

import { X, ExternalLink, Copy } from "lucide-react";
import { useState } from "react";
import TEELogsPanel from "./TEELogsPanel";

interface AgentDetailsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

export default function AgentDetailsPanel({ isOpen, onClose, data }: AgentDetailsPanelProps) {
  const [logsOpen, setLogsOpen] = useState(false);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sliding Panel */}
      <div 
        className={`fixed right-0 top-0 h-full w-[480px] bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 shadow-2xl shadow-red-900/50 z-50 transform transition-transform duration-300 overflow-y-auto border-l-2 border-red-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient */}
        <div className="sticky top-0 bg-gradient-to-r from-red-50/95 to-orange-50/95 backdrop-blur-md border-b-2 border-red-200 px-6 py-4 flex items-center justify-between z-10 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 font-grotesk">Agent Details</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-600 transition-colors p-1 hover:bg-red-100 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Agent Profile Card */}
          <div className="bg-gradient-to-br from-white/80 to-orange-50/80 border-2 border-red-200 rounded-xl p-5 shadow-lg">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 rounded-full border-2 border-orange-500 bg-black flex items-center justify-center p-2 shadow-lg shadow-orange-500/30 group">
                <img 
                  src="/images/pfpdr4gon.png" 
                  alt="Dragon Logo" 
                  className="w-full h-full object-contain transition-transform duration-500 ease-in-out group-hover:rotate-[360deg]"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 font-grotesk">{data.title}</h3>
                <p className="text-sm text-gray-500 font-mono mt-1">Created October 14, 2025</p>
              </div>
            </div>

            {/* Badges */}
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-red-600 text-xs font-semibold rounded-full border border-red-300">
                GEN_1
              </span>
              <span className="px-3 py-1 bg-gradient-to-r from-red-100 to-orange-100 text-orange-600 text-xs font-semibold rounded-full border border-orange-300">
                ID_1
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <a
              href="https://four.meme"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-50 to-orange-50 text-orange-600 border-2 border-orange-300 rounded-xl text-sm font-semibold hover:from-orange-100 hover:to-red-100 transition-all hover:shadow-md"
            >
              <ExternalLink size={16} />
              <span>FOUR.MEME</span>
            </a>
            <a
              href="https://twitter.com/dr4gon"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-orange-50 to-red-50 text-red-600 border-2 border-red-300 rounded-xl text-sm font-semibold hover:from-red-100 hover:to-orange-100 transition-all hover:shadow-md"
            >
              <span>𝕏</span>
              <span>DR4GON</span>
            </a>
          </div>

          {/* TEE VM Section */}
          <div className="bg-gradient-to-br from-white/80 to-red-50/80 border-2 border-red-200 rounded-xl p-5 shadow-lg">
            <h4 className="text-lg font-bold text-gray-900 mb-4 font-grotesk flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></span>
              TEE VM
            </h4>
            <div className="space-y-4">
              {/* TEE Verified Link */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-4">
                <a
                  href="https://proof.t16z.com/reports/1f0808d6f55d281119d13ad8cff826c76456540461d7d215f349625cd2ec199b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-green-700 font-grotesk">TEE VERIFIED</div>
                      <div className="text-xs text-green-600 font-mono">View Attestation Report</div>
                    </div>
                  </div>
                  <ExternalLink size={16} className="text-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg">
                <span className="text-sm font-semibold text-gray-700 font-mono">Status</span>
                <span className="px-3 py-1.5 bg-gradient-to-r from-orange-100 to-red-100 text-orange-600 border border-orange-300 rounded-lg text-sm font-semibold">
                  RUNNING
                </span>
              </div>

              {/* TEE Logs Box */}
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-4 font-mono text-sm border-2 border-red-900/30 shadow-inner">
                <div className="text-orange-400 mb-2 flex items-center">
                  <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span>
                  [INFO] Initializing TEE environment for {data.title}
                </div>
                <div className="text-gray-500 mb-3 flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-2"></span>
                  [DEBUG] Loading security modules...
                </div>
                <button
                  onClick={() => setLogsOpen(true)}
                  className="mt-3 px-4 py-2 bg-gradient-to-r from-orange-900/50 to-red-900/50 hover:from-orange-800/70 hover:to-red-800/70 text-orange-300 hover:text-orange-200 transition-all text-xs flex items-center space-x-2 rounded-lg border border-orange-800/50"
                >
                  <span>&gt;_</span>
                  <span>View Full Logs</span>
                </button>
              </div>
            </div>
          </div>

          {/* Wallet Information */}
          <div className="bg-gradient-to-br from-white/80 to-orange-50/80 border-2 border-orange-200 rounded-xl p-5 shadow-lg">
            <h4 className="text-lg font-bold text-gray-900 mb-4 font-grotesk">Wallet Information</h4>
            
            {/* Wallet Address */}
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-red-700 uppercase tracking-wide font-semibold">Wallet Address</span>
                  <button className="text-orange-600 hover:text-orange-700">
                    <Copy size={14} />
                  </button>
                </div>
                <div className="font-mono text-sm text-gray-600 break-all">
                  {data.walletAddress || "—"}
                </div>
              </div>

              {/* Balance */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-orange-700 uppercase tracking-wide font-semibold">Balance</span>
                  <span className="text-lg font-bold text-gray-700">{data.balance || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-white/80 to-red-50/80 border-2 border-red-200 rounded-xl p-4 shadow-lg">
              <div className="text-xs text-red-700 uppercase tracking-wide font-semibold mb-2">Health Points</div>
              <div className="text-2xl font-bold text-gray-900 font-grotesk">{data.healthPoints || 100}%</div>
              <div className="w-full bg-red-100 rounded-full h-2 mt-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full transition-all"
                  style={{ width: `${data.healthPoints || 100}%` }}
                ></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-white/80 to-orange-50/80 border-2 border-orange-200 rounded-xl p-4 shadow-lg">
              <div className="text-xs text-orange-700 uppercase tracking-wide font-semibold mb-2">Breed Progress</div>
              <div className="text-2xl font-bold text-gray-900 font-grotesk">{data.breedProgress || 0}%</div>
              <div className="w-full bg-orange-100 rounded-full h-2 mt-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full transition-all"
                  style={{ width: `${data.breedProgress || 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TEE Logs Panel */}
      <TEELogsPanel 
        isOpen={logsOpen}
        onClose={() => setLogsOpen(false)}
        agentName={data.title}
      />
    </>
  );
}
