"use client";

import { useState } from "react";
import { Save, RotateCcw } from "lucide-react";
import type { AppData, CultureConfig } from "../_data/types";
import { defaultConfig } from "../_data/sampleData";

interface ConfigViewProps {
  data: AppData;
  onDataChange: (data: AppData) => void;
}

export default function ConfigView({ data, onDataChange }: ConfigViewProps) {
  const [config, setConfig] = useState<CultureConfig>({ ...data.config });
  const [saved, setSaved] = useState(false);

  function handleSave() {
    onDataChange({ ...data, config });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleReset() {
    setConfig({ ...defaultConfig });
  }

  return (
    <div className="animate-[fadeIn_0.3s_ease]">
      <div className="flex justify-between items-center mb-7">
        <div>
          <h2 className="text-[1.6rem] font-bold text-[#f0f0f5]">
            Configuration
          </h2>
          <p className="text-[#8888a0] text-sm mt-1">
            Customize Culture Console settings
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="bg-transparent text-[#8888a0] border border-[#2a2a3a] px-4 py-2.5 text-sm font-medium rounded-[10px] cursor-pointer transition-all duration-200 hover:border-[#8888a0] hover:text-[#f0f0f5] flex items-center gap-2"
          >
            <RotateCcw size={14} /> Reset Defaults
          </button>
          <button
            onClick={handleSave}
            className="bg-gradient-to-br from-[#4a6cf7] to-[#a855f7] text-white border-none px-5 py-2.5 text-sm font-semibold rounded-[10px] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(74,108,247,0.3)] flex items-center gap-2"
          >
            <Save size={14} /> Save Config
          </button>
        </div>
      </div>

      {saved && (
        <div className="bg-[rgba(34,197,94,0.15)] border border-[rgba(34,197,94,0.3)] text-[#22c55e] rounded-xl px-4 py-3 mb-6 text-sm font-medium">
          Configuration saved successfully.
        </div>
      )}

      <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
        {/* Organization */}
        <div className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-6">
          <h3 className="text-lg font-semibold text-[#f0f0f5] mb-5">
            Organization
          </h3>
          <div className="mb-5">
            <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
              Organization Name
            </label>
            <input
              type="text"
              value={config.orgName}
              onChange={(e) =>
                setConfig({ ...config, orgName: e.target.value })
              }
              className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none focus:border-[#4a6cf7] placeholder:text-[#8888a0]"
            />
          </div>
          <div className="flex items-center justify-between py-3 border-b border-[#2a2a3a]">
            <div>
              <div className="text-sm font-medium text-[#f0f0f5]">
                Notifications
              </div>
              <div className="text-xs text-[#8888a0]">
                Enable alert notifications
              </div>
            </div>
            <button
              onClick={() =>
                setConfig({
                  ...config,
                  notificationsEnabled: !config.notificationsEnabled,
                })
              }
              className="bg-transparent border-none cursor-pointer p-0"
            >
              {config.notificationsEnabled ? (
                <div className="w-11 h-6 bg-[#22c55e] rounded-full relative transition-colors">
                  <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full" />
                </div>
              ) : (
                <div className="w-11 h-6 bg-[#2a2a3a] rounded-full relative transition-colors">
                  <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-[#8888a0] rounded-full" />
                </div>
              )}
            </button>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <div className="text-sm font-medium text-[#f0f0f5]">
                Auto Rules
              </div>
              <div className="text-xs text-[#8888a0]">
                Enable automated rule execution
              </div>
            </div>
            <button
              onClick={() =>
                setConfig({
                  ...config,
                  autoRulesEnabled: !config.autoRulesEnabled,
                })
              }
              className="bg-transparent border-none cursor-pointer p-0"
            >
              {config.autoRulesEnabled ? (
                <div className="w-11 h-6 bg-[#22c55e] rounded-full relative transition-colors">
                  <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full" />
                </div>
              ) : (
                <div className="w-11 h-6 bg-[#2a2a3a] rounded-full relative transition-colors">
                  <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-[#8888a0] rounded-full" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* GOR Weights */}
        <div className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-6">
          <h3 className="text-lg font-semibold text-[#f0f0f5] mb-5">
            GOR Framework Weights
          </h3>
          <p className="text-xs text-[#8888a0] mb-4">
            Weights should sum to 1.0 (100%). Current total:{" "}
            <span
              className={`font-bold ${
                Math.abs(
                  config.gorWeights.growth +
                    config.gorWeights.operations +
                    config.gorWeights.resilience -
                    1
                ) < 0.01
                  ? "text-[#22c55e]"
                  : "text-[#eab308]"
              }`}
            >
              {(
                (config.gorWeights.growth +
                  config.gorWeights.operations +
                  config.gorWeights.resilience) *
                100
              ).toFixed(0)}
              %
            </span>
          </p>
          {(
            [
              { key: "growth" as const, label: "Growth", color: "from-green-500 to-emerald-400" },
              { key: "operations" as const, label: "Operations", color: "from-blue-500 to-cyan-400" },
              { key: "resilience" as const, label: "Resilience", color: "from-purple-500 to-pink-400" },
            ] as const
          ).map(({ key, label, color }) => (
            <div key={key} className="mb-4">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-medium text-[#f0f0f5]">
                  {label}
                </label>
                <span className="text-sm font-bold text-[#8888a0]">
                  {(config.gorWeights[key] * 100).toFixed(0)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={config.gorWeights[key] * 100}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    gorWeights: {
                      ...config.gorWeights,
                      [key]: parseInt(e.target.value, 10) / 100,
                    },
                  })
                }
                className="w-full h-2 bg-[#2a2a3a] rounded-full appearance-none cursor-pointer accent-[#4a6cf7]"
              />
            </div>
          ))}
        </div>

        {/* Health Thresholds */}
        <div className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-6">
          <h3 className="text-lg font-semibold text-[#f0f0f5] mb-5">
            Health Thresholds
          </h3>
          {(
            [
              { key: "excellent" as const, label: "Excellent", color: "text-[#22c55e]" },
              { key: "good" as const, label: "Good", color: "text-[#4a6cf7]" },
              { key: "warning" as const, label: "Warning", color: "text-[#eab308]" },
              { key: "critical" as const, label: "Critical", color: "text-[#ef4444]" },
            ] as const
          ).map(({ key, label, color }) => (
            <div key={key} className="mb-4">
              <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
                {label}{" "}
                <span className={`${color} font-bold`}>
                  ({config.healthThresholds[key]}+)
                </span>
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={config.healthThresholds[key]}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    healthThresholds: {
                      ...config.healthThresholds,
                      [key]: parseInt(e.target.value, 10),
                    },
                  })
                }
                className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none focus:border-[#4a6cf7]"
              />
            </div>
          ))}
        </div>

        {/* Date Range */}
        <div className="bg-[#12121a] border border-[#2a2a3a] rounded-[14px] p-6">
          <h3 className="text-lg font-semibold text-[#f0f0f5] mb-5">
            Default Date Range
          </h3>
          <div className="mb-4">
            <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
              Start Date
            </label>
            <input
              type="date"
              value={config.dateRange.start}
              onChange={(e) =>
                setConfig({
                  ...config,
                  dateRange: { ...config.dateRange, start: e.target.value },
                })
              }
              className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none focus:border-[#4a6cf7]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-[0.85rem] font-semibold text-[#8888a0] mb-1.5">
              End Date
            </label>
            <input
              type="date"
              value={config.dateRange.end}
              onChange={(e) =>
                setConfig({
                  ...config,
                  dateRange: { ...config.dateRange, end: e.target.value },
                })
              }
              className="w-full py-2.5 px-3.5 bg-[#0a0a0f] border border-[#2a2a3a] rounded-[10px] text-[#f0f0f5] text-sm outline-none focus:border-[#4a6cf7]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
