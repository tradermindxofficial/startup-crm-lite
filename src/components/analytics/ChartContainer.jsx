import React, { memo } from "react";
import { ResponsiveContainer } from "recharts";

const ChartContainer = memo(function ChartContainer({ children, height = 288 }) {
  return (
    <div className="w-full min-w-0" style={{ height }}>
      <ResponsiveContainer width="100%" height={height} debounce={50}>
        {children}
      </ResponsiveContainer>
    </div>
  );
});

export default ChartContainer;
