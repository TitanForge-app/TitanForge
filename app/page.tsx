import Link from 'next/link';

export default function Home() {
  return (
    <div 
      className="min-h-screen bg-black text-white flex flex-col selection:bg-red-500 selection:text-white"
      style={{
        backgroundImage: `
          radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
          radial-gradient(circle at 50% 30%, rgba(220, 38, 38, 0.15) 0%, transparent 60%)
        `,
        backgroundSize: '24px 24px, 100% 100%'
      }}
    >
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-zinc-800/80 max-w-7xl mx-auto w-full">
        <span className="text-xl font-extrabold tracking-wider text-white">
          TITAN<span className="text-red-600">FORGE</span>
        </span>
        <div className="space-x-8 text-sm font-medium">
          <a href="#blender" className="text-zinc-300 hover:text-red-500 transition-colors">The Blender</a>
          <a href="#features" className="text-zinc-300 hover:text-red-500 transition-colors">Features</a>
          <Link href="/dashboard" className="text-red-500 font-semibold hover:text-red-400 transition-colors">Dashboard →</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
          ENGINEERED FOR <span className="text-red-600">PERFORMANCE</span>
        </h1>
        <p className="text-lg text-zinc-400 mb-10 max-w-2xl leading-relaxed">
          Bridging cutting-edge software engineering and sports performance analytics to power elite athletes and teams.
        </p>
        <Link
          href="/dashboard"
          className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl shadow-lg shadow-red-900/30 transition-all duration-200"
        >
          Explore Platform
        </Link>
      </section>

      {/* TitanForge Blender Overview Section */}
      <section id="blender" className="py-12 px-6 max-w-5xl mx-auto w-full">
        <div className="bg-zinc-900/90 p-8 md:p-10 rounded-2xl border border-zinc-800 shadow-2xl backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            
            {/* Visual Box Placeholder */}
            <div className="w-full md:w-1/2 h-64 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center justify-center text-zinc-500 font-medium">
              [TitanForge Smart Blender Visual]
            </div>

            {/* Content & Pain Point Solutions */}
            <div className="w-full md:w-1/2 text-left">
              <span className="text-red-500 text-xs font-bold tracking-widest uppercase">Hardware Innovation</span>
              <h3 className="text-2xl font-bold mb-4 text-white">TitanForge Performance Blender</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Traditional blenders are passive kitchen tools. After grueling training sessions, nutritional precision is often lost with imprecise post-workout nutrition and tedious manual macro tracking. TitanForge solves this by turning recovery fueling into a precise, automated recovery process.
              </p>
              <ul className="text-xs text-zinc-300 space-y-2">
                <li className="flex items-center gap-2 text-red-400">✓ <span className="text-zinc-400">Precision-engineered nutrient weighing.</span></li>
                <li className="flex items-center gap-2 text-red-400">✓ <span className="text-zinc-400">Automated recovery metric synchronization.</span></li>
                <li className="flex items-center gap-2 text-red-400">✓ <span className="text-zinc-400">Intelligent, athlete-specific blending cycles.</span></li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-16 px-6 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900/80 p-8 rounded-xl border border-zinc-800">
          <div className="text-red-500 text-2xl font-bold mb-3">01</div>
          <h3 className="text-lg font-bold mb-2 text-white">Performance Tracking</h3>
          <p className="text-zinc-400 text-sm">Real-time biometric data synced directly to your personal athlete profile dashboard.</p>
        </div>
        <div className="bg-zinc-900/80 p-8 rounded-xl border border-zinc-800">
          <div className="text-red-500 text-2xl font-bold mb-3">02</div>
          <h3 className="text-lg font-bold mb-2 text-white">Secure Infrastructure</h3>
          <p className="text-zinc-400 text-sm">Encrypted data protocols protecting sensitive training records and athletic metrics.</p>
        </div>
        <div className="bg-zinc-900/80 p-8 rounded-xl border border-zinc-800">
          <div className="text-red-500 text-2xl font-bold mb-3">03</div>
          <h3 className="text-lg font-bold mb-2 text-white">Tactical Analytics</h3>
          <p className="text-zinc-400 text-sm">Advanced dashboard visualizations mapping physical output against recovery goals.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 text-center text-zinc-600 text-xs border-t border-zinc-900">
        © {new Date().getFullYear()} TitanForge. High-performance tools for athletes.
      </footer>
    </div>
  );
}