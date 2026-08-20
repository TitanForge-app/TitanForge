'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TitanForgeSettings() {
  // Settings States
  const [hardwareUnit, setHardwareUnit] = useState<string>('TitanForge Unit v2.4 (Lagos Hub)');
  const [loadCellPrecision, setLoadCellPrecision] = useState<string>('High Precision (0.1g)');
  const [voiceControlActive, setVoiceControlActive] = useState<boolean>(true);
  const [autoTare, setAutoTare] = useState<boolean>(true);
  const [units, setUnits] = useState<string>('Metric (Grams / kcal)');
  const [notificationSound, setNotificationSound] = useState<boolean>(true);
  const [savedStatus, setSavedStatus] = useState<string>('');

  const handleSaveSettings = () => {
    setSavedStatus('Settings successfully saved to hardware vault!');
    setTimeout(() => {
      setSavedStatus('');
    }, 4000);
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
          <span className="text-xs text-red-500 font-bold uppercase">SYSTEM & HARDWARE SETTINGS</span>
        </div>
        <Link 
          href="/dashboard" 
          className="text-xs font-semibold px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 rounded-lg border border-zinc-800 transition-colors text-white inline-block"
        >
          ← Back to Dashboard
        </Link>
      </nav>

      {/* Main Settings Container */}
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-6">
        
        {/* Header Alert / Status Banner */}
        {savedStatus && (
          <div className="bg-green-950/40 border border-green-600/40 p-4 rounded-xl text-green-400 text-xs font-bold animate-pulse flex items-center justify-between">
            <span>✓ {savedStatus}</span>
          </div>
        )}

        <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800/80 shadow-xl flex flex-col gap-6">
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">Hardware Configuration</h2>
            <p className="text-xs text-zinc-500 mt-1">Manage load cell sensors, calibration parameters, and device linkages.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hardware Unit Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-zinc-400 uppercase">Connected Hardware Unit</label>
              <select 
                value={hardwareUnit}
                onChange={(e) => setHardwareUnit(e.target.value)}
                className="bg-zinc-900 border border-zinc-800 px-3 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-red-600"
              >
                <option value="TitanForge Unit v2.4 (Lagos Hub)">TitanForge Unit v2.4 (Lagos Hub)</option>
                <option value="TitanForge Unit v2.5 (Beta Node)">TitanForge Unit v2.5 (Beta Node)</option>
                <option value="Standalone Mobile Scale Kit">Standalone Mobile Scale Kit</option>
              </select>
            </div>

            {/* Load Cell Precision */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-zinc-400 uppercase">Load Cell Resolution</label>
              <select 
                value={loadCellPrecision}
                onChange={(e) => setLoadCellPrecision(e.target.value)}
                className="bg-zinc-900 border border-zinc-800 px-3 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-red-600"
              >
                <option value="High Precision (0.1g)">High Precision (0.1g)</option>
                <option value="Standard Precision (1.0g)">Standard Precision (1.0g)</option>
                <option value="Macro Track Mode Only">Macro Track Mode Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Preferences & Automation */}
        <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800/80 shadow-xl flex flex-col gap-6">
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">Interface & Automation Preferences</h2>
            <p className="text-xs text-zinc-500 mt-1">Configure voice triggers, measurement units, and scale auto-tare behaviors.</p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Voice Control Toggle */}
            <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-xl border border-zinc-800">
              <div>
                <div className="text-xs font-bold text-white">Default Voice Recognition</div>
                <div className="text-[10px] text-zinc-500">Allow microphone triggers like &quot;START BLEND&quot; or &quot;PULSE&quot;</div>
              </div>
              <button 
                onClick={() => setVoiceControlActive(!voiceControlActive)}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  voiceControlActive ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {voiceControlActive ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>

            {/* Auto Tare Toggle */}
            <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-xl border border-zinc-800">
              <div>
                <div className="text-xs font-bold text-white">Automatic Jar Tare (Zeroing)</div>
                <div className="text-[10px] text-zinc-500">Automatically zero scale weight when a new container is detected</div>
              </div>
              <button 
                onClick={() => setAutoTare(!autoTare)}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  autoTare ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {autoTare ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>

            {/* Sound Effects Toggle */}
            <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-xl border border-zinc-800">
              <div>
                <div className="text-xs font-bold text-white">Hardware Audio Feedback</div>
                <div className="text-[10px] text-zinc-500">Play confirmation beeps upon successful recipe save or timer completion</div>
              </div>
              <button 
                onClick={() => setNotificationSound(!notificationSound)}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  notificationSound ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {notificationSound ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end gap-3 pb-8">
          <button 
            onClick={handleSaveSettings}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-600/30 transition-all"
          >
            Save All Settings
          </button>
        </div>

      </div>
    </main>
  );
}