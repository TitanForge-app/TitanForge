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
  // --- FRUITS ---
  { id: "banana", name: "Banana", category: "fruits", defaultGram: 120, caloriesPer100g: 89 },
  { id: "watermelon", name: "Watermelon", category: "fruits", defaultGram: 150, caloriesPer100g: 30 },
  { id: "strawberry", name: "Strawberries", category: "fruits", defaultGram: 100, caloriesPer100g: 32 },
  { id: "blueberry", name: "Blueberries", category: "fruits", defaultGram: 80, caloriesPer100g: 57 },
  { id: "raspberry", name: "Raspberries", category: "fruits", defaultGram: 80, caloriesPer100g: 52 },
  { id: "blackberry", name: "Blackberries", category: "fruits", defaultGram: 80, caloriesPer100g: 43 },
  { id: "mango", name: "Mango Chunks", category: "fruits", defaultGram: 150, caloriesPer100g: 60 },
  { id: "apple_green", name: "Green Apple", category: "fruits", defaultGram: 100, caloriesPer100g: 52 },
  { id: "apple_red", name: "Red Apple", category: "fruits", defaultGram: 100, caloriesPer100g: 52 },
  { id: "pineapple", name: "Pineapple", category: "fruits", defaultGram: 120, caloriesPer100g: 50 },
  { id: "papaya", name: "Papaya", category: "fruits", defaultGram: 140, caloriesPer100g: 43 },
  { id: "peach", name: "Peach", category: "fruits", defaultGram: 100, caloriesPer100g: 39 },
  { id: "pear", name: "Pear", category: "fruits", defaultGram: 120, caloriesPer100g: 57 },
  { id: "plum", name: "Plum", category: "fruits", defaultGram: 80, caloriesPer100g: 46 },
  { id: "kiwi", name: "Kiwi", category: "fruits", defaultGram: 70, caloriesPer100g: 61 },
  { id: "orange", name: "Orange Segments", category: "fruits", defaultGram: 100, caloriesPer100g: 47 },
  { id: "grapefruit", name: "Grapefruit", category: "fruits", defaultGram: 120, caloriesPer100g: 42 },
  { id: "grapes_red", name: "Red Grapes", category: "fruits", defaultGram: 90, caloriesPer100g: 69 },
  { id: "grapes_green", name: "Green Grapes", category: "fruits", defaultGram: 90, caloriesPer100g: 69 },
  { id: "pomegranate", name: "Pomegranate Seeds", category: "fruits", defaultGram: 80, caloriesPer100g: 83 },
  { id: "cantaloupe", name: "Cantaloupe Melon", category: "fruits", defaultGram: 150, caloriesPer100g: 34 },
  { id: "honeydew", name: "Honeydew Melon", category: "fruits", defaultGram: 150, caloriesPer100g: 36 },
  { id: "cherries", name: "Cherries (Pitted)", category: "fruits", defaultGram: 90, caloriesPer100g: 50 },
  { id: "figs", name: "Fresh Figs", category: "fruits", defaultGram: 70, caloriesPer100g: 74 },
  { id: "passionfruit", name: "Passion Fruit", category: "fruits", defaultGram: 50, caloriesPer100g: 97 },
  { id: "dragonfruit", name: "Dragon Fruit", category: "fruits", defaultGram: 120, caloriesPer100g: 60 },
  { id: "avocado", name: "Avocado", category: "fruits", defaultGram: 80, caloriesPer100g: 160 },
  { id: "lemon", name: "Lemon Juice", category: "fruits", defaultGram: 30, caloriesPer100g: 22 },
  { id: "lime", name: "Lime Juice", category: "fruits", defaultGram: 30, caloriesPer100g: 25 },

  // --- VEGGIES ---
  { id: "carrot", name: "Carrots", category: "veggies", defaultGram: 100, caloriesPer100g: 41 },
  { id: "spinach", name: "Baby Spinach", category: "veggies", defaultGram: 50, caloriesPer100g: 23 },
  { id: "kale", name: "Organic Kale", category: "veggies", defaultGram: 40, caloriesPer100g: 49 },
  { id: "cucumber", name: "Cucumber", category: "veggies", defaultGram: 100, caloriesPer100g: 15 },
  { id: "celery", name: "Celery Stalks", category: "veggies", defaultGram: 80, caloriesPer100g: 16 },
  { id: "beetroot", name: "Beetroot", category: "veggies", defaultGram: 70, caloriesPer100g: 43 },
  { id: "broccoli", name: "Broccoli Florets", category: "veggies", defaultGram: 80, caloriesPer100g: 34 },
  { id: "cauliflower", name: "Cauliflower", category: "veggies", defaultGram: 80, caloriesPer100g: 25 },
  { id: "zucchini", name: "Zucchini", category: "veggies", defaultGram: 100, caloriesPer100g: 17 },
  { id: "ginger", name: "Fresh Ginger", category: "veggies", defaultGram: 10, caloriesPer100g: 80 },
  { id: "turmeric", name: "Fresh Turmeric", category: "veggies", defaultGram: 10, caloriesPer100g: 354 },

  // --- PROTEINS ---
  { id: "whey_vanilla", name: "Whey Protein (Vanilla)", category: "proteins", defaultGram: 30, caloriesPer100g: 380 },
  { id: "whey_chocolate", name: "Whey Protein (Chocolate)", category: "proteins", defaultGram: 30, caloriesPer100g: 380 },
  { id: "plant_protein", name: "Pea / Plant Protein", category: "proteins", defaultGram: 30, caloriesPer100g: 370 },
  { id: "collagen", name: "Collagen Peptides", category: "proteins", defaultGram: 20, caloriesPer100g: 360 },
  { id: "greek_yogurt", name: "Greek Yogurt (0%)", category: "proteins", defaultGram: 150, caloriesPer100g: 59 },
  { id: "egg_whites", name: "Liquid Egg Whites", category: "proteins", defaultGram: 100, caloriesPer100g: 52 },

  // --- DAIRY & FATS ---
  { id: "whole_milk", name: "Whole Milk", category: "fats", defaultGram: 250, caloriesPer100g: 61 },
  { id: "skim_milk", name: "Skim Milk", category: "fats", defaultGram: 250, caloriesPer100g: 35 },
  { id: "almond_milk", name: "Almond Milk", category: "fats", defaultGram: 250, caloriesPer100g: 15 },
  { id: "oat_milk", name: "Oat Milk", category: "fats", defaultGram: 250, caloriesPer100g: 48 },
  { id: "coconut_milk", name: "Coconut Milk", category: "fats", defaultGram: 200, caloriesPer100g: 230 },
  { id: "peanut_butter", name: "Peanut Butter", category: "fats", defaultGram: 32, caloriesPer100g: 588 },
  { id: "almond_butter", name: "Almond Butter", category: "fats", defaultGram: 32, caloriesPer100g: 614 },
  { id: "chia_seeds", name: "Chia Seeds", category: "fats", defaultGram: 15, caloriesPer100g: 486 },
  { id: "flax_seeds", name: "Ground Flaxseed", category: "fats", defaultGram: 15, caloriesPer100g: 534 },
];

