'use client';

interface NextPageLinkProps {
  nextSection: string | null;
  nextTitle: string | null;
  onNavigate: (sub: string) => void;
  color?: 'primary' | 'purple' | 'blue';
}

export default function NextPageLink({ 
  nextSection, 
  nextTitle, 
  onNavigate,
  color = 'primary' 
}: NextPageLinkProps) {
  if (!nextSection || !nextTitle) return null;

  const colorClasses = {
    primary: 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 text-primary-700 dark:text-primary-400',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 text-purple-700 dark:text-purple-400',
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  };

  const handleClick = () => {
    onNavigate(nextSection);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-700">
      <button
        onClick={handleClick}
        className={`w-full p-6 rounded-lg border-2 transition-all ${colorClasses[color]} group`}
      >
        <div className="flex items-center justify-between">
          <div className="text-left">
            <div className="text-sm font-semibold mb-1 opacity-70">Следующая страница</div>
            <div className="text-xl font-bold">{nextTitle}</div>
          </div>
          <div className="text-2xl group-hover:translate-x-1 transition-transform">
            →
          </div>
        </div>
      </button>
    </div>
  );
}

