"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Ingredient {
  id: string;
  name: string;
  category: "fruits" | "veggies" | "proteins" | "fats";
  defaultGram: number;
  caloriesPer100g: number;
}

const INGREDIENTS_DATABASE: Ingredient[] = [
  // Fruits
  { id: "banana", name: "Banana", category: "fruits", defaultGram: 120, caloriesPer100g: 89 },
  { id: "strawberry", name: "Strawberries", category: "fruits", defaultGram: 100, caloriesPer100g: 32 },
  { id: "blueberry", name: "Blueberries", category: "fruits", defaultGram: 80, caloriesPer100g: 57 },
  { id: "mango", name: "Mango Chunks", category: "fruits", defaultGram: 150, caloriesPer100g: 60 },
  { id: "apple", name: "Green Apple", category: "fruits", defaultGram: 100, caloriesPer100g: 52 },
  { id: "pineapple", name: "Pineapple", category: "fruits", defaultGram: 120, caloriesPer100g: 50 },

  // Veggies
  { id: "spinach", name: "Baby Spinach", category: "veggies", defaultGram: 50, caloriesPer100g: 23 },
  { id: "kale", name: "Organic Kale", category: "veggies", defaultGram: 40, caloriesPer100g: 49 },
  { id: "cucumber", name: "Cucumber", category: "veggies", defaultGram: 100, caloriesPer100g: 15 },
  { id: "celery", name: "Celery Stalks", category: "veggies", defaultGram: 80, caloriesPer100g: 16 },
  { id: "beetroot", name: "Beetroot", category: "veggies", defaultGram: 70, caloriesPer100g: 43 },

  // Proteins
  { id: "whey_vanilla", name: "Whey Protein (Vanilla)", category: "proteins", defaultGram: 30, caloriesPer100g: 380 },
  { id: "whey_chocolate", name: "Whey Protein (Chocolate)", category: "proteins", defaultGram: 30, caloriesPer100g: 380 },
  { id: "plant_protein", name: "Pea/Plant Protein", category: "proteins", defaultGram: 30, caloriesPer100g: 370 },
  { id: "greek_yogurt", name: "Greek Yogurt (0%)", category: "proteins", defaultGram: 150, caloriesPer100g: 59 },

  // Dairy & Fats
  { id: "whole_milk", name: "Whole Milk", category: "fats", defaultGram: 250, caloriesPer100g: 61 },
  { id: "almond_milk", name: "Almond Milk", category: "fats", defaultGram: 250, caloriesPer100g: 15 },
  { id: "oat_milk", name: "Oat Milk", category: "fats", defaultGram: 250, caloriesPer100g: 48 },
  { id: "peanut_butter", name: "Peanut Butter", category: "fats", defaultGram: 32, caloriesPer100g: 588 },
  { id: "chia_seeds", name: "Chia Seeds", category: "fats", defaultGram: 15, caloriesPer100g: 486 },
];

