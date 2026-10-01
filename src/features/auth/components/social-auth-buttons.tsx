/** Decorative social sign-in buttons (UI only). */
export function SocialAuthButtons() {
  return (
    <>
      <div className="relative my-6 text-center text-xs text-muted-foreground">
        <span
          className="absolute inset-x-0 top-1/2 h-px bg-border"
          aria-hidden="true"
        />
        <span className="relative bg-background px-3">یا ادامه با</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-card text-sm font-medium hover:bg-muted"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <path
              fill="#EA4335"
              d="M12 10.2v3.9h5.4c-.2 1.3-1.6 3.8-5.4 3.8-3.2 0-5.9-2.7-5.9-6s2.7-6 5.9-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.3 14.6 2.4 12 2.4 6.7 2.4 2.4 6.7 2.4 12s4.3 9.6 9.6 9.6c5.5 0 9.2-3.9 9.2-9.4 0-.6-.1-1.1-.2-1.6H12z"
            />
          </svg>
          گوگل
        </button>
        <button
          type="button"
          className="flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-card text-sm font-medium hover:bg-muted"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M16.4 12.6c0-2.5 2-3.7 2.1-3.8-1.2-1.7-3-1.9-3.6-2-1.5-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.3.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.8-1-2.8-4.1zM13.9 5.1c.7-.8 1.2-2 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.4z" />
          </svg>
          اپل
        </button>
      </div>
    </>
  );
}
