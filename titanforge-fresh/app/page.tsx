import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col justify-between p-8 selection:bg-red-600 selection:text-white">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center max-w-7xl mx-auto w-full pb-6 border-b border-zinc-900">
        <div className="text-xl font-extrabold tracking-wider">
          TITAN<span className="text-red-600">FORGE</span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">Dashboard</Link>
          <Link href="/dashboard/biometrics" className="text-zinc-400 hover:text-white transition-colors">Biometrics</Link>
          <Link href="/dashboard/voice" className="text-zinc-400 hover:text-white transition-colors">Voice Control</Link>
          <Link 
            href="/dashboard" 
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all shadow-lg shadow-red-600/20"
          >
            Launch App
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto text-center py-20 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-600/30 text-red-500 text-xs font-bold uppercase tracking-widest mb-6">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          Biometric Smart Blender System
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          Fuel Your Peak Performance With <span className="text-red-600">Biometric Precision</span>
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl mb-10">
          The ultimate hardware-integrated nutrition ecosystem designed for elite athletes and coaches. Voice-activated, fingerprint-secured, and tailored to your exact post-workout recovery macros.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link 
            href="/dashboard" 
            className="px-8 py-4 bg-red-600 hover:bg-red-700 font-bold rounded-xl text-lg transition-all shadow-xl shadow-red-600/30 text-center"
          >
            Open Athlete Dashboard →
          </Link>
          <Link 
            href="/dashboard/biometrics" 
            className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 font-bold rounded-xl text-lg transition-all text-center"
          >
            Manage Fingerprint Profiles
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto w-full pt-6 border-t border-zinc-900 text-center text-xs text-zinc-600">
        © 2026 TitanForge Systems. All rights reserved. Built for elite athletic performance.
      </footer>
    </main>
  );
}