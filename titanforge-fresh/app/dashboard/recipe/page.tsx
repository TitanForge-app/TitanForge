'use client';

import { useState } from 'react';
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

const ALL_INGREDIENTS: Ingredient[] = [
  { id: '1', name: 'Strawberries', category: 'Fruits', weight: 100, calories: 32, protein: 0.7, carbs: 7.7, fats: 0.3, fiber: 2.0 },
  { id: '2', name: 'Blueberries', category: 'Fruits', weight: 100, calories: 57, protein: 0.7, carbs: 14.5, fats: 0.3, fiber: 2.4 },
  { id: '3', name: 'Raspberries', category: 'Fruits', weight: 100, calories: 52, protein: 1.2, carbs: 11.9, fats: 0.7, fiber: 6.5 },
  { id: '4', name: 'Spinach', category: 'Veggies', weight: 50, calories: 12, protein: 1.4, carbs: 1.8, fats: 0.2, fiber: 1.1 },
  { id: '5', name: 'Kale', category: 'Veggies', weight: 50, calories: 25, protein: 2.1, carbs: 4.4, fats: 0.5, fiber: 1.8 },
  { id: '6', name: 'Whey Protein Isolate', category: 'Proteins', weight: 45, calories: 180, protein: 42, carbs: 2.0, fats: 0.5, fiber: 0 },
  { id: '7', name: 'Greek Yogurt', category: 'Proteins', weight: 150, calories: 100, protein: 15, carbs: 6.0, fats: 0.4, fiber: 0 },
  { id: '8', name: 'Almond Butter', category: 'Dairy & Fats', weight: 30, calories: 190, protein: 7.0, carbs: 6.0, fats: 16.0, fiber: 3.0 },
  { id: '9', name: 'Avocado', category: 'Dairy & Fats', weight: 50, calories: 80, protein: 1.0, carbs: 4.0, fats: 7.0, fiber: 3.0 },
];

export default function SmartRecipeScale() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Items');
  const [jarItems, setJarItems] = useState<{ ingredient: Ingredient; count: number }[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [recipeName, setRecipeName] = useState<string>('');
  const [savedPresets, setSavedPresets] = useState<{ name: string; totalWeight: number; totalCals: number }[]>([
    { name: 'Anabolic Power Surge', totalWeight: 320, totalCals: 420 },
    { name: 'Green Detox Cleanse', totalWeight: 250, totalCals: 94 },
  ]);

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

  // Clear jar
  const clearJar = () => setJarItems([]);

  // Save recipe
  const saveRecipe = () => {
    if (!recipeName.trim()) return;
    const totalWeight = jarItems.reduce((acc, curr) => acc + (curr.ingredient.weight * curr.count), 0);
    const totalCals = jarItems.reduce((acc, curr) => acc + (curr.ingredient.calories * curr.count), 0);
    
    setSavedPresets(prev => [...prev, { name: recipeName, totalWeight, totalCals }]);
    setRecipeName('');
    alert(`Recipe "${recipeName}" saved to vault!`);
  };

  // Calculations for sidebar telemetry
  const totalWeight = jarItems.reduce((acc, curr) => acc + (curr.ingredient.weight * curr.count), 0);
  const totalCalories = jarItems.reduce((acc, curr) => acc + (curr.ingredient.calories * curr.count), 0);
  const totalProtein = jarItems.reduce((acc, curr) => acc + (curr.ingredient.protein * curr.count), 0);
  const totalCarbs = jarItems.reduce((acc, curr) => acc + (curr.ingredient.carbs * curr.count), 0);
  const totalFats = jarItems.reduce((acc, curr) => acc + (curr.ingredient.fats * curr.count), 0);
  const totalFiber = jarItems.reduce((acc, curr) => acc + (curr.ingredient.fiber * curr.count), 0);

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
          <span className="text-xs text-red-500 font-bold uppercase">Smart Recipe & Load Cell Measurement</span>
        </div>
        <Link 
          href="/dashboard" 
          className="text-xs font-semibold px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 rounded-lg border border-zinc-800 transition-colors text-white"
        >
          ← Back to Dashboard
        </Link>
      </nav>

      {/* Main Grid Layout (Content + Live Scale Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto w-full">
        
        {/* Left 3 Columns: Controls & Ingredients Picker */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          
          {/* Status Header */}
          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-bold text-green-400">SENSOR: CONNECTED</span>
            </div>
            <span className="text-xs text-zinc-500">TitanForge Load Cell v2.4</span>
          </div>

          {/* Quick Athlete Presets */}
          <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800/80">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Quick Load Athlete Presets:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {savedPresets.map((preset, idx) => (
                <div key={idx} className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 flex justify-between items-center">
                  <div>
                    <div className="text-sm font-bold text-white">{preset.name}</div>
                    <div className="text-[10px] text-zinc-500">{preset.totalWeight}g • ~{preset.totalCals} kcal</div>
                  </div>
                  <button onClick={() => alert(`Loaded preset: ${preset.name}`)} className="px-3 py-1 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-600/40 text-xs font-bold rounded-lg transition-colors">
                    Load
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Filter Tabs & Search */}
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
              placeholder="Search ingredient (e.g. Strawberries)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl text-xs text-white w-full md:w-64 focus:outline-none focus:border-red-600"
            />
          </div>

          {/* Ingredient Cards Grid */}
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

        {/* Right 1 Column: Live Jar Load Cell Scale Sidebar */}
        <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800 flex flex-col justify-between shadow-2xl">
          <div>
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

            {/* Jar Contents */}
            <div className="mb-6">
              <div className="text-xs font-bold text-zinc-400 mb-2">JAR CONTENTS & WEIGHT CONTROL:</div>
              <div className="bg-black p-3 rounded-xl border border-zinc-900 min-h-[120px] max-h-[180px] overflow-y-auto text-xs">
                {jarItems.length === 0 ? (
                  <span className="text-zinc-600 italic">Jar is empty. Add ingredients to begin.</span>
                ) : (
                  jarItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-1 border-b border-zinc-900/50">
                      <span>{item.ingredient.name} (x{item.count})</span>
                      <span className="text-red-500 font-bold">{item.ingredient.weight * item.count}g</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Save & Clear Actions */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <input 
                type="text"
                placeholder="Recipe Name..."
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