import Link from 'next/link';

export default function BlenderLanding() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col selection:bg-red-600 selection:text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-zinc-900 max-w-7xl mx-auto w-full">
        <div className="text-xl font-extrabold tracking-wider">
          TITAN<span className="text-red-600">FORGE</span>
        </div>
        <div className="flex gap-6 text-sm font-medium text-zinc-400">
          <a href="#overview" className="hover:text-white transition-colors">Overview</a>
          <a href="#specs" className="hover:text-white transition-colors">Hardware Specs</a>
          <Link href="/dashboard" className="text-red-500 hover:text-red-400 font-semibold">Dashboard →</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 py-24 max-w-4xl mx-auto my-auto">
        <span className="px-3 py-1 mb-6 text-xs font-semibold uppercase tracking-widest bg-red-950/60 text-red-500 border border-red-900/50 rounded-full">
          TitanForge Biometric Ecosystem
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          SMART RECOVERY <span className="text-red-600">BLENDER</span>
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl mb-10 leading-relaxed">
          The ultimate athletic fueling station featuring biometric fingerprint authentication, voice activation, and precision macro weighing.
        </p>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 text-center text-zinc-600 text-xs border-t border-zinc-900">
        © {new Date().getFullYear()} TitanForge. High-performance tools for athletes.
      </footer>
    </main>
  );
}