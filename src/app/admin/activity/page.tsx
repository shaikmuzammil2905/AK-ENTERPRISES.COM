"use client";

import React, { useEffect, useState } from "react";
import { History, Clock, ShieldCheck, RefreshCw, Loader2 } from "lucide-react";
import { getActivityLogs } from "@/lib/db";
import { ActivityLog } from "@/types";

export default function AdminActivityPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const data = await getActivityLogs(100);
      setLogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <History className="w-7 h-7 text-sky-400" />
            <span>Admin Activity Audit Log</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete timestamped record of administrative content changes, additions, and deletions.
          </p>
        </div>

        <button
          onClick={fetchLogs}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-200 rounded-2xl border border-slate-800 flex items-center gap-2 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4 text-[#0BA8EA]" />
          <span>Refresh Audit Feed</span>
        </button>
      </div>

      {/* Logs Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-slate-400 gap-3">
          <Loader2 className="w-8 h-8 text-[#0BA8EA] animate-spin" />
          <span className="text-sm">Fetching activity stream...</span>
        </div>
      ) : logs.length === 0 ? (
        <div className="bg-slate-950 p-12 text-center rounded-3xl border border-slate-800 text-slate-400 space-y-3">
          <History className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Activity Logs Found</h3>
          <p className="text-xs">As admin changes are made to products, categories, or site pages, logs will appear here.</p>
        </div>
      ) : (
        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
          <div className="divide-y divide-slate-800/60">
            {logs.map((log) => (
              <div key={log.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-900/40 transition-colors">
                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-slate-900 rounded-xl border border-slate-800 text-sky-400 shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{log.action}</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400">
                        {log.itemType}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{log.details || `Target Item ID: ${log.itemId}`}</p>
                    <p className="text-[11px] text-slate-500 mt-1 font-mono">By: {log.adminEmail}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-mono shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{new Date(log.createdAt).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
