export function Header() {
  return (
    <header className="space-y-2">
      <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
        Megatask
      </h1>
      <p className="text-lg text-muted-foreground">
        Track time with your keyboard
      </p>
      <p className="text-sm text-muted-foreground">
        Built for deep work: quick timers, fast activity logging, and zero-click
        shortcuts.
      </p>
    </header>
  );
}
