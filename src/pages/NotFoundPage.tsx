import { Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';

export function NotFoundPage() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center py-20 bg-white dark:bg-slate-900">
      <div className="text-center px-4">
        <div className="text-8xl font-bold text-[#5A7C50]/20 dark:text-[#5A7C50]/30 mb-4">404</div>
        <h1 className="text-gray-900 dark:text-white mb-4">Sidan hittades inte</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto mb-8">
          Sidan du letar efter verkar inte existera. Den kan ha flyttats eller tagits bort.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#5A7C50] text-white rounded-lg hover:bg-[#4A6741] transition-colors"
          >
            <Home className="w-4 h-4" />
            Gå till startsidan
          </Link>
          <Link
            to="/nyheter"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
          >
            Senaste nyheter <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
