'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#000000] text-white flex flex-col p-6 selection:bg-red-600 selection:text-white font-mono relative overflow-hidden">
      {/* Deep Red Background Lighting Effect */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-red-600/15 blur-[120px] pointer-events-none rounded-full"></div>

      {/* Top Navbar */}
      <nav className="flex justify-between items-center pb-4 border-b border-zinc-900 mb-12 relative z-10">
        <div className="flex items-center gap-4">
          <span className="text-xl font-black tracking-wider text-white">
            TITAN<span className="text-red-600">FORGE</span>
          </span>
        </div>
        <div className="flex items-center gap-6 text-xs font-semibold">
          <Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">Dashboard</Link>
          <Link href="/dashboard/recipe" className="text-zinc-400 hover:text-white transition-colors">Recipe</Link>
          <Link href="/dashboard/biometrics" className="text-zinc-400 hover:text-white transition-colors">Biometrics</Link>
          <Link href="/dashboard/settings" className="text-zinc-400 hover:text-white transition-colors">Settings</Link>
          <Link 
            href="/dashboard" 
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg shadow-red-600/30 transition-all font-bold"
          >
            Launch App
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto gap-6 my-auto relative z-10">
        <div className="px-4 py-1.5 bg-red-950/60 border border-red-600/50 rounded-full text-red-400 text-xs font-bold uppercase tracking-widest animate-pulse shadow-lg shadow-red-950">
          BIOMETRIC SMART BLENDER SYSTEM
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none text-white">
          Fuel Your Peak Performance With <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-red-500">Biometric Precision</span>
        </h1>
        <p className="text-zinc-400 text-sm md:text-base max-w-xl">
          Integrate real-time load cell measurements, automated voice controls, and smart nutrition profiles into your daily routine.
        </p>
        <div className="flex gap-4 mt-4">
          <Link 
            href="/dashboard/recipe" 
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-xl shadow-red-600/30 transition-all"
          >
            Open Recipe Board
          </Link>
          <Link 
            href="/dashboard/settings" 
            className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white text-xs font-bold rounded-xl transition-all"
          >
            Configure Settings
          </Link>
        </div>
      </div>
    </main>
  );
}