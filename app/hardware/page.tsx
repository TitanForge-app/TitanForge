"use client";

import { useState } from "react";

export default function Hardware() {
  const [pairing, setPairing] = useState(false);
  const [connected, setConnected] = useState(false);
  const [fingerprintStatus, setFingerprintStatus] = useState("Idle");
  
  // Profile slots management state (max 5 slots)
  const [profiles, setProfiles] = useState([
    { id: 1, name: "Head Coach", active: true },
    { id: 2, name: "Lead Analyst", active: true },
    { id: 3, name: "Athlete #1", active: false },
    { id: 4, name: "Empty Slot", active: false },
    { id: 5, name: "Empty Slot", active: false },
  ]);

  const handlePairDevice = () => {
    setPairing(true);
    setTimeout(() => {
      setPairing(false);
      setConnected(true);
    }, 2000);
  };

  const handleBiometricScan = () => {
    setFingerprintStatus("Scanning...");
    setTimeout(() => {
      setFingerprintStatus("Authenticated (Profile 1/5)");
    }, 1800);
  };

  const toggleProfile = (id: number) => {
    setProfiles((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-zinc-800 bg-zinc-950/80 sticky top-0 z-50">
        <a href="/" className="text-2xl font-black text-red-600 tracking-wider">
          TITANFORGE
        </a>
        <div className="space-x-6 text-sm font-medium text-zinc-400">
          <a href="/" className="hover:text-white transition">Home</a>
          <a href="/dashboard" className="hover:text-white transition">Dashboard</a>
          <a href="/hardware" className="text-red-500 font-bold">Hardware Sync</a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-5xl mx-auto w-full">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">
            HARDWARE & SENSOR INTEGRATION
          </h1>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto">
            Configure biometric hardware interfaces, low-latency Bluetooth connectivity, and profile security protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bluetooth LE Pairing Card */}
          <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Protocol: BLE 5.2</span>
                <span className={`h-2.5 w-2.5 rounded-full ${connected ? "bg-emerald-500 animate-pulse" : "bg-zinc-700"}`}></span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Biometric Sensor Sync</h2>
              <p className="text-zinc-400 text-sm mb-6">
                Connect external sensor arrays and custom hardware tunnels over low-energy local telemetry streams.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-zinc-900/60 border border-zinc-800/80 rounded-xl flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-400">Status:</span>
                <span className={connected ? "text-emerald-400 font-bold" : "text-zinc-500"}>
                  {connected ? "DEVICE PAIRED (TF-8890)" : "DISCONNECTED"}
                </span>
              </div>

              <button
                onClick={handlePairDevice}
                disabled={pairing || connected}
                className={`w-full py-3.5 rounded-xl text-sm font-bold transition shadow-lg ${
                  connected
                    ? "bg-zinc-900 text-zinc-500 border border-zinc-800 cursor-default"
                    : pairing
                    ? "bg-red-950/60 text-red-400 border border-red-800/40 animate-pulse"
                    : "bg-red-600 hover:bg-red-700 text-white shadow-red-950/50"
                }`}
              >
                {pairing ? "Initiating Pairing..." : connected ? "Device Ready" : "Pair Sensor Device"}
              </button>
            </div>
          </div>

          {/* Biometric Fingerprint Sensor Card */}
          <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Security: On-Device</span>
                <span className="text-xs font-mono text-red-500 bg-red-950/50 px-2 py-0.5 rounded border border-red-900/40">
                  Encrypted
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Fingerprint Authenticator</h2>
              <p className="text-zinc-400 text-sm mb-6">
                Hardware-level biometric verification supporting up to 5 authorized user profile slots.
              </p>

              {/* Profile Slots Grid */}
              <div className="space-y-2 mb-6">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block mb-2">
                  Authorized Profiles (5 Max)
                </span>
                {profiles.map((p) => (
                  <div
                    key={p.id}
                    className="p-2.5 bg-zinc-900/60 border border-zinc-800/80 rounded-lg flex justify-between items-center text-xs font-mono"
                  >
                    <span className="text-zinc-300">Slot #{p.id}: {p.name}</span>
                    <button
                      onClick={() => toggleProfile(p.id)}
                      className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition ${
                        p.active
                          ? "bg-emerald-950/60 border border-emerald-800/60 text-emerald-400"
                          : "bg-zinc-800 text-zinc-500"
                      }`}
                    >
                      {p.active ? "Enrolled" : "Register"}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-zinc-900/60 border border-zinc-800/80 rounded-xl flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-400">Scanner state:</span>
                <span className="text-red-400 font-bold">{fingerprintStatus}</span>
              </div>

              <button
                onClick={handleBiometricScan}
                className="w-full py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 font-bold rounded-xl transition text-sm shadow-md"
              >
                Scan Fingerprint
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}