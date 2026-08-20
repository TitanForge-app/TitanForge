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

interface HistoryItem {
  id: string;
  name: string;
  action: 'SIGNED IN' | 'SIGNED OUT' | 'REMOVED USER';
  timestamp: string;
}

export default function HardwareBiometrics() {
  const [profiles, setProfiles] = useState<BiometricProfile[]>([
    { id: 1, name: 'Lead Athlete', role: 'Elite Athlete Profile', status: 'Active', synced: true, lastAccess: 'Today, 08:30 AM' },
    { id: 2, name: 'Team Captain', role: 'Performance Lead', status: 'Active', synced: true, lastAccess: 'Yesterday, 06:15 PM' },
    { id: 3, name: 'Performance Coach', role: 'Master Controller', status: 'Active', synced: true, lastAccess: 'Aug 18, 2026' },
    { id: 4, name: 'Available Slot', role: 'Unassigned Biometric ID', status: 'Available', synced: false },
    { id: 5, name: 'Available Slot', role: 'Unassigned Biometric ID', status: 'Available', synced: false },
  ]);

  const [activeSession, setActiveSession] = useState<BiometricProfile | null>(null);
  const [authMessage, setAuthMessage] = useState<string>('SYSTEM READY: SELECT A BIOMETRIC PROFILE TO AUTHENTICATE');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  
  // Sign-in history ledger
  const [history, setHistory] = useState<HistoryItem[]>([
    { id: '1', name: 'Performance Coach', action: 'SIGNED IN', timestamp: 'Aug 18, 2026, 04:12 PM' }
  ]);

  // Registration state
  const [registeringId, setRegisteringId] = useState<number | null>(null);
  const [newProfileName, setNewProfileName] = useState<string>('');

  const getTimeString = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ', Today';
  };

  // Authenticate / Sign into Hardware Unit
  const handleAuthenticate = (profile: BiometricProfile) => {
    if (profile.status === 'Available') {
      setRegisteringId(profile.id);
      return;
    }

    setIsScanning(true);
    setAuthMessage(`SCANNING FINGERPRINT FOR [${profile.name.toUpperCase()}]...`);

    setTimeout(() => {
      setIsScanning(false);
      setActiveSession(profile);
      setAuthMessage(`SUCCESS: HARDWARE UNLOCKED & SIGNED IN AS ${profile.name.toUpperCase()}`);
      
      const nowStr = getTimeString();
      setHistory(prev => [
        { id: Date.now().toString(), name: profile.name, action: 'SIGNED IN', timestamp: nowStr },
        ...prev
      ]);
    }, 1000);
  };

  // Sign out current user
  const handleSignOut = () => {
    if (!activeSession) return;
    const userName = activeSession.name;

    const nowStr = getTimeString();
    setHistory(prev => [
      { id: Date.now().toString(), name: userName, action: 'SIGNED OUT', timestamp: nowStr },
      ...prev
    ]);

    setActiveSession(null);
    setAuthMessage(`USER ${userName.toUpperCase()} SIGNED OUT. HARDWARE LOCKED.`);
  };

  // Remove/Delete user from slot to make room
  const handleRemoveUser = (profile: BiometricProfile) => {
    if (!confirm(`Are you sure you want to remove ${profile.name}? This will free up the slot.`)) return;

    if (activeSession?.id === profile.id) {
      setActiveSession(null);
    }

    const removedName = profile.name;
    setProfiles(prev => prev.map(p => {
      if (p.id === profile.id) {
        return {
          id: p.id,
          name: 'Available Slot',
          role: 'Unassigned Biometric ID',
          status: 'Available',
          synced: false,
          lastAccess: undefined
        };
      }
      return p;
    }));

    setAuthMessage(`SLOT 0${profile.id} CLEARED. ${removedName.toUpperCase()} REMOVED.`);
    const nowStr = getTimeString();
    setHistory(prev => [
      { id: Date.now().toString(), name: removedName, action: 'REMOVED USER', timestamp: nowStr },
      ...prev
    ]);
  };

  // Submit new fingerprint registration
  const handleSaveRegistration = (id: number) => {
    if (!newProfileName.trim()) return;
    const cleanName = newProfileName.trim();

    setProfiles(prev => prev.map(p => {
      if (p.id === id) {
        return {
          id,
          name: cleanName,
          role: 'Custom Athlete / Coach',
          status: 'Active',
          synced: true,
          lastAccess: 'Just now'
        };
      }
      return p;
    }));

    setAuthMessage(`SUCCESS: NEW BIOMETRIC PRINT REGISTERED FOR ${cleanName.toUpperCase()}`);
    setRegisteringId(null);
    setNewProfileName('');
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
              <span className={`w-3 h-3 rounded-full ${isScanning ? 'bg-amber-500 animate-ping' : activeSession ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
              <span className="text-xs font-bold text-zinc-300">BIOMETRIC HARDWARE STATUS</span>
            </div>
            
            <div className="flex items-center gap-3">
              {activeSession ? (
                <>
                  <span className="text-xs bg-red-950/60 text-red-400 border border-red-600/40 px-3 py-1 rounded-lg font-bold">
                    Signed In: {activeSession.name}
                  </span>
                  <button 
                    onClick={handleSignOut}
                    className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 text-red-500 text-xs font-bold rounded-lg border border-red-900/50 transition-all"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <span className="text-xs bg-zinc-900 text-zinc-500 px-3 py-1 rounded-lg font-bold">
                  No Active Session
                </span>
              )}
            </div>
          </div>
          <div className="bg-black p-3 rounded-xl border border-zinc-900 text-xs font-mono text-red-400 tracking-wider">
            {authMessage}
          </div>
        </div>

        {/* Fingerprint Sensor Registry Deck */}
        <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800/80 shadow-xl flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">Fingerprint Sensor Registry (Max 5 Users)</h2>
            <p className="text-xs text-zinc-500 mt-1">Manage biometric prints, sign users into the hardware blender, or remove users to free up slots.</p>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            {profiles.map((profile) => (
              <div 
                key={profile.id} 
                className={`p-4 rounded-xl border transition-all flex flex-col gap-3 ${
                  activeSession?.id === profile.id 
                    ? 'bg-zinc-900 border-red-600 shadow-lg shadow-red-600/20' 
                    : 'bg-black/60 border-zinc-900 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className={`w-2.5 h-2.5 rounded-full ${profile.status === 'Active' ? 'bg-green-500' : 'bg-zinc-700'}`}></span>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        Profile 0{profile.id}: {profile.name}
                        {activeSession?.id === profile.id && (
                          <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded font-semibold">Active</span>
                        )}
                      </div>
                      <div className="text-[11px] text-zinc-500">{profile.role} {profile.lastAccess ? `• Last Access: ${profile.lastAccess}` : ''}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {profile.status === 'Active' ? (
                      <>
                        <button 
                          onClick={() => handleAuthenticate(profile)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                            activeSession?.id === profile.id
                              ? 'bg-zinc-800 text-zinc-400 cursor-default'
                              : 'bg-red-600 hover:bg-red-700 text-white shadow'
                          }`}
                        >
                          {activeSession?.id === profile.id ? 'In Use' : 'Sign In'}
                        </button>
                        <button 
                          onClick={() => handleRemoveUser(profile)}
                          className="px-3 py-1.5 bg-zinc-900 hover:bg-red-950 text-red-400 border border-zinc-800 hover:border-red-800 text-xs font-bold rounded-lg transition-all"
                          title="Remove user and free up slot"
                        >
                          Remove
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => setRegisteringId(profile.id)}
                        className="px-4 py-1.5 bg-zinc-900 hover:bg-red-600 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-bold rounded-lg transition-all"
                      >
                        Register Print
                      </button>
                    )}
                  </div>
                </div>

                {/* Inline Registration Form */}
                {registeringId === profile.id && (
                  <div className="bg-black p-3 rounded-xl border border-red-600/50 flex gap-2 items-center mt-2">
                    <input 
                      type="text"
                      placeholder="Enter new user/athlete name..."
                      value={newProfileName}
                      onChange={(e) => setNewProfileName(e.target.value)}
                      className="bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-lg text-xs text-white flex-1 focus:outline-none focus:border-red-600"
                    />
                    <button 
                      onClick={() => handleSaveRegistration(profile.id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow"
                    >
                      Save Print
                    </button>
                    <button 
                      onClick={() => setRegisteringId(null)}
                      className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 text-xs font-bold rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sign-In History Ledger Deck */}
        <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800/80 shadow-xl flex flex-col gap-4">
          <h3 className="text-sm font-bold text-white tracking-wide uppercase">Hardware Sign-In & Access History</h3>
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
            {history.map((item) => (
              <div key={item.id} className="bg-black px-4 py-3 rounded-xl border border-zinc-900 flex justify-between items-center text-xs">
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${item.action === 'SIGNED IN' ? 'bg-green-500' : item.action === 'SIGNED OUT' ? 'bg-amber-500' : 'bg-red-500'}`}></span>
                  <span className="font-bold text-white">{item.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                    item.action === 'SIGNED IN' ? 'bg-zinc-900 text-green-400' : 
                    item.action === 'SIGNED OUT' ? 'bg-zinc-900 text-amber-400' : 'bg-zinc-900 text-red-450'
                  }`}>
                    {item.action}
                  </span>
                </div>
                <span className="text-zinc-500 font-mono text-[11px]">{item.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}