export default function DashboardPage() {
  const [heartRate, setHeartRate] = useState(168);
  const [power, setPower] = useState(8.2);
  const [selectedTab, setSelectedTab] = useState("overview");

  // Ingredient Builder State
  const [activeCategory, setActiveCategory] = useState<"all" | "fruits" | "veggies" | "proteins" | "fats">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<{ ingredient: Ingredient; weightGrams: number }[]>([]);

  // STEP 1: Blending Controls & Voice Recognition State
  const [isBlending, setIsBlending] = useState(false);
  const [blendSecondsLeft, setBlendSecondsLeft] = useState(60);
  const [selectedPreset, setSelectedPreset] = useState("Smoothie");
  const [voiceActive, setVoiceActive] = useState(false);
  const [voiceLog, setVoiceLog] = useState<string>("Mic Standby");

  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate((prev) => prev + Math.floor(Math.random() * 5) - 2);
      setPower((prev) => parseFloat((prev + (Math.random() * 0.4 - 0.2)).toFixed(1)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Timer logic for active blend cycle
  useEffect(() => {
    let timer: any;
    if (isBlending && blendSecondsLeft > 0) {
      timer = setInterval(() => {
        setBlendSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (blendSecondsLeft === 0) {
      setIsBlending(false);
      setBlendSecondsLeft(60);
    }
    return () => clearInterval(timer);
  }, [isBlending, blendSecondsLeft]);

  // Voice Command Simulator Toggle
  const toggleVoiceListener = () => {
    if (!voiceActive) {
      setVoiceActive(true);
      setVoiceLog('Listening... Try saying "START BLEND"');
    } else {
      setVoiceActive(false);
      setVoiceLog("Mic Standby");
    }
  };

  const triggerVoiceCommand = (cmd: string) => {
    setVoiceLog(`Recognized: "${cmd}"`);
    if (cmd === "START BLEND" && !isBlending) {
      setIsBlending(true);
    } else if (cmd === "STOP") {
      setIsBlending(false);
      setBlendSecondsLeft(60);
    } else if (cmd === "PULSE") {
      setIsBlending(true);
      setTimeout(() => setIsBlending(false), 3000);
    }
  };

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

  const filteredIngredients = INGREDIENTS_DATABASE.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            <span className={`w-2 h-2 rounded-full ${isBlending ? "bg-red-500 animate-ping" : "bg-emerald-400 animate-pulse"}`}></span>
            <span>{isBlending ? "BLENDER: ACTIVE" : "BLENDER: SYNCHRONIZED"}</span>
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
                  Select ingredients to measure quantity and control motor blending cycles.
                </p>
              </div>

              {/* STEP 1: Interactive Blend Control & Voice Panel */}
              <div className="p-6 bg-zinc-900/90 border border-zinc-800 rounded-2xl space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center space-x-2">
                      <span>BLENDER MOTOR CONTROL</span>
                      {isBlending && <span className="text-xs font-mono text-red-500 animate-pulse">[MOTOR SPINNING]</span>}
                    </h3>
                    <p className="text-xs text-zinc-400">Select preset or trigger hardware voice command</p>
                  </div>

                  {/* Voice Hardware Recognition Toggle */}
                  <div className="flex items-center space-x-3 bg-black/60 p-2.5 rounded-xl border border-zinc-800">
                    <button
                      onClick={toggleVoiceListener}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                        voiceActive
                          ? "bg-red-600 text-white animate-pulse"
                          : "bg-zinc-800 text-zinc-400 hover:text-white"
                      }`}
                    >
                      🎙 {voiceActive ? "MIC ON" : "LISTEN FOR VOICE"}
                    </button>
                    <span className="text-xs font-mono text-zinc-400">{voiceLog}</span>
                  </div>
                </div>

                {/* Simulated Voice Command Quick Triggers (when mic active) */}
                {voiceActive && (
                  <div className="p-3 bg-red-950/20 border border-red-900/40 rounded-xl flex items-center justify-between text-xs font-mono">
                    <span className="text-red-400">Hardware Voice Prompts:</span>
                    <div className="space-x-2">
                      <button
                        onClick={() => triggerVoiceCommand("START BLEND")}
                        className="px-2.5 py-1 bg-red-600/30 border border-red-600/50 hover:bg-red-600 text-white rounded"
                      >
                        Say "START BLEND"
                      </button>
                      <button
                        onClick={() => triggerVoiceCommand("PULSE")}
                        className="px-2.5 py-1 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 text-white rounded"
                      >
                        Say "PULSE"
                      </button>
                      <button
                        onClick={() => triggerVoiceCommand("STOP")}
                        className="px-2.5 py-1 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 text-white rounded"
                      >
                        Say "STOP"
                      </button>
                    </div>
                  </div>
                )}

                {/* Mode Presets & Start Action */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div className="md:col-span-3 flex flex-wrap gap-2">
                    {["Smoothie", "Protein Shake", "Ice Crush", "Pulse"].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setSelectedPreset(mode)}
                        className={`px-4 py-2.5 text-xs font-semibold rounded-xl transition ${
                          selectedPreset === mode
                            ? "bg-white text-black font-bold"
                            : "bg-zinc-800 text-zinc-400 hover:text-white"
                        }`}
                      >
                        {mode} Mode
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      if (isBlending) {
                        setIsBlending(false);
                        setBlendSecondsLeft(60);
                      } else {
                        setIsBlending(true);
                      }
                    }}
                    className={`w-full py-3.5 text-xs font-bold rounded-xl transition uppercase tracking-wider ${
                      isBlending
                        ? "bg-red-600 hover:bg-red-700 text-white animate-pulse"
                        : "bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold"
                    }`}
                  >
                    {isBlending ? `STOP BLEND (${blendSecondsLeft}s)` : `START ${selectedPreset.toUpperCase()}`}
                  </button>
                </div>
              </div>

              {/* Filters & Search Bar */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-800 pb-4">
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "all", label: "All Items" },
                    { id: "fruits", label: "🍉 Fruits" },
                    { id: "veggies", label: "🥕 Veggies" },
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

                <input
                  type="text"
                  placeholder="Search ingredient (e.g. Watermelon)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 text-white text-xs rounded-lg px-4 py-2.5 focus:outline-none focus:border-red-600 w-full md:w-64"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Available Ingredients Grid */}
                <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[500px] overflow-y-auto pr-2">
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
                  <div className="text-3xl font-black text-white">{isBlending ? "22,400" : "0"} <span className="text-sm text-zinc-500">RPM</span></div>
                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className={`bg-red-600 h-full transition-all duration-500 ${isBlending ? "w-[85%]" : "w-0"}`}></div>
                  </div>
                  <p className="text-xs text-zinc-500">{isBlending ? "High-torque pulse active" : "Motor idle"}</p>
                </div>

                <div className="p-5 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-4">
                  <div className="text-xs font-bold text-zinc-400 tracking-wider">BLEND DURATION</div>
                  <div className="text-3xl font-black text-white">{isBlending ? `00:${60 - blendSecondsLeft}` : "00:00"} <span className="text-sm text-zinc-500">sec</span></div>
                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: isBlending ? `${((60 - blendSecondsLeft) / 60) * 100}%` : "0%" }}></div>
                  </div>
                  <p className="text-xs text-zinc-500">Target blend cycle duration: 60s</p>
                </div>

                <div className="p-5 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-4">
                  <div className="text-xs font-bold text-zinc-400 tracking-wider">CONSISTENCY SCORE</div>
                  <div className="text-3xl font-black text-emerald-400">{isBlending ? "98.2%" : "N/A"}</div>
                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className={`bg-emerald-400 h-full transition-all duration-500 ${isBlending ? "w-[98%]" : "w-0"}`}></div>
                  </div>
                  <p className="text-xs text-zinc-500">{isBlending ? "Optimal micro-emulsion reached" : "Awaiting active cycle"}</p>
                </div>
              </div>

              <div className="p-6 bg-zinc-900/40 rounded-xl border border-zinc-800 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-zinc-300">BLADE TORQUE & RESISTANCE WAVEFORM</h3>
                  <span className="text-xs font-mono text-zinc-500">TELEMETRY STREAM</span>
                </div>
                <div className="h-48 border border-dashed border-zinc-700/60 rounded-lg flex items-center justify-center bg-zinc-950/50 text-zinc-600 font-mono text-xs">
                  {isBlending ? "[ Dynamic High-Speed Torque Stream Active ]" : "[ Standby - Motor Inactive ]"}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}