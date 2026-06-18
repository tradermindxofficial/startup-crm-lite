import React, { memo } from "react";
import { BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "./Card";

const EmptyAnalyticsState = memo(function EmptyAnalyticsState() {
  const navigate = useNavigate();

  return (
    <Card className="border-dashed">
      <CardContent className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <div className="mb-4 rounded-2xl bg-blue-50 p-4 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
          <BarChart3 className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">No analytics available yet</h2>
        <p className="mt-2 max-w-md text-sm text-slate-600 dark:text-slate-400">
          Add your first lead to start tracking business performance.
        </p>
        <button
          type="button"
          onClick={() => navigate("/leads")}
          className="mt-6 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Add Lead
        </button>
      </CardContent>
    </Card>
  );
});

export default EmptyAnalyticsState;