export default function DashboardPage() {
  const [heartRate, setHeartRate] = useState(168);
  const [power, setPower] = useState(8.2);
  const [selectedTab, setSelectedTab] = useState("overview");

  // Ingredient Builder State
  const [activeCategory, setActiveCategory] = useState<"all" | "fruits" | "veggies" | "proteins" | "fats">("all");
  const [selectedIngredients, setSelectedIngredients] = useState<{ ingredient: Ingredient; weightGrams: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate((prev) => prev + Math.floor(Math.random() * 5) - 2);
      setPower((prev) => parseFloat((prev + (Math.random() * 0.4 - 0.2)).toFixed(1)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const addIngredient = (item: Ingredient) => {
    setSelectedIngredients((prev) => {
      const existing = prev.find((i) => i.ingredient.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.ingredient.id === item.id ? { ...i, weightGrams: i.weightGrams + item.defaultGram } : i
        );
      }
      return [...prev, { ingredient: item, weightGrams: item.defaultGram }];
    });
  };

  const removeIngredient = (id: string) => {
    setSelectedIngredients((prev) => prev.filter((i) => i.ingredient.id !== id));
  };

  const totalWeight = selectedIngredients.reduce((sum, item) => sum + item.weightGrams, 0);
  const totalCalories = selectedIngredients.reduce(
    (sum, item) => sum + Math.round((item.weightGrams * item.ingredient.caloriesPer100g) / 100),
    0
  );

  const filteredIngredients =
    activeCategory === "all"
      ? INGREDIENTS_DATABASE
      : INGREDIENTS_DATABASE.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      {/* Top Bar */}
      <header className="flex justify-between items-center px-8 py-4 border-b border-zinc-800 bg-zinc-950">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-xl font-bold tracking-wider text-red-600 hover:text-red-500 transition">
            TITANFORGE
          </Link>
          <span className="text-xs font-mono bg-zinc-900 text-zinc-400 px-2.5 py-1 rounded border border-zinc-800">
            DASHBOARD v1.0
          </span>
        </div>
        <div className="flex items-center space-x-4 text-xs font-mono">
          <span className="flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>BLENDER: SYNCHRONIZED</span>
          </span>
          <span className="text-zinc-500">ATHLETE ID: #TF-042</span>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-zinc-800 p-6 space-y-6 bg-zinc-950/50">
          <div className="text-xs font-semibold text-zinc-500 tracking-wider">NAVIGATION</div>
          <nav className="space-y-2">
            {[
              { id: "overview", label: "Overview" },
              { id: "biometrics", label: "Biometrics" },
              { id: "ingredients", label: "Recipes & Scale" },
              { id: "tactical", label: "Blender Analytics" },
              { id: "settings", label: "Settings" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                  selectedTab === tab.id
                    ? "bg-red-600 text-white font-semibold"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Dashboard Panels */}
        <main className="flex-1 p-8 space-y-8">
          {selectedTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight">ATHLETE TELEMETRY</h2>
                <p className="text-sm text-zinc-400">Real-time biomechanical analysis & sync metrics.</p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-5 bg-zinc-900/60 rounded-xl border border-zinc-800">
                  <div className="text-xs font-bold text-zinc-400 tracking-wider">LIVE HEART RATE</div>
                  <div className="flex items-baseline space-x-2 mt-2">
                    <span className="text-3xl font-black">{heartRate}</span>
                    <span className="text-xs font-bold text-red-500">BPM</span>
                  </div>
                  <div className="text-xs text-zinc-500 mt-2">↑ Dynamic stream</div>
                </div>

                <div className="p-5 bg-zinc-900/60 rounded-xl border border-zinc-800">
                  <div className="text-xs font-bold text-zinc-400 tracking-wider">POWER OUTPUT</div>
                  <div className="flex items-baseline space-x-2 mt-2">
                    <span className="text-3xl font-black">{power}</span>
                    <span className="text-xs text-zinc-400">kW</span>
                  </div>
                  <div className="text-xs text-zinc-500 mt-2">Peak target: 9.0 kW</div>
                </div>

                <div className="p-5 bg-zinc-900/60 rounded-xl border border-zinc-800">
                  <div className="text-xs font-bold text-zinc-400 tracking-wider">STAMINA RESERVE</div>
                  <div className="text-3xl font-black mt-2">88%</div>
                  <div className="text-xs text-emerald-400 mt-2 font-medium">Optimal threshold</div>
                </div>

                <div className="p-5 bg-zinc-900/60 rounded-xl border border-zinc-800">
                  <div className="text-xs font-bold text-zinc-400 tracking-wider">FATIGUE SCORE</div>
                  <div className="text-3xl font-black text-emerald-400 mt-2">LOW</div>
                  <div className="text-xs text-zinc-500 mt-2">Recovery rate nominal</div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === "biometrics" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight">BIOMETRIC HARDWARE MANAGER</h2>
                <p className="text-sm text-zinc-400">On-board optical fingerprint module (Capacity: 5 Profiles)</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map((slot) => (
                  <div key={slot} className="p-5 bg-zinc-900/60 rounded-xl border border-zinc-800 text-center space-y-3">
                    <div className="text-xs font-mono text-zinc-500">PROFILE 0{slot}</div>
                    <div className="text-sm font-bold text-zinc-200">
                      {slot <= 2 ? `Athlete #${slot}` : "Unassigned"}
                    </div>
                    <span
                      className={`inline-block px-2.5 py-1 text-xs font-mono rounded-full ${
                        slot <= 2
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-zinc-800 text-zinc-500 border border-zinc-700"
                      }`}
                    >
                      {slot <= 2 ? "ENROLLED" : "EMPTY"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === "ingredients" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight">SMART RECIPE & LOAD CELL MEASUREMENT</h2>
                <p className="text-sm text-zinc-400">
                  Select ingredients to measure quantity and calculate real-time weight inside the blender jar.
                </p>
              </div>

              {/* Category Filter Buttons */}
              <div className="flex space-x-2 border-b border-zinc-800 pb-4">
                {[
                  { id: "all", label: "All Items" },
                  { id: "fruits", label: "🍎 Fruits" },
                  { id: "veggies", label: "🥬 Veggies" },
                  { id: "proteins", label: "⚡ Proteins" },
                  { id: "fats", label: "🥛 Dairy & Fats" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as any)}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                      activeCategory === cat.id
                        ? "bg-zinc-100 text-black"
                        : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Available Ingredients Catalog */}
                <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {filteredIngredients.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl hover:border-red-600/50 transition flex flex-col justify-between space-y-3"
                    >
                      <div>
                        <div className="text-xs font-mono text-zinc-500 uppercase">{item.category}</div>
                        <div className="text-sm font-bold text-zinc-100 mt-1">{item.name}</div>
                        <div className="text-xs text-zinc-400 mt-0.5">~{item.defaultGram}g portion</div>
                      </div>
                      <button
                        onClick={() => addIngredient(item)}
                        className="w-full py-1.5 text-xs font-semibold bg-zinc-800 hover:bg-red-600 text-white rounded-md transition"
                      >
                        + Add to Jar
                      </button>
                    </div>
                  ))}
                </div>

                {/* Live Load Cell Scale Simulation */}
                <div className="p-6 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-6 h-fit">
                  <div>
                    <h3 className="text-sm font-bold text-zinc-300">JAR LOAD CELL SCALE</h3>
                    <p className="text-xs text-zinc-500">Live weight telemetry from blender base</p>
                  </div>

                  <div className="p-4 bg-black border border-zinc-800 rounded-lg text-center space-y-1">
                    <div className="text-xs font-mono text-zinc-500">TOTAL WEIGHT</div>
                    <div className="text-4xl font-black text-emerald-400">{totalWeight} <span className="text-sm text-zinc-400">g</span></div>
                    <div className="text-xs font-mono text-zinc-400 pt-1">Est. Calories: <span className="text-white font-bold">{totalCalories} kcal</span></div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs font-bold text-zinc-400">JAR CONTENTS:</div>
                    {selectedIngredients.length === 0 ? (
                      <div className="text-xs text-zinc-600 italic py-4 text-center">Jar is empty. Add ingredients to begin.</div>
                    ) : (
                      selectedIngredients.map(({ ingredient, weightGrams }) => (
                        <div key={ingredient.id} className="flex justify-between items-center text-xs p-2 bg-zinc-800/40 rounded border border-zinc-800">
                          <div>
                            <span className="font-semibold text-zinc-200">{ingredient.name}</span>
                            <span className="text-zinc-500 ml-2">({weightGrams}g)</span>
                          </div>
                          <button
                            onClick={() => removeIngredient(ingredient.id)}
                            className="text-red-500 hover:text-red-400 text-xs font-bold ml-2"
                          >
                            ✕
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {selectedIngredients.length > 0 && (
                    <button
                      onClick={() => setSelectedIngredients([])}
                      className="w-full py-2 text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-lg transition"
                    >
                      Clear Jar Scale
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {selectedTab === "tactical" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight">BLENDING TELEMETRY & MOTOR METRICS</h2>
                <p className="text-sm text-zinc-400">Real-time RPM performance, blade torque, and blend consistency tracking.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-4">
                  <div className="text-xs font-bold text-zinc-400 tracking-wider">MOTOR SPEED (RPM)</div>
                  <div className="text-3xl font-black text-white">22,400 <span className="text-sm text-zinc-500">RPM</span></div>
                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-red-600 h-full w-[85%]"></div>
                  </div>
                  <p className="text-xs text-zinc-500">High-torque pulse active</p>
                </div>

                <div className="p-5 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-4">
                  <div className="text-xs font-bold text-zinc-400 tracking-wider">BLEND DURATION</div>
                  <div className="text-3xl font-black text-white">00:45 <span className="text-sm text-zinc-500">sec</span></div>
                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[45%]"></div>
                  </div>
                  <p className="text-xs text-zinc-500">Target blend cycle duration: 60s</p>
                </div>

                <div className="p-5 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-4">
                  <div className="text-xs font-bold text-zinc-400 tracking-wider">CONSISTENCY SCORE</div>
                  <div className="text-3xl font-black text-emerald-400">98.2%</div>
                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full w-[98%]"></div>
                  </div>
                  <p className="text-xs text-zinc-500">Optimal micro-emulsion reached</p>
                </div>
              </div>

              {/* Motor Power Output Stream */}
              <div className="p-6 bg-zinc-900/40 rounded-xl border border-zinc-800 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-zinc-300">BLADE TORQUE & RESISTANCE WAVEFORM</h3>
                  <span className="text-xs font-mono text-zinc-500">TELEMETRY STREAM</span>
                </div>
                <div className="h-48 border border-dashed border-zinc-700/60 rounded-lg flex items-center justify-center bg-zinc-950/50 text-zinc-600 font-mono text-xs">
                  [ Real-time Motor Load & Resistance Curve Stream ]
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}