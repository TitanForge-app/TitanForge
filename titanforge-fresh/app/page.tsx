import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] flex flex-col justify-between p-6 md:p-10 font-mono selection:bg-red-900 scanlines relative">
      
      {/* Rugged Background Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/dark-dotted-etched.png')] pointer-events-none"></div>

      {/* Header - Classic Terminal Style */}
      <header className="relative z-10 border border-[#222] bg-[#111]/80 p-4 flex items-center justify-between shadow-inner">
        <div className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
            <div className="w-3 h-3 bg-red-600 animate-pulse border border-red-900"></div>
            TITAN<span className="text-red-600">FORGE</span>_CRYO_v1
        </div>
        <div className="flex items-center gap-3 text-xs border-l border-[#222] pl-3">
          <span className="text-green-500">SYSTEM_ONLINE</span>
          <span className="text-gray-600">|</span>
          <span className="text-gray-400">SECURED_ACCESS</span>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 max-w-7xl mx-auto w-full py-16">
        
        {/* Left Column: Textual Info */}
        <div className="flex-1 text-left">
          <div className="inline-block border border-red-900 bg-red-950/50 text-red-400 px-2 py-0.5 text-[10px] tracking-widest mb-6 font-sans">
            BIOMETRIC_STASIS_ENGINE
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-none mb-6 tracking-tighter border-l-4 border-red-600 pl-4">
            INTEGRATED<br/>
            <span className="text-red-600">BLENDER</span>_UNIT
          </h1>
          
          <p className="text-gray-400 max-w-xl mb-12 text-sm leading-relaxed border border-[#222] bg-[#111] p-5 shadow-xl">
            Hardened stainless steel interface. Requires authorized biometric signature to initialize blending sequence. 
            Displays real-time viscosity telemetry and caloric density metrics on secure channel.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/dashboard" 
              className="group relative px-6 py-3 bg-red-600 text-black font-bold text-sm tracking-wider uppercase hover:bg-red-500 transition-all duration-150 active:translate-y-0.5 text-center inline-block"
            >
              <span className="relative z-10">Initialize Session →</span>
            </Link>
            <Link 
              href="/dashboard/biometrics" 
              className="px-6 py-3 bg-[#111] text-gray-300 font-medium text-sm tracking-wider uppercase border border-[#333] hover:border-gray-500 hover:text-white transition-colors text-center inline-block"
            >
              Manage Profiles
            </Link>
          </div>
        </div>

        {/* Right Column: Rugged CSS Blender Canister Visual */}
        <div className="flex-none relative w-72 h-96 flex items-end justify-center p-8 group">
          <div className="absolute inset-0 border-[16px] border-[#1a1a1a] rounded-t-full rounded-b-xl bg-black shadow-2xl"></div>
          
          <div 
            className="relative w-full h-[70%] bg-black rounded-t-full rounded-b-sm overflow-hidden border-t-4 border-red-900/50 transition-all duration-1000 group-hover:h-[85%]"
            style={{ animation: 'pulse-glow 4s infinite' }}
          >
            <div className="absolute inset-x-0 bottom-0 h-[85%] bg-red-600">
              <div className="absolute top-10 left-6 w-4 h-4/6 bg-white/10 rounded-full blur-sm"></div>
              <div className="absolute bottom-20 left-10 w-3 h-3 bg-white/20 rounded-full animate-ping"></div>
              <div className="absolute bottom-40 right-10 w-2 h-2 bg-white/20 rounded-full animate-ping delay-300"></div>
            </div>
            <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent,transparent_2px,rgba(0,0,0,0.1)_3px,rgba(0,0,0,0.1)_3px)]"></div>
          </div>

          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 text-center bg-[#1a1a1a] border border-[#333] p-2 z-20">
            <div className="text-[10px] text-gray-500">SERIAL NO.</div>
            <div className="text-xs font-bold text-white">TF-BLDR-001X</div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#222] bg-[#111] p-3 mt-10 text-xs text-gray-600 flex justify-between font-sans">
        <div>ID: USER_ATHLETE_774</div>
        <div>LOC: SECURE_FACILITY_GAMMA</div>
        <div>STATUS: AWAITING_INPUT_...</div>
      </footer>
    </main>
  );
}