import { useBattery } from "@uidotdev/usehooks";
import {
  BatteryCharging,
  BatteryFull,
  BatteryIcon,
  BatteryLow,
  BatteryMedium,
} from "lucide-react";
import React from "react";

export default function Battery() {
  const { loading, level, charging, supported } = useBattery();
  if (!supported) {
    return;
  }
  if (loading) {
    return (
      <div>
        <BatteryIcon />
      </div>
    );
  }
  if (charging) {
    return (
      <div>
        <BatteryCharging className="text-emerald-400" />
      </div>
    );
  }
  const batteryLevel = level! * 100;
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">{batteryLevel}%</span>
      {batteryLevel >= 80 && batteryLevel <= 100 && <BatteryFull />}
      {batteryLevel >= 40 && batteryLevel < 80 && <BatteryMedium />}
      {batteryLevel > 0 && batteryLevel < 40 && (
        <BatteryLow className="text-yellow-400" />
      )}
      {batteryLevel === 100 && <BatteryFull />}
    </div>
  );
}
