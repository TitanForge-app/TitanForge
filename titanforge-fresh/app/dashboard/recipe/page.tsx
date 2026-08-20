'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Ingredient {
  id: string;
  name: string;
  category: 'Fruits' | 'Veggies' | 'Proteins' | 'Dairy & Fats';
  weight: number; // in grams
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
}

interface SavedRecipe {
  id: string;
  name: string;
  items: { ingredient: Ingredient; count: number }[];
  totalWeight: number;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  totalFiber: number;
}

const ALL_INGREDIENTS: Ingredient[] = [
  // Fruits
  { id: 'f1', name: 'Strawberries', category: 'Fruits', weight: 100, calories: 32, protein: 0.7, carbs: 7.7, fats: 0.3, fiber: 2.0 },
  { id: 'f2', name: 'Blueberries', category: 'Fruits', weight: 100, calories: 57, protein: 0.7, carbs: 14.5, fats: 0.3, fiber: 2.4 },
  { id: 'f3', name: 'Bananas', category: 'Fruits', weight: 120, calories: 105, protein: 1.3, carbs: 27.0, fats: 0.3, fiber: 3.1 },
  { id: 'f4', name: 'Raspberries', category: 'Fruits', weight: 100, calories: 52, protein: 1.2, carbs: 11.9, fats: 0.7, fiber: 6.5 },
  { id: 'f5', name: 'Green Apple', category: 'Fruits', weight: 150, calories: 78, protein: 0.4, carbs: 21.0, fats: 0.2, fiber: 3.6 },
  { id: 'f6', name: 'Watermelon', category: 'Fruits', weight: 150, calories: 45, protein: 0.9, carbs: 11.0, fats: 0.2, fiber: 0.6 },
  
  // Veggies
  { id: 'v1', name: 'Spinach', category: 'Veggies', weight: 50, calories: 12, protein: 1.4, carbs: 1.8, fats: 0.2, fiber: 1.1 },
  { id: 'v2', name: 'Kale', category: 'Veggies', weight: 50, calories: 25, protein: 2.1, carbs: 4.4, fats: 0.5, fiber: 1.8 },
  { id: 'v3', name: 'Cucumber', category: 'Veggies', weight: 100, calories: 15, protein: 0.6, carbs: 3.6, fats: 0.1, fiber: 0.5 },
  { id: 'v4', name: 'Ginger', category: 'Veggies', weight: 15, calories: 12, protein: 0.3, carbs: 2.6, fats: 0.1, fiber: 0.3 },

  // Proteins
  { id: 'p1', name: 'Whey Protein Isolate', category: 'Proteins', weight: 45, calories: 180, protein: 42, carbs: 2.0, fats: 0.5, fiber: 0 },
  { id: 'p2', name: 'Greek Yogurt', category: 'Proteins', weight: 150, calories: 100, protein: 15, carbs: 6.0, fats: 0.4, fiber: 0 },
  { id: 'p3', name: 'Plant Protein Blend', category: 'Proteins', weight: 40, calories: 150, protein: 30, carbs: 4.0, fats: 2.0, fiber: 2.0 },
  { id: 'p4', name: 'Collagen Peptides', category: 'Proteins', weight: 20, calories: 70, protein: 18, carbs: 0, fats: 0, fiber: 0 },

  // Dairy & Fats
  { id: 'd1', name: 'Almond Butter', category: 'Dairy & Fats', weight: 30, calories: 190, protein: 7.0, carbs: 6.0, fats: 16.0, fiber: 3.0 },
  { id: 'd2', name: 'Avocado', category: 'Dairy & Fats', weight: 50, calories: 80, protein: 1.0, carbs: 4.0, fats: 7.0, fiber: 3.0 },
  { id: 'd3', name: 'Oat Milk', category: 'Dairy & Fats', weight: 200, calories: 120, protein: 3.0, carbs: 16.0, fats: 5.0, fiber: 2.0 },
  { id: 'd4', name: 'Chia Seeds', category: 'Dairy & Fats', weight: 15, calories: 70, protein: 2.5, carbs: 6.0, fats: 4.5, fiber: 5.0 },
];

