"use client";

import { X } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface TEELogsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  agentName: string;
}

interface LogEntry {
  type: 'tweet' | 'trading';
  tweetId?: string;
  checks?: {
    isUnprocessed: boolean;
    isRecent: boolean;
    isReply: boolean;
    isRetweet: boolean;
  };
  pair?: string;
  dex?: string;
  liquidity?: string;
  volume24h?: string;
  priceImpact?: string;
  hasLiquidity?: boolean;
  isViable?: boolean;
}

export default function TEELogsPanel({ isOpen, onClose, agentName }: TEELogsPanelProps) {
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const logsEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      // Connect to SSE endpoint
      const eventSource = new EventSource('/api/tee-logs-ws');
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        console.log('SSE Connection opened');
        setIsLoading(false);
      };

      eventSource.onmessage = (event) => {
        try {
          const entry: LogEntry = JSON.parse(event.data);
          setLogEntries((prev) => {
            // Keep last 100 entries to prevent memory issues
            const newEntries = [...prev, entry];
            return newEntries.slice(-100);
          });
        } catch (error) {
          console.error('Error parsing log entry:', error);
        }
      };

      eventSource.onerror = (error) => {
        console.error('SSE Error:', error);
        eventSource.close();
      };

      return () => {
        eventSource.close();
        eventSourceRef.current = null;
      };
    } else {
      // Clear logs when panel closes
      setLogEntries([]);
      setIsLoading(true);
    }
  }, [isOpen]);

  useEffect(() => {
    // Scroll to bottom when new logs arrive
    if (logEntries.length > 0) {
      scrollToBottom();
    }
  }, [logEntries]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sliding Panel */}
      <div 
        className={`fixed right-0 top-0 h-full w-[640px] bg-gradient-to-br from-gray-900 via-red-950/50 to-black shadow-2xl shadow-red-900/50 z-50 transform transition-transform duration-300 overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-red-950 to-black border-b border-red-900/50 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-bold text-red-100 font-grotesk">TEE VM Logs</h2>
            <p className="text-sm text-orange-400 mt-1">{agentName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-orange-400 hover:text-orange-300 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6" ref={scrollContainerRef}>
          <div className="bg-black rounded-lg p-4 font-mono text-xs border border-red-900/30 h-[calc(100vh-180px)] overflow-y-auto scrollbar-thin scrollbar-thumb-red-800 scrollbar-track-red-950/50 hover:scrollbar-thumb-red-700">
            {isLoading ? (
              <div className="text-center text-gray-500 py-8">
                <div className="animate-pulse">Connecting to TEE stream...</div>
              </div>
            ) : logEntries.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <div>Waiting for logs...</div>
              </div>
            ) : (
              <div className="space-y-1">
                {logEntries.map((entry, index) => {
                  if (entry.type === 'tweet') {
                    const isActive = entry.checks?.isUnprocessed && entry.checks?.isRecent;
                    return (
                      <div key={index} className="mb-2">
                        <div className="text-gray-400">
                          Tweet {entry.tweetId} checks:
                        </div>
                        <div className={`pl-2 ${isActive ? 'text-green-400' : 'text-gray-500'}`}>
                          {JSON.stringify(entry.checks)}
                        </div>
                      </div>
                    );
                  } else if (entry.type === 'trading') {
                    const isViable = entry.isViable;
                    const hasLiquidity = entry.hasLiquidity;
                    let colorClass = 'text-gray-500';
                    if (isViable) {
                      colorClass = 'text-green-400';
                    } else if (hasLiquidity) {
                      colorClass = 'text-yellow-400';
                    }
                    
                    return (
                      <div key={index} className="mb-2">
                        <div className="text-cyan-400">
                          Evaluating liquidity pair {entry.pair} on {entry.dex}:
                        </div>
                        <div className={`pl-2 ${colorClass}`}>
                          {JSON.stringify({
                            liquidity: entry.liquidity,
                            volume24h: entry.volume24h,
                            priceImpact: entry.priceImpact,
                            hasLiquidity: entry.hasLiquidity,
                            isViable: entry.isViable,
                          })}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
                <div ref={logsEndRef} />
              </div>
            )}
          </div>
          
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Live stream • {logEntries.length} entries</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

