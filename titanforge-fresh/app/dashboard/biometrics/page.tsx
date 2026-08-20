import Link from 'next/link';

export default function BiometricsPage() {
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
          <span className="text-sm font-medium text-red-500">Hardware Biometrics</span>
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
        <div className="bg-zinc-950 p-8 rounded-3xl border border-zinc-800 shadow-xl">
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Profile Management</span>
          <h2 className="text-2xl font-bold mt-2 mb-4">Fingerprint Sensor Registry (Max 5 Users)</h2>
          <p className="text-zinc-400 text-sm mb-6">
            Register and manage elite athlete biometric prints linked to automated macro-blending formulations.
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-xl border border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-sm font-medium text-white">Profile 01: Lead Athlete (Active)</span>
              </div>
              <span className="text-xs px-3 py-1 bg-zinc-800 rounded-lg text-zinc-300">Synced</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-xl border border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-sm font-medium text-white">Profile 02: Team Captain (Active)</span>
              </div>
              <span className="text-xs px-3 py-1 bg-zinc-800 rounded-lg text-zinc-300">Synced</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-xl border border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="text-sm font-medium text-white">Profile 03: Performance Coach (Active)</span>
              </div>
              <span className="text-xs px-3 py-1 bg-zinc-800 rounded-lg text-zinc-300">Synced</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50 border-dashed">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-zinc-700"></span>
                <span className="text-sm font-medium text-zinc-500">Profile 04: Available Slot</span>
              </div>
              <button className="text-xs px-3 py-1 bg-red-600/20 hover:bg-red-600/30 text-red-500 border border-red-500/30 rounded-lg transition-colors">
                Register Print
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50 border-dashed">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-zinc-700"></span>
                <span className="text-sm font-medium text-zinc-500">Profile 05: Available Slot</span>
              </div>
              <button className="text-xs px-3 py-1 bg-red-600/20 hover:bg-red-600/30 text-red-500 border border-red-500/30 rounded-lg transition-colors">
                Register Print
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}