export default function SmartRecipeScale() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Items');
  const [jarItems, setJarItems] = useState<{ ingredient: Ingredient; count: number }[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [recipeName, setRecipeName] = useState<string>('');
  
  // Controls state
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [motorStatus, setMotorStatus] = useState<boolean>(false); // false = STANDBY, true = RUNNING
  const [activeMode, setActiveMode] = useState<string>('STANDBY');
  const [timeLeft, setTimeLeft] = useState<number>(0);

  // Saved history vault state
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([
    {
      id: 'preset-1',
      name: 'Anabolic Power Surge',
      items: [{ ingredient: ALL_INGREDIENTS[0], count: 1 }, { ingredient: ALL_INGREDIENTS[10], count: 1 }],
      totalWeight: 145,
      totalCalories: 212,
      totalProtein: 42.7,
      totalCarbs: 9.7,
      totalFats: 0.8,
      totalFiber: 2.0
    }
  ]);

  // Handle countdown timer for active blending mode
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (motorStatus && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setMotorStatus(false);
            setActiveMode('STANDBY');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [motorStatus, timeLeft]);

  // Add item to jar scale
  const addToJar = (ingredient: Ingredient) => {
    setJarItems(prev => {
      const existing = prev.find(item => item.ingredient.id === ingredient.id);
      if (existing) {
        return prev.map(item => 
          item.ingredient.id === ingredient.id ? { ...item, count: item.count + 1 } : item
        );
      }
      return [...prev, { ingredient, count: 1 }];
    });
  };

  // Increase/Decrease quantity helpers
  const increaseCount = (id: string) => {
    setJarItems(prev => prev.map(item => item.ingredient.id === id ? { ...item, count: item.count + 1 } : item));
  };

  const decreaseCount = (id: string) => {
    setJarItems(prev => prev
      .map(item => item.ingredient.id === id ? { ...item, count: item.count - 1 } : item)
      .filter(item => item.count > 0)
    );
  };

  const clearJar = () => setJarItems([]);

  // Calculations for sidebar telemetry
  const totalWeight = jarItems.reduce((acc, curr) => acc + (curr.ingredient.weight * curr.count), 0);
  const totalCalories = jarItems.reduce((acc, curr) => acc + (curr.ingredient.calories * curr.count), 0);
  const totalProtein = jarItems.reduce((acc, curr) => acc + (curr.ingredient.protein * curr.count), 0);
  const totalCarbs = jarItems.reduce((acc, curr) => acc + (curr.ingredient.carbs * curr.count), 0);
  const totalFats = jarItems.reduce((acc, curr) => acc + (curr.ingredient.fats * curr.count), 0);
  const totalFiber = jarItems.reduce((acc, curr) => acc + (curr.ingredient.fiber * curr.count), 0);

  // Save recipe to vault
  const saveRecipe = () => {
    if (!recipeName.trim() || jarItems.length === 0) {
      alert('Please add ingredients and enter a recipe name.');
      return;
    }
    const newRecipe: SavedRecipe = {
      id: Date.now().toString(),
      name: recipeName,
      items: [...jarItems],
      totalWeight,
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFats,
      totalFiber
    };
    setSavedRecipes(prev => [...prev, newRecipe]);
    setRecipeName('');
    alert(`Recipe "${recipeName}" saved successfully!`);
  };

  // Load recipe back into jar
  const loadRecipeIntoJar = (recipe: SavedRecipe) => {
    setJarItems([...recipe.items]);
  };

  // Toggle or start blender motor with timeline duration (e.g. 45s)
  const toggleBlendMode = (modeName: string, durationSec: number = 45) => {
    if (motorStatus && activeMode === modeName) {
      // Stop it if clicking the active toggle again
      setMotorStatus(false);
      setActiveMode('STANDBY');
      setTimeLeft(0);
    } else {
      // Start it
      setMotorStatus(true);
      setActiveMode(modeName);
      setTimeLeft(durationSec);
    }
  };

  const filteredIngredients = ALL_INGREDIENTS.filter(item => {
    const matchesCategory = selectedCategory === 'All Items' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-black text-white flex flex-col p-6 selection:bg-red-600 selection:text-white font-mono">
      {/* Top Navbar */}
      <nav className="flex justify-between items-center pb-4 border-b border-zinc-900 mb-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-black tracking-wider">
            TITAN<span className="text-red-600">FORGE</span>
          </Link>
          <span className="text-zinc-700">/</span>
          <span className="text-xs text-red-500 font-bold uppercase">SMART RECIPE & LOAD CELL MEASUREMENT</span>
        </div>
        <Link 
          href="/dashboard" 
          className="text-xs font-semibold px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 rounded-lg border border-zinc-800 transition-colors text-white inline-block"
        >
          ← Back to Dashboard
        </Link>
      </nav>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto w-full items-start">
        
        {/* Left 3 Columns */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          
          {/* Status Bar */}
          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-bold text-green-400">SENSOR: CONNECTED</span>
            </div>
            <span className="text-xs text-zinc-500">TitanForge Hardware Unit v2.4</span>
          </div>

          {/* Voice Recognition & Motor Control Deck */}
          <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800/80 flex flex-col gap-4 shadow-xl">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                  MOTOR: [{motorStatus ? `RUNNING: ${activeMode}` : 'STANDBY'}]
                </span>
                {motorStatus && (
                  <span className="text-xs bg-red-600 text-white font-bold px-2 py-0.5 rounded animate-pulse">
                    ⏱️ {timeLeft}s remaining
                  </span>
                )}
              </div>

              {/* Voice Command On/Off Toggle Button */}
              <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1 rounded-xl border border-zinc-800">
                <span className="text-[10px] text-zinc-400 font-bold uppercase">Voice Control:</span>
                <button 
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    voiceEnabled ? 'bg-green-600 text-white shadow-lg shadow-green-600/30' : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {voiceEnabled ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            {/* Voice Command Simulator Bar */}
            <div className={`border p-3 rounded-xl flex flex-wrap gap-2 items-center justify-between transition-all ${
              voiceEnabled ? 'bg-red-950/30 border-red-600/30' : 'bg-zinc-900/40 border-zinc-800 opacity-50'
            }`}>
              <span className="text-xs text-red-400 font-bold uppercase">
                {voiceEnabled ? 'MIC ACTIVE: LISTENING...' : 'MIC MUTED (OFF)'}
              </span>
              <div className="flex gap-2">
                <button 
                  disabled={!voiceEnabled} 
                  onClick={() => toggleBlendMode('VOICE BLEND', 45)} 
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 disabled:bg-zinc-800 text-white text-xs font-bold rounded-lg shadow transition-all"
                >
                  Say &quot;START BLEND&quot;
                </button>
                <button 
                  disabled={!voiceEnabled} 
                  onClick={() => toggleBlendMode('PULSE', 15)} 
                  className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs font-bold rounded-lg transition-all"
                >
                  Say &quot;PULSE&quot;
                </button>
                <button 
                  disabled={!voiceEnabled} 
                  onClick={() => { setMotorStatus(false); setActiveMode('STANDBY'); setTimeLeft(0); }} 
                  className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs font-bold rounded-lg transition-all"
                >
                  Say &quot;STOP&quot;
                </button>
              </div>
            </div>

            {/* Mode Selector Buttons with Toggle functionality */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <button 
                onClick={() => toggleBlendMode('SMOOTHIE', 45)} 
                className={`py-2.5 border text-xs font-bold rounded-xl transition-all ${
                  motorStatus && activeMode === 'SMOOTHIE' ? 'bg-green-600 text-white border-green-500 animate-pulse' : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-white'
                }`}
              >
                {motorStatus && activeMode === 'SMOOTHIE' ? 'STOP SMOOTHIE' : 'Smoothie Mode (45s)'}
              </button>
              <button 
                onClick={() => toggleBlendMode('PROTEIN SHAKE', 30)} 
                className={`py-2.5 border text-xs font-bold rounded-xl transition-all ${
                  motorStatus && activeMode === 'PROTEIN SHAKE' ? 'bg-green-600 text-white border-green-500 animate-pulse' : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-white'
                }`}
              >
                {motorStatus && activeMode === 'PROTEIN SHAKE' ? 'STOP PROTEIN SHAKE' : 'Protein Shake (30s)'}
              </button>
              <button 
                onClick={() => toggleBlendMode('ICE CRUSH', 20)} 
                className={`py-2.5 border text-xs font-bold rounded-xl transition-all ${
                  motorStatus && activeMode === 'ICE CRUSH' ? 'bg-green-600 text-white border-green-500 animate-pulse' : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-white'
                }`}
              >
                {motorStatus && activeMode === 'ICE CRUSH' ? 'STOP ICE CRUSH' : 'Ice Crush (20s)'}
              </button>
              <button 
                onClick={() => toggleBlendMode('START SMOOTHIE', 60)} 
                className={`py-2.5 text-xs font-bold rounded-xl transition-all shadow-lg ${
                  motorStatus && activeMode === 'START SMOOTHIE' ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/30' : 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/30'
                }`}
              >
                {motorStatus && activeMode === 'START SMOOTHIE' ? 'STOP BLENDER' : 'START SMOOTHIE'}
              </button>
            </div>
          </div>

          {/* Category Filter Tabs & Search */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {['All Items', 'Fruits', 'Veggies', 'Proteins', 'Dairy & Fats'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <input 
              type="text"
              placeholder="Search ingredient (e.g. Bananas)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl text-xs text-white w-full md:w-64 focus:outline-none focus:border-red-600"
            />
          </div>

          {/* Ingredients Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredIngredients.map((item) => (
              <div key={item.id} className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800 flex flex-col justify-between hover:border-red-600/50 transition-all">
                <div>
                  <div className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{item.category}</div>
                  <h4 className="text-base font-bold text-white mt-1">{item.name}</h4>
                  <div className="text-xs text-zinc-500 mt-1">~{item.weight}g portion ({item.calories} kcal)</div>
                </div>
                <button 
                  onClick={() => addToJar(item)}
                  className="mt-4 w-full py-2 bg-zinc-900 hover:bg-red-600 text-zinc-300 hover:text-white border border-zinc-800 hover:border-red-600 rounded-xl text-xs font-bold transition-all"
                >
                  + Add to Jar
                </button>
              </div>
            ))}
          </div>

        </div>

        {/* Right 1 Column: Live Scale Sidebar & History Vault */}
        <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800 flex flex-col justify-between shadow-2xl lg:sticky lg:top-6">
          <div>
            {/* Scale Header */}
            <div className="border-b border-zinc-900 pb-4 mb-4">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">JAR LOAD CELL SCALE</h3>
              <p className="text-[10px] text-zinc-600">Live weight & macro telemetry</p>
              
              <div className="mt-4 p-4 bg-black rounded-xl border border-zinc-900 text-center">
                <div className="text-[10px] text-zinc-500 uppercase">Total Weight</div>
                <div className="text-3xl font-black text-white mt-1">{totalWeight}<span className="text-red-600 text-lg">g</span></div>
                <div className="text-[10px] text-zinc-500 mt-1">Est. Energy: ~{totalCalories} kcal</div>
              </div>
            </div>

            {/* Macros Breakdown */}
            <div className="mb-6">
              <div className="text-xs font-bold text-zinc-400 mb-2">NUTRITION & MACROS:</div>
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
                  <div className="text-[10px] text-red-400">PROTEIN</div>
                  <div className="font-bold text-white">{totalProtein.toFixed(1)}g</div>
                </div>
                <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
                  <div className="text-[10px] text-yellow-400">CARBS</div>
                  <div className="font-bold text-white">{totalCarbs.toFixed(1)}g</div>
                </div>
                <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
                  <div className="text-[10px] text-blue-400">FATS</div>
                  <div className="font-bold text-white">{totalFats.toFixed(1)}g</div>
                </div>
                <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
                  <div className="text-[10px] text-purple-400">FIBER</div>
                  <div className="font-bold text-white">{totalFiber.toFixed(1)}g</div>
                </div>
              </div>
            </div>

            {/* Jar Contents with Increase & Decrease Controls */}
            <div className="mb-6">
              <div className="text-xs font-bold text-zinc-400 mb-2">JAR CONTENTS & VOLUME CONTROL:</div>
              <div className="bg-black p-3 rounded-xl border border-zinc-900 min-h-[110px] max-h-[160px] overflow-y-auto text-xs flex flex-col gap-2">
                {jarItems.length === 0 ? (
                  <span className="text-zinc-600 italic">Jar is empty. Add ingredients to begin.</span>
                ) : (
                  jarItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-1.5 border-b border-zinc-900/50">
                      <div className="flex flex-col">
                        <span className="font-bold text-white">{item.ingredient.name}</span>
                        <span className="text-[10px] text-red-500 font-semibold">{item.ingredient.weight * item.count}g</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
                        <button 
                          onClick={() => decreaseCount(item.ingredient.id)}
                          className="w-5 h-5 bg-zinc-800 hover:bg-red-600 text-white rounded flex items-center justify-center font-bold text-xs transition-colors"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-bold text-white">{item.count}</span>
                        <button 
                          onClick={() => increaseCount(item.ingredient.id)}
                          className="w-5 h-5 bg-zinc-800 hover:bg-green-600 text-white rounded flex items-center justify-center font-bold text-xs transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Saved Recipes History Vault */}
            <div className="mb-6">
              <div className="text-xs font-bold text-zinc-400 mb-2">SAVED RECIPES HISTORY:</div>
              <div className="bg-black p-3 rounded-xl border border-zinc-900 max-h-[140px] overflow-y-auto flex flex-col gap-2 text-xs">
                {savedRecipes.map((rec) => (
                  <div key={rec.id} className="p-2 bg-zinc-900 rounded-lg border border-zinc-800 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-white">{rec.name}</div>
                      <div className="text-[10px] text-zinc-500">{rec.totalWeight}g • {Math.round(rec.totalCalories)} kcal</div>
                    </div>
                    <button 
                      onClick={() => loadRecipeIntoJar(rec)}
                      className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded-md transition-colors"
                    >
                      Load
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Save & Clear Actions */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <input 
                type="text"
                placeholder="Name recipe to save..."
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                className="bg-black border border-zinc-800 px-3 py-2 rounded-xl text-xs text-white w-full focus:outline-none focus:border-red-600"
              />
              <button 
                onClick={saveRecipe}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-red-600/30"
              >
                Save
              </button>
            </div>
            <button 
              onClick={clearJar}
              className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 rounded-xl text-xs font-bold transition-all"
            >
              Clear Jar Scale
            </button>
          </div>

        </div>

      </div>
    </main>
  );
}