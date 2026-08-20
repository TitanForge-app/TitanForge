'use client';

import { useState } from 'react';
import Link from 'next/link';

interface BiometricProfile {
  id: number;
  name: string;
  role: string;
  status: 'Active' | 'Available';
  synced: boolean;
  lastAccess?: string;
}

export default function HardwareBiometrics() {
  const [profiles, setProfiles] = useState<BiometricProfile[]>([
    { id: 1, name: 'Lead Athlete', role: 'Elite Athlete Profile', status: 'Active', synced: true, lastAccess: 'Today, 08:30 AM' },
    { id: 2, name: 'Team Captain', role: 'Performance Lead', status: 'Active', synced: true, lastAccess: 'Yesterday, 06:15 PM' },
    { id: 3, name: 'Performance Coach', role: 'Master Controller', status: 'Active', synced: true, lastAccess: 'Aug 18, 2026' },
    { id: 4, name: 'Available Slot', role: 'Unassigned Biometric ID', status: 'Available', synced: false },
    { id: 5, name: 'Available Slot', role: 'Unassigned Biometric ID', status: 'Available', synced: false },
  ]);

  const [activeSession, setActiveSession] = useState<BiometricProfile | null>(profiles[0]);
  const [authMessage, setAuthMessage] = useState<string>('SYSTEM READY: SELECT A BIOMETRIC PROFILE TO AUTHENTICATE');
  const [isScanning, setIsScanning] = useState<boolean>(false);

  // Authenticate / Sign into Hardware Unit using fingerprint sensor simulation
  const handleAuthenticate = (profile: BiometricProfile) => {
    if (profile.status === 'Available') {
      alert('This slot is unassigned. Click "Register Print" to enroll a new user.');
      return;
    }

    setIsScanning(true);
    setAuthMessage(`SCANNING FINGERPRINT FOR [${profile.name.toUpperCase()}]...`);

    setTimeout(() => {
      setIsScanning(false);
      setActiveSession(profile);
      setAuthMessage(`SUCCESS: HARDWARE UNLOCKED & SIGNED IN AS ${profile.name.toUpperCase()}`);
    }, 1200);
  };

  // Register a new fingerprint print into an available slot
  const handleRegisterSlot = (id: number) => {
    const newName = prompt('Enter name for new biometric profile:');
    if (!newName || !newName.trim()) return;

    setProfiles(prev => prev.map(p => {
      if (p.id === id) {
        return {
          id,
          name: newName.trim(),
          role: 'Custom Athlete / Coach',
          status: 'Active',
          synced: true,
          lastAccess: 'Just now'
        };
      }
      return p;
    }));

    setAuthMessage(`SUCCESS: NEW BIOMETRIC PRINT REGISTERED FOR ${newName.toUpperCase()}`);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col p-6 selection:bg-red-600 selection:text-white font-mono">
      {/* Top Navbar */}
      <nav className="flex justify-between items-center pb-4 border-b border-zinc-900 mb-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-black tracking-wider">
            TITAN<span className="text-red-600">FORGE</span>
          </Link>
          <span className="text-zinc-700">/</span>
          <span className="text-xs text-red-500 font-bold uppercase">HARDWARE BIOMETRICS</span>
        </div>
        <Link 
          href="/dashboard" 
          className="text-xs font-semibold px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 rounded-lg border border-zinc-800 transition-colors text-white inline-block"
        >
          ← Back to Dashboard
        </Link>
      </nav>

      <div className="max-w-4xl mx-auto w-full flex flex-col gap-6">
        
        {/* Active Session & Hardware Status Banner */}
        <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800 shadow-xl flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${isScanning ? 'bg-amber-500 animate-ping' : 'bg-green-500 animate-pulse'}`}></span>
              <span className="text-xs font-bold text-zinc-300">BIOMETRIC HARDWARE STATUS</span>
            </div>
            {activeSession && (
              <span className="text-xs bg-red-950/60 text-red-400 border border-red-600/40 px-3 py-1 rounded-lg font-bold">
                Signed In: {activeSession.name}
              </span>
            )}
          </div>
          <div className="bg-black p-3 rounded-xl border border-zinc-900 text-xs font-mono text-red-400 tracking-wider">
            {authMessage}
          </div>
        </div>

        {/* Fingerprint Sensor Registry Deck */}
        <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800/80 shadow-xl flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">Fingerprint Sensor Registry (Max 5 Users)</h2>
            <p className="text-xs text-zinc-500 mt-1">Click any active profile to authenticate and sign into the hardware blender unit, or register a new print.</p>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            {profiles.map((profile) => (
              <div 
                key={profile.id} 
                className={`p-4 rounded-xl border transition-all flex items-center justify-between ${
                  activeSession?.id === profile.id 
                    ? 'bg-zinc-900 border-red-600 shadow-lg shadow-red-600/20' 
                    : 'bg-black/60 border-zinc-900 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`w-2.5 h-2.5 rounded-full ${profile.status === 'Active' ? 'bg-green-500' : 'bg-zinc-700'}`}></span>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      Profile 0{profile.id}: {profile.name}
                      {activeSession?.id === profile.id && (
                        <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded font-semibold">Active Session</span>
                      )}
                    </div>
                    <div className="text-[11px] text-zinc-500">{profile.role} {profile.lastAccess ? `• Last Access: ${profile.lastAccess}` : ''}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {profile.status === 'Active' ? (
                    <>
                      <span className="text-xs bg-zinc-900 text-zinc-400 px-3 py-1 rounded-lg border border-zinc-800">Synced</span>
                      <button 
                        onClick={() => handleAuthenticate(profile)}
                        className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow transition-all"
                      >
                        {activeSession?.id === profile.id ? 'Authenticated' : 'Sign In'}
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => handleRegisterSlot(profile.id)}
                      className="px-4 py-1.5 bg-zinc-900 hover:bg-red-600 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-bold rounded-lg transition-all"
                    >
                      Register Print
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}