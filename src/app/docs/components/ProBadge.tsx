'use client';

export default function ProBadge({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 border-2 border-yellow-500 shadow-sm ${className}`}>
      <span>⭐</span>
      <span>PRO</span>
    </span>
  );
}

