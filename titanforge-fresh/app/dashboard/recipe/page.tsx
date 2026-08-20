'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RecipeScaler() {
  // State for scale multiplier (1x standard, 1.5x, 2x heavy training)
  const [multiplier, setMultiplier] = useState<number>(1);

  // Base ingredients for standard 45g protein post-workout blend
  const baseIngredients = [
    { name: 'Whey Protein Isolate', baseAmount: 45, unit: 'g', calories: 180 },
    { name: 'Organic Rolled Oats', baseAmount: 80, unit: 'g', calories: 300 },
    { name: 'Almond Butter', baseAmount: 30, unit: 'g', calories: 190 },
    { name: 'Frozen Blueberries', baseAmount: 100, unit: 'g', calories: 57 },
    { name: 'Coconut Water', baseAmount: 350, unit: 'ml', calories: 65 },
  ];

  return (
    <main className="min-h-screen bg-black text-white flex flex-col p-8 selection:bg-red-600 selection:text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center pb-6 border-b border-zinc-900 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-extrabold tracking-wider">
            TITAN<span className="text-red-600">FORGE</span>
          </Link>
          <span className="text-zinc-600">/</span>
          <span className="text-sm font-medium text-red-500">Recipe & Scale Calibration</span>
        </div>
        <Link 
          href="/dashboard" 
          className="text-xs font-semibold px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg border border-zinc-800 transition-colors text-white inline-block"
        >
          ← Back to Dashboard
        </Link>
      </nav>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto w-full py-10">
        <div className="mb-8">
          <div className="inline-block px-3 py-1 rounded-full bg-red-950/40 border border-red-600/30 text-red-500 text-xs font-bold uppercase tracking-widest mb-3">
            Smart Dispenser Calibration
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold">Dynamic Macro Scaler</h1>
          <p className="text-zinc-400 text-sm mt-2">
            Select your training intensity multiplier to automatically recalculate blender compartment release quantities and nutritional totals.
          </p>
        </div>

        {/* Multiplier Selector Buttons */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Standard (1.0x)', value: 1, desc: 'Light Session' },
            { label: 'Intense (1.5x)', value: 1.5, desc: 'Heavy Lifting' },
            { label: 'Beast Mode (2.0x)', value: 2, desc: 'Full Endurance' },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setMultiplier(item.value)}
              className={`p-4 rounded-xl border text-left transition-all ${
                multiplier === item.value
                  ? 'bg-red-950/30 border-red-600 shadow-lg shadow-red-600/20'
                  : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="text-sm font-bold text-white">{item.label}</div>
              <div className="text-xs text-zinc-500 mt-1">{item.desc}</div>
            </button>
          ))}
        </div>

        {/* Ingredients & Scaled Quantities Table */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl mb-8">
          <div className="p-6 border-b border-zinc-900 flex justify-between items-center">
            <h2 className="font-bold text-lg">Hopper Dispense Breakdown</h2>
            <span className="text-xs text-red-500 font-semibold bg-red-950/50 px-3 py-1 rounded-full border border-red-600/30">
              Active Multiplier: {multiplier}x
            </span>
          </div>
          <div className="divide-y divide-zinc-900">
            {baseIngredients.map((ing, idx) => {
              const scaledAmount = Math.round(ing.baseAmount * multiplier);
              const scaledCalories = Math.round(ing.calories * multiplier);
              return (
                <div key={idx} className="p-5 flex items-center justify-between hover:bg-zinc-900/50 transition-colors">
                  <div>
                    <div className="font-medium text-white">{ing.name}</div>
                    <div className="text-xs text-zinc-500">Estimated ~{scaledCalories} kcal</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-extrabold text-red-500">{scaledAmount}</span>
                    <span className="text-sm text-zinc-400 ml-1">{ing.unit}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end gap-4">
          <button 
            onClick={() => alert(`Successfully synced ${multiplier}x profile to TitanForge Hardware Unit!`)}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-red-600/30"
          >
            Sync Scale to Blender Hardware →
          </button>
        </div>
      </div>
    </main>
  );
}