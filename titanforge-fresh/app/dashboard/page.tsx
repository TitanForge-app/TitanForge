'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [isBluetoothConnected, setIsBluetoothConnected] = useState<boolean>(true);

  // Sync with sessionStorage so dashboard matches the Bluetooth page status
  useEffect(() => {
    const checkStatus = () => {
      const saved = sessionStorage.getItem('titanforge_bt_connected');
      if (saved !== null) {
        setIsBluetoothConnected(JSON.parse(saved));
      }
    };

    checkStatus();
    window.addEventListener('storage', checkStatus);
    const interval = setInterval(checkStatus, 500);

    return () => {
      window.removeEventListener('storage', checkStatus);
      clearInterval(interval);
    };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col p-6 selection:bg-red-600 selection:text-white font-mono">
      {/* Top Navbar */}
      <nav className="flex justify-between items-center pb-4 border-b border-zinc-900 mb-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-black tracking-wider">
            TITAN<span className="text-red-600">FORGE</span>
          </Link>
          <span className="text-zinc-700">/</span>
          <span className="text-xs text-red-500 font-bold uppercase">Dashboard</span>
        </div>
        <Link 
          href="/" 
          className="text-xs font-semibold px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 rounded-lg border border-zinc-800 transition-colors text-white inline-block"
        >
          ← Back to Home
        </Link>
      </nav>

      {/* Dashboard Grid */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Load Cell Scale Widget */}
        <Link 
          href="/dashboard/recipe"
          className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800/80 hover:border-red-600 shadow-xl transition-all flex flex-col justify-between group"
        >
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Load Cell Telemetry</span>
            <h2 className="text-xl font-black text-white group-hover:text-red-400 transition-colors">Recipe Board & Scale →</h2>
            <p className="text-xs text-zinc-400 mt-2">Real-time weight calibration, gram precision tracking, and automated macro calculations.</p>
          </div>
          <div className="mt-6 bg-black p-4 rounded-xl border border-zinc-900 flex justify-between items-center">
            <span className="text-xs text-zinc-500">Current Scale Weight</span>
            <span className="text-sm font-bold text-red-400">150g Optimal</span>
          </div>
        </Link>

        {/* Voice & Bluetooth Widget */}
        <Link 
          href="/dashboard/voice"
          className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800/80 hover:border-red-600 shadow-xl transition-all flex flex-col justify-between group"
        >
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Command Interface</span>
            <h2 className="text-xl font-black text-white group-hover:text-red-400 transition-colors">Voice Recognition →</h2>
            <p className="text-xs text-zinc-400 mt-2">View Bluetooth telemetry and hands-free blending presets.</p>
          </div>
          <div className="mt-6 bg-black p-4 rounded-xl border border-zinc-900 flex justify-between items-center">
            <span className="text-xs text-zinc-500">Status</span>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isBluetoothConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
              <span className={`text-xs font-bold ${isBluetoothConnected ? 'text-green-400' : 'text-red-400'}`}>
                {isBluetoothConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
        </Link>

        {/* Biometrics Registry Widget */}
        <Link 
          href="/dashboard/biometrics"
          className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800/80 hover:border-red-600 shadow-xl transition-all flex flex-col justify-between group"
        >
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Hardware Security</span>
            <h2 className="text-xl font-black text-white group-hover:text-red-400 transition-colors">Fingerprint Registry →</h2>
            <p className="text-xs text-zinc-400 mt-2">Manage elite athlete biometric prints, user authentication, and access history.</p>
          </div>
          <div className="mt-6 bg-black p-4 rounded-xl border border-zinc-900 flex justify-between items-center">
            <span className="text-xs text-zinc-500">Active Slots</span>
            <span className="text-sm font-bold text-white">3 / 5 Assigned</span>
          </div>
        </Link>

        {/* Pricing & Investment Tiers Widget */}
        <Link 
          href="/dashboard/pricing"
          className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800/80 hover:border-red-600 shadow-xl transition-all flex flex-col justify-between group"
        >
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Monetization & Pitch</span>
            <h2 className="text-xl font-black text-white group-hover:text-red-400 transition-colors">Pricing Strategy →</h2>
            <p className="text-xs text-zinc-400 mt-2">View hardware MSRP ($299), Pro App SaaS ($9.99/mo), and B2B Dashboard ($149/mo)[span_0](start_span)[span_0](end_span).</p>
          </div>
          <div className="mt-6 bg-black p-4 rounded-xl border border-zinc-900 flex justify-between items-center">
            <span className="text-xs text-zinc-500">Investor Tiers</span>
            <span className="text-sm font-bold text-red-400">View Proposal Setup</span>
          </div>
        </Link>

      </div>
    </main>
  );
}