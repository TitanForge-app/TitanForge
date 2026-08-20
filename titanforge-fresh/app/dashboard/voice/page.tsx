'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface LogItem {
  id: string;
  message: string;
  type: 'bluetooth' | 'voice';
  timestamp: string;
}

export default function VoiceAndBluetooth() {
  // Initialize state from sessionStorage so disconnection persists across navigation
  const [isConnected, setIsConnected] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('titanforge_bt_connected');
      return saved !== null ? JSON.parse(saved) : true;
    }
    return true;
  });

  const [signalStrength, setSignalStrength] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('titanforge_bt_connected');
      return saved !== null && JSON.parse(saved) === false ? 'DISCONNECTED' : '-42dBm (Optimal)';
    }
    return '-42dBm (Optimal)';
  });

  const [isListening, setIsListening] = useState<boolean>(false);
  const [activeCommand, setActiveCommand] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('titanforge_bt_connected');
      return saved !== null && JSON.parse(saved) === false ? 'BLUETOOTH LINK TERMINATED' : 'SYSTEM IDLE: AWAITING VOICE COMMAND OR BLUETOOTH SYNC';
    }
    return 'SYSTEM IDLE: AWAITING VOICE COMMAND OR BLUETOOTH SYNC';
  });
  
  const [logs, setLogs] = useState<LogItem[]>([
    { id: '1', message: 'Bluetooth 5.3 module initialized successfully.', type: 'bluetooth', timestamp: 'Today, 08:00 AM' }
  ]);

  // Sync connection state to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('titanforge_bt_connected', JSON.stringify(isConnected));
  }, [isConnected]);

  const getTimeString = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ', Today';
  };

  // Toggle Bluetooth Connection
  const handleToggleBluetooth = () => {
    if (isConnected) {
      setIsConnected(false);
      setSignalStrength('DISCONNECTED');
      setActiveCommand('BLUETOOTH LINK TERMINATED');
      setLogs(prev => [
        { id: Date.now().toString(), message: 'Disconnected from TitanForge Blender Unit #01.', type: 'bluetooth', timestamp: getTimeString() },
        ...prev
      ]);
    } else {
      setIsConnected(true);
      setSignalStrength('-42dBm (Optimal)');
      setActiveCommand('BLUETOOTH RE-ESTABLISHED: BLENDER READY');
      setLogs(prev => [
        { id: Date.now().toString(), message: 'Successfully paired with TitanForge Blender Unit #01.', type: 'bluetooth', timestamp: getTimeString() },
        ...prev
      ]);
    }
  };

  // Simulate Voice Command Execution
  const handleVoiceCommand = (commandName: string, description: string) => {
    if (!isConnected) {
      alert('Error: Bluetooth hardware is disconnected. Please pair and connect the unit to execute voice commands.');
      return;
    }

    setIsListening(true);
    setActiveCommand(`PROCESSING VOICE COMMAND: "${commandName.toUpperCase()}"...`);

    setTimeout(() => {
      setIsListening(false);
      setActiveCommand(`EXECUTED: ${description}`);
      setLogs(prev => [
        { id: Date.now().toString(), message: `Voice Trigger: "${commandName}" -> ${description}`, type: 'voice', timestamp: getTimeString() },
        ...prev
      ]);
    }, 1200);
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
          <span className="text-xs text-red-500 font-bold uppercase">VOICE & BLUETOOTH</span>
        </div>
        <Link 
          href="/dashboard" 
          className="text-xs font-semibold px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 rounded-lg border border-zinc-800 transition-colors text-white inline-block"
        >
          ← Back to Dashboard
        </Link>
      </nav>

      <div className="max-w-4xl mx-auto w-full flex flex-col gap-6">
        
        {/* Real-time Status Banner */}
        <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800 shadow-xl flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${isListening ? 'bg-amber-500 animate-ping' : isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
              <span className="text-xs font-bold text-zinc-300">HARDWARE TELEMETRY STREAM</span>
            </div>
            <span className="text-xs bg-zinc-900 text-zinc-400 border border-zinc-800 px-3 py-1 rounded-lg font-bold">
              Signal: {signalStrength}
            </span>
          </div>
          <div className="bg-black p-3 rounded-xl border border-zinc-900 text-xs font-mono text-red-400 tracking-wider">
            {activeCommand}
          </div>
        </div>

        {/* Bluetooth 5.3 Synchronization Section */}
        <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800/80 shadow-xl flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide">Bluetooth 5.3 Synchronization</h2>
              <p className="text-xs text-zinc-500 mt-1">Connected directly to the TitanForge Biometric Blender base unit for real-time telemetry and macro tracking.</p>
            </div>
            <button 
              onClick={handleToggleBluetooth}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all border ${
                isConnected 
                  ? 'bg-zinc-900 hover:bg-red-950 text-red-400 border-zinc-800 hover:border-red-800' 
                  : 'bg-red-600 hover:bg-red-700 text-white border-red-600 shadow-lg shadow-red-600/30'
              }`}
            >
              {isConnected ? 'Disconnect Unit' : 'Pair & Connect'}
            </button>
          </div>

          <div className={`p-4 rounded-xl border flex items-center justify-between transition-all ${isConnected ? 'bg-black/60 border-zinc-900' : 'bg-zinc-950 border-red-950/50 opacity-60'}`}>
            <div className="flex items-center gap-4">
              <span className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
              <div>
                <div className="text-sm font-bold text-white">TitanForge Blender Unit #01</div>
                <div className="text-[11px] text-zinc-500">Signal Strength: {signalStrength}</div>
              </div>
            </div>
            <span className={`text-xs px-3 py-1 rounded-lg border font-bold ${isConnected ? 'bg-zinc-900 text-green-400 border-zinc-800' : 'bg-red-950/40 text-red-400 border-red-900/40'}`}>
              {isConnected ? 'Connected' : 'Offline'}
            </span>
          </div>
        </div>

        {/* Voice-Activated Blending Cycles Section */}
        <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800/80 shadow-xl flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">Voice-Activated Blending Cycles</h2>
            <p className="text-xs text-zinc-500 mt-1">Issue preset post-workout commands or initiate custom RPM schedules hands-free from your training mat.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
            <button 
              onClick={() => handleVoiceCommand('Turbo Recovery', 'Executed 35,000 RPM high-velocity recovery macro cycle.')}
              className="p-4 bg-black/60 hover:bg-zinc-900 border border-zinc-900 hover:border-red-600 rounded-xl text-left transition-all flex flex-col gap-2 group"
            >
              <div className="text-xs font-bold text-red-500 group-hover:text-red-400">🎙️ "Turbo Recovery"</div>
              <p className="text-[11px] text-zinc-400">Initiates high-velocity protein fragmentation for instant post-training assimilation.</p>
            </button>

            <button 
              onClick={() => handleVoiceCommand('Precision Clean', 'Executed automated ultrasonic self-wash cleaning cycle.')}
              className="p-4 bg-black/60 hover:bg-zinc-900 border border-zinc-900 hover:border-red-600 rounded-xl text-left transition-all flex flex-col gap-2 group"
            >
              <div className="text-xs font-bold text-red-500 group-hover:text-red-400">🎙️ "Precision Clean"</div>
              <p className="text-[11px] text-zinc-400">Triggers internal blade cavitation and sanitizing rinse sequence.</p>
            </button>

            <button 
              onClick={() => handleVoiceCommand('Custom Macro Blend', 'Executed biometric-synced customized macro schedule.')}
              className="p-4 bg-black/60 hover:bg-zinc-900 border border-zinc-900 hover:border-red-600 rounded-xl text-left transition-all flex flex-col gap-2 group"
            >
              <div className="text-xs font-bold text-red-500 group-hover:text-red-400">🎙️ "Custom Macro Blend"</div>
              <p className="text-[11px] text-zinc-400">Pulls live load cell weight targets and blends according to active profile limits.</p>
            </button>
          </div>
        </div>

        {/* Telemetry Log Feed */}
        <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800/80 shadow-xl flex flex-col gap-4">
          <h3 className="text-sm font-bold text-white tracking-wide uppercase">Hardware Activity Feed</h3>
          <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1">
            {logs.map((log) => (
              <div key={log.id} className="bg-black px-4 py-3 rounded-xl border border-zinc-900 flex justify-between items-center text-xs">
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${log.type === 'bluetooth' ? 'bg-blue-500' : 'bg-red-500'}`}></span>
                  <span className="text-zinc-300 font-mono">{log.message}</span>
                </div>
                <span className="text-zinc-500 text-[11px]">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}