"use client";

import React, { useState } from "react";
import {
  CloudSun,
  Droplets,
  Wind,
  Gauge,
  AlertTriangle,
  CheckCircle2,
  Thermometer,
  ShieldAlert,
  Sun,
  MapPin,
  Clock,
} from "lucide-react";

interface WeatherZone {
  id: string;
  name: string;
  regionType: "Grain & Paddy Delta" | "Dairy & Cattle Cluster" | "Orchard & Horticulture";
  tempC: number;
  humidityPct: number;
  windKmH: number;
  rainForecast: string;
  thiIndex: number; // Temperature Humidity Index for cattle (normal < 72, mild 72-78, severe > 79)
  sprayWindowStatus: "Optimal Window" | "Caution - High Wind" | "Unsafe - Rain Imminent";
  sprayWindowTimes: string;
  fungalRisk: "High Infection Risk" | "Moderate Risk" | "Low Risk";
}

const ZONES: WeatherZone[] = [
  {
    id: "zone-east",
    name: "Eastern Grain Delta",
    regionType: "Grain & Paddy Delta",
    tempC: 28.5,
    humidityPct: 88,
    windKmH: 7.2,
    rainForecast: "Clear next 6 hours",
    thiIndex: 75,
    sprayWindowStatus: "Optimal Window",
    sprayWindowTimes: "06:00 AM – 09:30 AM (Calm Wind, No Rain)",
    fungalRisk: "High Infection Risk",
  },
  {
    id: "zone-north",
    name: "Northern Dairy Corridor",
    regionType: "Dairy & Cattle Cluster",
    tempC: 32.0,
    humidityPct: 76,
    windKmH: 14.5,
    rainForecast: "Isolated showers in 8 hrs",
    thiIndex: 79,
    sprayWindowStatus: "Caution - High Wind",
    sprayWindowTimes: "Delay spray until 05:00 PM (Wind > 12 km/h)",
    fungalRisk: "Moderate Risk",
  },
  {
    id: "zone-south",
    name: "Southern Orchard Basin",
    regionType: "Orchard & Horticulture",
    tempC: 26.0,
    humidityPct: 62,
    windKmH: 5.8,
    rainForecast: "Dry throughout 24 hrs",
    thiIndex: 70,
    sprayWindowStatus: "Optimal Window",
    sprayWindowTimes: "All Day Until 04:00 PM",
    fungalRisk: "Low Risk",
  },
];

export function AgroWeatherRadar() {
  const [activeZone, setActiveZone] = useState<WeatherZone>(ZONES[0]);

  return (
    <div className="srot-glass-card rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-1.5">
            <CloudSun className="w-3.5 h-3.5 text-cyan-400" />
            <span>Real-Time Agro-Climatic & Biosecurity Radar</span>
          </div>
          <h2 className="text-2xl font-black text-white">
            Microclimate Spray Window & Livestock Heat Radar
          </h2>
        </div>

        {/* Zone Selector */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-700">
          {ZONES.map((z) => (
            <button
              key={z.id}
              onClick={() => setActiveZone(z)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeZone.id === z.id
                  ? "bg-slate-800 text-white shadow border border-slate-600"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {z.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Meteorological Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {/* Temp */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-bold text-slate-400">Ambient Temperature</span>
            <Thermometer className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-white">{activeZone.tempC}°C</span>
          <span className="text-[11px] text-slate-400 block mt-1">Foliar Absorption: Safe</span>
        </div>

        {/* Humidity */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-bold text-slate-400">Relative Humidity</span>
            <Droplets className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-white">{activeZone.humidityPct}%</span>
          <span className="text-[11px] text-emerald-400 block mt-1">
            {activeZone.humidityPct > 80 ? "⚠️ High Fungal Spore Risk" : "Normal Equilibrium"}
          </span>
        </div>

        {/* Wind */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-bold text-slate-400">Wind Velocity</span>
            <Wind className="w-4 h-4 text-slate-300" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-white">{activeZone.windKmH} km/h</span>
          <span className="text-[11px] text-slate-400 block mt-1">
            {activeZone.windKmH < 10 ? "Ideal for Boom Sprayers" : "Moderate Drift Risk"}
          </span>
        </div>

        {/* Livestock THI */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-bold text-slate-400">Cattle THI Stress Index</span>
            <ShieldAlert className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-amber-400">THI {activeZone.thiIndex}</span>
          <span className="text-[11px] text-slate-300 block mt-1">
            {activeZone.thiIndex > 78 ? "Activate Barn Mist Fans" : "Comfort Zone (High Milk Yield)"}
          </span>
        </div>
      </div>

      {/* Advisory Action Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Spray Window Banner */}
        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-3">
          <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
            <CheckCircle2 className="w-5 h-5" />
          </span>
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
              Accredited Spray Window Advisory:
            </span>
            <h4 className="font-bold text-white text-sm mt-0.5">{activeZone.sprayWindowStatus}</h4>
            <p className="text-xs text-slate-300 mt-1">{activeZone.sprayWindowTimes}</p>
          </div>
        </div>

        {/* Pathogen Alert Banner */}
        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-3">
          <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </span>
          <div>
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
              Biosecurity & Fungal Spore Alert:
            </span>
            <h4 className="font-bold text-white text-sm mt-0.5">{activeZone.fungalRisk}</h4>
            <p className="text-xs text-slate-300 mt-1">
              High nighttime humidity triggers blast and powdery mildew. Inspect lower canopy nodes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
