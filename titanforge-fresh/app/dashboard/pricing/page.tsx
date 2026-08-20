'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PricingPage() {
  const [selectedTier, setSelectedTier] = useState<string>('Hardware MSRP');
  const [notification, setNotification] = useState<string>('SUCCESS: SELECTED [HARDWARE MSRP] AT $299. READY FOR PROTOTYPE DEPLOYMENT.');

  const handleSelectTier = (tierName: string, price: string, message: string) => {
    setSelectedTier(tierName);
    setNotification(`SUCCESS: SELECTED [${tierName.toUpperCase()}] AT ${price}. ${message}`);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col p-6 selection:bg-red-600 selection:text-white font-mono">
      {/* Top Navbar */}
      <nav className="flex justify-between items-center pb-4 border-b border-zinc-900 mb-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-black tracking-wider">
            TITAN<span className="text-red-600">FORGE</span>
          </Link>
          <span className="text-zinc-700">/</span>
          <span className="text-xs text-red-500 font-bold uppercase">INVESTOR PRICING TIERS</span>
        </div>
        <Link 
          href="/dashboard" 
          className="text-xs font-semibold px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 rounded-lg border border-zinc-800 transition-colors text-white inline-block"
        >
          ← Back to Dashboard
        </Link>
      </nav>

      <div className="max-w-6xl mx-auto w-full flex flex-col gap-8">
        
        {/* Header & Status Banner */}
        <div className="text-center flex flex-col gap-3">
          <h1 className="text-3xl font-black tracking-tight text-white">Commercial Pricing Strategy</h1>
          <p className="text-xs text-zinc-400 max-w-xl mx-auto">
            Monetization structure across hardware units, pro app subscriptions, and B2B organizational portals as outlined in the Pre-Seed Investor Proposal.
          </p>
          <div className="mt-2 bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs font-mono text-red-400 tracking-wider max-w-2xl mx-auto w-full shadow-lg">
            {notification}
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Tier 1: Hardware MSRP */}
          <div className={`bg-zinc-950 p-6 rounded-2xl border transition-all flex flex-col justify-between shadow-xl ${selectedTier === 'Hardware MSRP' ? 'border-red-600 shadow-red-600/20 ring-1 ring-red-600' : 'border-zinc-800/80 hover:border-zinc-700'}`}>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest bg-red-950/40 border border-red-900/40 px-2.5 py-1 rounded-md">Hardware Unit</span>
                <span className="text-xs text-zinc-500 font-mono">63% Gross Margin[span_1](start_span)[span_1](end_span)</span>
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Titanforge Blender</h2>
                <div className="text-3xl font-black text-white mt-3">$299 <span className="text-xs text-zinc-500 font-normal">MSRP[span_2](start_span)[span_2](end_span)</span></div>
              </div>
              <ul className="text-xs text-zinc-400 flex flex-col gap-2 mt-2 border-t border-zinc-900 pt-4">
                <li>• Capacitive Fingerprint Sensor (&lt;0.3s auth)[span_3](start_span)[span_3](end_span)</li>
                <li>• Integrated Precision Scale &amp; Vacuum Blending[span_4](start_span)[span_4](end_span)</li>
                <li>• Bluetooth 5.3 &amp; Wi-Fi Connectivity[span_5](start_span)[span_5](end_span)</li>
                <li>• Capped at 5 Local Biometric Profiles[span_6](start_span)[span_6](end_span)</li>
              </ul>
            </div>
            <button 
              onClick={() => handleSelectTier('Hardware MSRP', '$299', 'READY FOR INITIAL 100-UNIT PRODUCTION RUN.')}
              className={`mt-8 w-full py-2.5 text-xs font-bold rounded-xl shadow transition-all ${selectedTier === 'Hardware MSRP' ? 'bg-red-600 text-white shadow-red-600/30' : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'}`}
            >
              {selectedTier === 'Hardware MSRP' ? 'Selected Tier Active' : 'Order Unit'}
            </button>
          </div>

          {/* Tier 2: Pro App SaaS */}
          <div className={`bg-zinc-950 p-6 rounded-2xl border transition-all flex flex-col justify-between shadow-xl ${selectedTier === 'Pro App SaaS' ? 'border-red-600 shadow-red-600/20 ring-1 ring-red-600' : 'border-zinc-800/80 hover:border-zinc-700'}`}>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest bg-red-950/40 border border-red-900/40 px-2.5 py-1 rounded-md">Consumer SaaS</span>
                <span className="text-xs text-zinc-500 font-mono">Recurring Revenue</span>
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Pro App Subscription</h2>
                <div className="text-3xl font-black text-white mt-3">$9.99 <span className="text-xs text-zinc-500 font-normal">/ month[span_7](start_span)[span_7](end_span)</span></div>
              </div>
              <ul className="text-xs text-zinc-400 flex flex-col gap-2 mt-2 border-t border-zinc-900 pt-4">
                <li>• AI-Powered Meal Customization[span_8](start_span)[span_8](end_span)</li>
                <li>• Automated Real-Time Macro Logging[span_9](start_span)[span_9](end_span)</li>
                <li>• Integration with Garmin, WHOOP, Apple Health[span_10](start_span)[span_10](end_span)</li>
                <li>• Advanced Nutritional History &amp; Analytics</li>
              </ul>
            </div>
            <button 
              onClick={() => handleSelectTier('Pro App SaaS', '$9.99/mo', 'AI MEAL CUSTOMIZATION ENGINE ENGAGED.')}
              className={`mt-8 w-full py-2.5 text-xs font-bold rounded-xl shadow transition-all ${selectedTier === 'Pro App SaaS' ? 'bg-red-600 text-white shadow-red-600/30' : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'}`}
            >
              {selectedTier === 'Pro App SaaS' ? 'Selected Tier Active' : 'Subscribe Pro'}
            </button>
          </div>

          {/* Tier 3: B2B Dashboard */}
          <div className={`bg-zinc-950 p-6 rounded-2xl border transition-all flex flex-col justify-between shadow-xl ${selectedTier === 'B2B Dashboard' ? 'border-red-600 shadow-red-600/20 ring-1 ring-red-600' : 'border-zinc-800/80 hover:border-zinc-700'}`}>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest bg-red-950/40 border border-red-900/40 px-2.5 py-1 rounded-md">Enterprise B2B</span>
                <span className="text-xs text-zinc-500 font-mono">Per Organization[span_11](start_span)[span_11](end_span)</span>
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Coach Dashboard</h2>
                <div className="text-3xl font-black text-white mt-3">$149 <span className="text-xs text-zinc-500 font-normal">/ month[span_12](start_span)[span_12](end_span)</span></div>
              </div>
              <ul className="text-xs text-zinc-400 flex flex-col gap-2 mt-2 border-t border-zinc-900 pt-4">
                <li>• Real-Time Athlete Nutrition Compliance Monitoring[span_13](start_span)[span_13](end_span)</li>
                <li>• Multi-Athlete Roster &amp; Macro Assignment Portal</li>
                <li>• Off-the-Court Recovery Tracking &amp; Reports</li>
                <li>• Direct Team Sync via Cloud API</li>
              </ul>
            </div>
            <button 
              onClick={() => handleSelectTier('B2B Dashboard', '$149/mo', 'PILOT DEPLOYMENT READY FOR 5 PARTNER SPORTS ACADEMIES.')}
              className={`mt-8 w-full py-2.5 text-xs font-bold rounded-xl shadow transition-all ${selectedTier === 'B2B Dashboard' ? 'bg-red-600 text-white shadow-red-600/30' : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'}`}
            >
              {selectedTier === 'B2B Dashboard' ? 'Selected Tier Active' : 'Deploy B2B Portal'}
            </button>
          </div>

        </div>

      </div>
    </main>
  );
}