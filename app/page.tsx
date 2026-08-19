"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen text-white flex flex-col font-sans">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-zinc-800/80 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <span className="text-2xl font-black text-red-600 tracking-wider">
          TITANFORGE
        </span>
        <div className="space-x-6 text-sm font-medium text-zinc-400">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#demo" className="hover:text-white transition">Platform</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
          <a href="/dashboard" className="hover:text-white transition-colors">  Dashboard</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl font-extrabold tracking-tight text-white mb-6 drop-shadow-xl">
          ENGINEERED FOR <span className="text-red-600">PERFORMANCE</span>
        </h1>
        <p className="text-xl text-zinc-400 mb-8 max-w-2xl leading-relaxed">
          Bridging cutting-edge software engineering and sports performance analytics to power athletes and teams.
        </p>
        <a href="#contact" className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg shadow-red-900/50 transition-all border border-red-500/30">
          Request Early Access
        </a>
      </section>

      {/* Interactive Features Grid */}
      <section id="features" className="py-20 px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            BUILT FOR <span className="text-red-600">THE NEXT LEVEL</span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
            High-performance tools designed specifically for athletes, coaches, and sports science operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group relative bg-zinc-950/80 p-8 rounded-2xl border border-zinc-800/80 hover:border-red-600/80 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-900/20 backdrop-blur-md">
            <div className="flex items-center justify-between mb-6">
              <span className="text-red-500 text-3xl font-black">01</span>
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 group-hover:border-red-600/40 flex items-center justify-center transition">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-red-500 transition">Performance Tracking</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Real-time biometric analysis and high-frequency movement data standardizing performance evaluation across training sessions.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group relative bg-zinc-950/80 p-8 rounded-2xl border border-zinc-800/80 hover:border-red-600/80 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-900/20 backdrop-blur-md">
            <div className="flex items-center justify-between mb-6">
              <span className="text-red-500 text-3xl font-black">02</span>
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 group-hover:border-red-600/40 flex items-center justify-center transition">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-red-500 transition">Secure Infrastructure</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Encrypted network protocols and layer-3 data pipelines ensuring complete athlete data privacy and hardware connectivity.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group relative bg-zinc-950/80 p-8 rounded-2xl border border-zinc-800/80 hover:border-red-600/80 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-900/20 backdrop-blur-md">
            <div className="flex items-center justify-between mb-6">
              <span className="text-red-500 text-3xl font-black">03</span>
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 group-hover:border-red-600/40 flex items-center justify-center transition">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-red-500 transition">Tactical Analytics</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Custom dashboard visualizers providing real-time game strategy adjustments and player tracking metrics for coaches.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Platform Demo Section */}
      <section id="demo" className="py-12 px-8 max-w-6xl mx-auto">
        <div className="bg-zinc-950/90 rounded-3xl border border-zinc-800 p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between border-b border-zinc-800 pb-6 mb-8 gap-4">
            <div>
              <div className="flex items-center space-x-3">
                <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Live Hardware Sync Active</span>
              </div>
              <h3 className="text-2xl font-bold text-white mt-1">Athlete Command Center</h3>
            </div>
            <div className="flex space-x-3">
              <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-xs font-mono text-zinc-400">Device ID: TF-8890</span>
              <span className="px-3 py-1 bg-red-950/50 border border-red-800/40 rounded-md text-xs font-mono text-red-400">Encrypted</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-zinc-900/60 p-5 rounded-xl border border-zinc-800/80">
              <span className="text-xs font-mono text-zinc-500 uppercase">Heart Rate</span>
              <div className="text-3xl font-extrabold text-white mt-2">168 <span className="text-xs font-normal text-red-500">BPM</span></div>
              <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-red-600 h-full w-[82%] rounded-full"></div>
              </div>
            </div>

            <div className="bg-zinc-900/60 p-5 rounded-xl border border-zinc-800/80">
              <span className="text-xs font-mono text-zinc-500 uppercase">Stamina Index</span>
              <div className="text-3xl font-extrabold text-white mt-2">94%</div>
              <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-red-600 h-full w-[94%] rounded-full"></div>
              </div>
            </div>

            <div className="bg-zinc-900/60 p-5 rounded-xl border border-zinc-800/80">
              <span className="text-xs font-mono text-zinc-500 uppercase">Explosive Power</span>
              <div className="text-3xl font-extrabold text-white mt-2">8.2 <span className="text-xs font-normal text-zinc-400">kW</span></div>
              <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-red-600 h-full w-[78%] rounded-full"></div>
              </div>
            </div>

            <div className="bg-zinc-900/60 p-5 rounded-xl border border-zinc-800/80">
              <span className="text-xs font-mono text-zinc-500 uppercase">Recovery Score</span>
              <div className="text-3xl font-extrabold text-emerald-400 mt-2">Optimal</div>
              <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-emerald-500 h-full w-[100%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Early Access / Waitlist Section */}
      <section id="contact" className="py-20 px-8 max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 p-10 md:p-14 rounded-3xl border border-zinc-800/80 backdrop-blur-xl shadow-2xl relative">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            JOIN THE <span className="text-red-600">TITANFORGE BETA</span>
          </h2>
          <p className="text-zinc-400 max-w-lg mx-auto mb-8 text-sm md:text-base">
            Be among the first coaches and athletes to gain early access to our analytics platform and hardware integration toolkit.
          </p>

          {submitted ? (
            <div className="p-4 bg-red-950/40 border border-red-800/60 rounded-xl text-red-400 text-sm font-medium max-w-md mx-auto">
              ✓ Access request registered! We'll reach out shortly.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address" 
                className="w-full px-5 py-3.5 bg-black/70 border border-zinc-800 focus:border-red-600 text-white rounded-xl outline-none transition text-sm"
                required
              />
              <button 
                type="submit" 
                className="w-full sm:w-auto px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition text-sm whitespace-nowrap shadow-lg shadow-red-900/40"
              >
                Get Access
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 text-center text-zinc-600 text-sm border-t border-zinc-900 bg-black/60">
        © {new Date().getFullYear()} TitanForge. All rights reserved.
      </footer>
    </div>
  );
}