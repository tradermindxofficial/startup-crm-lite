import React from "react";

/**
 * Reusable premium stat card for the Analytics header row.
 *
 * @param {{ icon: React.ElementType, value: string|number, label: string, gradient: string, iconBg: string }} props
 */
const StatCard = ({ icon: Icon, value, label, gradient, iconBg }) => (
  <div
    style={{ background: gradient }}
    className="relative overflow-hidden rounded-2xl p-5 shadow-lg flex items-center gap-4"
  >
    {/* Decorative circle */}
    <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 bg-white" />
    <div className="absolute -right-2 -bottom-6 w-16 h-16 rounded-full opacity-10 bg-white" />

    <div
      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-inner"
      style={{ background: iconBg }}
    >
      <Icon className="w-6 h-6 text-white" strokeWidth={2} />
    </div>

    <div>
      <p className="text-3xl font-bold text-white leading-none mb-1">{value}</p>
      <p className="text-sm font-medium text-white/80">{label}</p>
    </div>
  </div>
);

export default StatCard;
