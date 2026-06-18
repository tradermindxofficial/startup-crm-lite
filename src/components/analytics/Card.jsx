import React, { memo } from "react";

export const Card = memo(function Card({ className = "", children }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-900 ${className}`}
    >
      {children}
    </div>
  );
});

export const CardHeader = memo(function CardHeader({ title, description, action, className = "" }) {
  return (
    <div className={`flex items-start justify-between gap-4 p-6 pb-0 ${className}`}>
      <div>
        {title ? <h3 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h3> : null}
        {description ? <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
});

export const CardContent = memo(function CardContent({ className = "", children }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
});
