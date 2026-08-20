import Link from 'next/link';

export default function VoiceControlPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col p-8 selection:bg-red-600 selection:text-white">
      {/* Top Navigation */}
      <nav className="flex justify-between items-center pb-6 border-b border-zinc-900 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-extrabold tracking-wider">
            TITAN<span className="text-red-600">FORGE</span>
          </Link>
          <span className="text-zinc-600">/</span>
          <Link href="/dashboard" className="text-sm font-medium text-zinc-400 hover:text-white">Dashboard</Link>
          <span className="text-zinc-600">/</span>
          <span className="text-sm font-medium text-red-500">Voice & Bluetooth</span>
        </div>
        <Link 
          href="/dashboard" 
          className="text-xs font-semibold px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg border border-zinc-800 transition-colors"
        >
          ← Back to Dashboard
        </Link>
      </nav>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto w-full py-12 space-y-8">
        
        {/* Bluetooth Sync Card */}
        <div className="bg-zinc-950 p-8 rounded-3xl border border-zinc-800 shadow-xl">
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Hardware Link</span>
          <h2 className="text-2xl font-bold mt-2 mb-4">Bluetooth 5.3 Synchronization</h2>
          <p className="text-zinc-400 text-sm mb-6">
            Connected directly to the TitanForge Biometric Blender base unit for real-time telemetry and macro tracking.
          </p>

          <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-xl border border-zinc-800">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
              <div>
                <p className="text-sm font-medium text-white">TitanForge Blender Unit #01</p>
                <p className="text-xs text-zinc-500">Signal Strength: -42dBm (Optimal)</p>
              </div>
            </div>
            <span className="text-xs px-3 py-1 bg-green-950/60 text-green-400 border border-green-900/50 rounded-lg font-medium">
              Connected
            </span>
          </div>
        </div>

        {/* Voice Recognition Command Center */}
        <div className="bg-zinc-950 p-8 rounded-3xl border border-zinc-800 shadow-xl">
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Hands-Free Execution</span>
          <h2 className="text-2xl font-bold mt-2 mb-4">Voice-Activated Blending Cycles</h2>
          <p className="text-zinc-400 text-sm mb-6">
            Issue preset post-workout commands or initiate custom RPM schedules hands-free from your training mat.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-zinc-900 rounded-2xl border border-zinc-800 flex flex-col justify-between">
              <div>
                <span className="text-xs text-zinc-500 font-semibold uppercase">Command Phrase</span>
                <p className="text-white font-bold mt-1 text-base">"TitanForge, High Protein Recovery"</p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs text-zinc-400">Duration: 45s (24,000 RPM)</span>
                <span className="text-xs px-2.5 py-1 bg-red-600/20 text-red-500 border border-red-500/30 rounded-md font-semibold">
                  Ready
                </span>
              </div>
            </div>

            <div className="p-5 bg-zinc-900 rounded-2xl border border-zinc-800 flex flex-col justify-between">
              <div>
                <span className="text-xs text-zinc-500 font-semibold uppercase">Command Phrase</span>
                <p className="text-white font-bold mt-1 text-base">"TitanForge, Post-Game Electrolyte"</p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs text-zinc-400">Duration: 30s (18,000 RPM)</span>
                <span className="text-xs px-2.5 py-1 bg-red-600/20 text-red-500 border border-red-500/30 rounded-md font-semibold">
                  Ready
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}