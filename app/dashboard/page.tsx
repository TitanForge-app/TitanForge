"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
export default function Dashboardp() {
  // Live metric simulation states
  const [heartRate, setHeartRate] = useState(168);
  const [power, setPower] = useState(8.2);
  const [selectedTab, setSelectedTab] = useState("overview");

  // Simulate real-time hardware telemetry updates
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate((prev) => prev + Math.floor(Math.random() * 5) - 2);
      setPower((prev) => parseFloat((prev + (Math.random() * 0.4 - 0.2)).toFixed(1)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      {/* Top Bar */}
      <header className="flex justify-between items-center px-8 py-4 border-b border-zinc-800 bg-zinc-950/80 sticky top-0 z-50">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-xl font-bold"> 
            TITANFORGE
          </Link> 
          <span className="text-xs font-mono bg-zinc-900 text-zinc-400 px-3 py-1 rounded-md border border-zinc-800">
            DASHBOARD v1.0
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg text-xs font-mono">
            <span className="h-2.0 w-2.0 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-zinc-300">SENSOR: CONNECTED</span>
          </div>
          <a href="/" className="text-xs font-medium text-zinc-400 hover:text-white transition">
            Exit
          </a>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-zinc-800/80 bg-zinc-950 p-6 hidden md:block">
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">Navigation</p>
          <nav className="space-y-2">
            {["overview", "biometrics", "tactical", "settings"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition capitalize ${
                  selectedTab === tab
                    ? "bg-red-600 text-white shadow-lg shadow-red-950/50"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Dashboard Content */}
        <main className="flex-1 p-8 max-w-7xl">
          <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">ATHLETE TELEMETRY</h1>
              <p className="text-zinc-400 text-sm mt-1">Real-time biomechanical analysis & sync metrics.</p>
            </div>
            <div className="flex space-x-3">
              <span className="px-3.5 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-300">
                ATHLETE ID: #TF-042
              </span>
            </div>
          </div>

          {/* Real-time Telemetry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800/80 shadow-xl">
              <span className="text-xs font-mono text-zinc-500 uppercase">Live Heart Rate</span>
              <div className="text-4xl font-black text-white mt-3 flex items-baseline justify-between">
                {heartRate} <span className="text-xs font-bold text-red-500">BPM</span>
              </div>
              <p className="text-xs text-zinc-500 mt-2">↑ Dynamic stream</p>
            </div>

            <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800/80 shadow-xl">
              <span className="text-xs font-mono text-zinc-500 uppercase">Power Output</span>
              <div className="text-4xl font-black text-white mt-3 flex items-baseline justify-between">
                {power} <span className="text-xs font-bold text-zinc-400">kW</span>
              </div>
              <p className="text-xs text-zinc-500 mt-2">Peak target: 9.0 kW</p>
            </div>

            <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800/80 shadow-xl">
              <span className="text-xs font-mono text-zinc-500 uppercase">Stamina Reserve</span>
              <div className="text-4xl font-black text-white mt-3">88%</div>
              <p className="text-xs text-emerald-400 mt-2">Optimal threshold</p>
            </div>

            <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800/80 shadow-xl">
              <span className="text-xs font-mono text-zinc-500 uppercase">Fatigue Score</span>
              <div className="text-4xl font-black text-emerald-400 mt-3">LOW</div>
              <p className="text-xs text-zinc-500 mt-2">Recovery rate nominal</p>
            </div>
          </div>

          {/* Detailed Performance Visualizer Box */}
          <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800/80 shadow-xl">
            <h3 className="text-lg font-bold mb-2">Biomechanical Load Distribution</h3>
            <p className="text-zinc-400 text-sm mb-6">High-frequency movement data collected over the active session.</p>
            <div className="h-48 bg-zinc-900/60 rounded-xl border border-zinc-800/60 flex items-center justify-center text-zinc-500 font-mono text-xs">
              [ Visualizer Widget: Real-time Telemetry Graph Stream ]
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}