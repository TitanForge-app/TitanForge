import Link from 'next/link';

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col p-8 selection:bg-red-600 selection:text-white">
      {/* Dashboard Top Navigation */}
      <nav className="flex justify-between items-center pb-6 border-b border-zinc-900 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-extrabold tracking-wider">
            TITAN<span className="text-red-600">FORGE</span>
          </Link>
          <span className="text-zinc-600">/</span>
          <span className="text-sm font-medium text-red-500">Athlete Dashboard</span>
        </div>
        <Link 
          href="/" 
          className="text-xs font-semibold px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg border border-zinc-800 transition-colors"
        >
          ← Back to Home
        </Link>
      </nav>

      {/* Dashboard Content Grid */}
      <div className="max-w-7xl mx-auto w-full py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Biometric Status */}
        <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800/80 shadow-lg">
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Hardware Security</span>
          <h3 className="text-xl font-bold mt-2 mb-4">Fingerprint Profiles</h3>
          <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-xl border border-zinc-800 mb-4">
            <span className="text-sm text-zinc-300">Active Slots Used</span>
            <span className="text-red-500 font-bold">3 / 5</span>
          </div>
          <p className="text-xs text-zinc-500">Maximum capacity limited to 5 authenticated athletic profiles.</p>
        </div>

        {/* Card 2: Recovery Sync */}
        <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800/80 shadow-lg">
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Nutritional Sync</span>
          <h3 className="text-xl font-bold mt-2 mb-4">Post-Workout Macro</h3>
          <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-xl border border-zinc-800 mb-4">
            <span className="text-sm text-zinc-300">Target Protein</span>
            <span className="text-white font-bold">45g Optimal</span>
          </div>
          <p className="text-xs text-zinc-500">Blender calibrated automatically from last training session.</p>
        </div>

        {/* Card 3: Voice Activation Status */}
        <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800/80 shadow-lg">
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Command Interface</span>
          <h3 className="text-xl font-bold mt-2 mb-4">Voice Recognition</h3>
          <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-xl border border-zinc-800 mb-4">
            <span className="text-sm text-zinc-300">Status</span>
            <span className="text-green-500 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Connected
            </span>
          </div>
          <p className="text-xs text-zinc-500">Ready for hands-free cycle initiation post-training.</p>
        </div>

      </div>
    </main>
  );
}