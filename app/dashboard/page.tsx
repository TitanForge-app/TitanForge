"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [heartRate, setHeartRate] = useState(168);
  const [power, setPower] = useState(8.2);
  const [selectedTab, setSelectedTab] = useState("overview");

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
      <header className="flex justify-between items-center px-8 py-4 border-b border-zinc-800 bg-zinc-950">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-xl font-bold tracking-wider text-red-600 hover:text-red-500 transition">
            TITANFORGE
          </Link>
          <span className="text-xs font-mono bg-zinc-900 text-zinc-400 px-2.5 py-1 rounded border border-zinc-800">
            DASHBOARD v1.0
          </span>
        </div>
        <div className="flex items-center space-x-4 text-xs font-mono">
          <span className="flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>SENSOR: CONNECTED</span>
          </span>
          <span className="text-zinc-500">ATHLETE ID: #TF-042</span>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-zinc-800 p-6 space-y-6 bg-zinc-950/50">
          <div className="text-xs font-semibold text-zinc-500 tracking-wider">NAVIGATION</div>
          <nav className="space-y-2">
            {[
              { id: "overview", label: "Overview" },
              { id: "biometrics", label: "Biometrics" },
              { id: "tactical", label: "Tactical" },
              { id: "settings", label: "Settings" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                  selectedTab === tab.id
                    ? "bg-red-600 text-white font-semibold"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Dashboard Panels */}
        <main className="flex-1 p-8 space-y-8">
          {selectedTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight">ATHLETE TELEMETRY</h2>
                <p className="text-sm text-zinc-400">Real-time biomechanical analysis & sync metrics.</p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-5 bg-zinc-900/60 rounded-xl border border-zinc-800">
                  <div className="text-xs font-bold text-zinc-400 tracking-wider">LIVE HEART RATE</div>
                  <div className="flex items-baseline space-x-2 mt-2">
                    <span className="text-3xl font-black">{heartRate}</span>
                    <span className="text-xs font-bold text-red-500">BPM</span>
                  </div>
                  <div className="text-xs text-zinc-500 mt-2">↑ Dynamic stream</div>
                </div>

                <div className="p-5 bg-zinc-900/60 rounded-xl border border-zinc-800">
                  <div className="text-xs font-bold text-zinc-400 tracking-wider">POWER OUTPUT</div>
                  <div className="flex items-baseline space-x-2 mt-2">
                    <span className="text-3xl font-black">{power}</span>
                    <span className="text-xs text-zinc-400">kW</span>
                  </div>
                  <div className="text-xs text-zinc-500 mt-2">Peak target: 9.0 kW</div>
                </div>

                <div className="p-5 bg-zinc-900/60 rounded-xl border border-zinc-800">
                  <div className="text-xs font-bold text-zinc-400 tracking-wider">STAMINA RESERVE</div>
                  <div className="text-3xl font-black mt-2">88%</div>
                  <div className="text-xs text-emerald-400 mt-2 font-medium">Optimal threshold</div>
                </div>

                <div className="p-5 bg-zinc-900/60 rounded-xl border border-zinc-800">
                  <div className="text-xs font-bold text-zinc-400 tracking-wider">FATIGUE SCORE</div>
                  <div className="text-3xl font-black text-emerald-400 mt-2">LOW</div>
                  <div className="text-xs text-zinc-500 mt-2">Recovery rate nominal</div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === "biometrics" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight">BIOMETRIC HARDWARE MANAGER</h2>
                <p className="text-sm text-zinc-400">On-board optical fingerprint module (Capacity: 5 Profiles)</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map((slot) => (
                  <div key={slot} className="p-5 bg-zinc-900/60 rounded-xl border border-zinc-800 text-center space-y-3">
                    <div className="text-xs font-mono text-zinc-500">PROFILE 0{slot}</div>
                    <div className="text-sm font-bold text-zinc-200">
                      {slot <= 2 ? `Athlete #${slot}` : "Unassigned"}
                    </div>
                    <span
                      className={`inline-block px-2.5 py-1 text-xs font-mono rounded-full ${
                        slot <= 2
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-zinc-800 text-zinc-500 border border-zinc-700"
                      }`}
                    >
                      {slot <= 2 ? "ENROLLED" : "EMPTY"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}