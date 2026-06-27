export default function DocsSectionFallback() {
  return (
    <div className="animate-pulse space-y-4 py-8" aria-hidden>
      <div className="h-10 w-2/3 rounded bg-gray-200 dark:bg-slate-700" />
      <div className="h-4 w-full rounded bg-gray-200 dark:bg-slate-700" />
      <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-slate-700" />
      <div className="h-32 w-full rounded bg-gray-200 dark:bg-slate-700" />
    </div>
  );
}
