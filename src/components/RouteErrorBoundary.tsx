import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  /** When this changes (the pathname, say) a shown error is cleared, so other pages render again. */
  resetKey: string;
  children: ReactNode;
}

interface State {
  error: Error | null;
  resetKey: string;
}

const RELOAD_FLAG = 'chunk-reload-at';

// What browsers throw when a lazy route's JavaScript file can't be fetched.
const isChunkLoadError = (error: Error) =>
  /dynamically imported module|importing a module script failed|loading chunk/i.test(error.message);

/**
 * Keeps a failing page from blanking the whole site (navigation and footer stay).
 * The usual cause is a lazy route whose hashed file vanished in a new deploy while
 * the visitor's tab was still open; reloading once fetches the new index.html.
 */
export class RouteErrorBoundary extends Component<Props, State> {
  state: State = { error: null, resetKey: this.props.resetKey };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

  static getDerivedStateFromProps(props: Props, state: State): Partial<State> | null {
    return props.resetKey !== state.resetKey ? { error: null, resetKey: props.resetKey } : null;
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
    if (!isChunkLoadError(error)) return;
    try {
      // Reload once; if it happens again straight after, show the message instead of looping.
      const last = Number(sessionStorage.getItem(RELOAD_FLAG) ?? 0);
      if (Date.now() - last < 30_000) return;
      sessionStorage.setItem(RELOAD_FLAG, String(Date.now()));
      window.location.reload();
    } catch {
      // sessionStorage can be unavailable (private mode); fall through to the message.
    }
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <section className="min-h-[60vh] bg-white py-20 text-center dark:bg-slate-900">
        <div className="mx-auto max-w-md px-4">
          <h1 className="mb-4 text-gray-900 dark:text-white">Något gick fel</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sidan kunde inte visas. Ladda om sidan, eller gå tillbaka till startsidan.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-lg bg-[#4A6741] px-5 py-2.5 text-white hover:bg-[#3d5636]"
            >
              Ladda om sidan
            </button>
            <a href="/" className="px-5 py-2.5 text-[#4A6741] underline dark:text-[#8FA888]">
              Till startsidan
            </a>
          </div>
        </div>
      </section>
    );
  }
}
