import React, { memo } from "react";
import { Card, CardContent } from "./Card";

const SkeletonBlock = memo(function SkeletonBlock({ className = "" }) {
  return <div className={`animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700 ${className}`} />;
});

const LoadingSkeleton = memo(function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <SkeletonBlock className="h-8 w-64" />
        <SkeletonBlock className="h-4 w-96 max-w-full" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={`kpi-skeleton-${index}`}>
            <CardContent className="space-y-4">
              <SkeletonBlock className="h-10 w-10" />
              <SkeletonBlock className="h-8 w-24" />
              <SkeletonBlock className="h-4 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={`chart-skeleton-${index}`}>
            <CardContent className="space-y-4">
              <SkeletonBlock className="h-5 w-40" />
              <SkeletonBlock className="h-64 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
});

export default LoadingSkeleton;
