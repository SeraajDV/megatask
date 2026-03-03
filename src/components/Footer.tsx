type ShortcutItemProps = {
  keys: string[];
  action: string;
};

function getModifierKey() {
  return typeof window !== "undefined" &&
    navigator.platform.toUpperCase().indexOf("MAC") === 0
    ? "Cmd"
    : "Ctrl";
}

function ShortcutItem({ keys, action }: ShortcutItemProps) {
  const modifierKey = getModifierKey();
  const displayKeys = keys.map((key) => (key === "Mod" ? modifierKey : key));

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {displayKeys.map((key, idx) => (
          <span key={key}>
            <kbd className="rounded border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-xs font-semibold text-primary">
              {key}
            </kbd>
            {idx < displayKeys.length - 1 && (
              <span className="mx-0.5 text-muted-foreground">+</span>
            )}
          </span>
        ))}
      </div>
      <span className="text-muted-foreground">{action}</span>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="rounded-xl border border-border/50 bg-muted/20 px-4 py-3">
      <h3 className="text-sm font-semibold text-foreground mb-3">
        Keyboard Shortcuts
      </h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <ShortcutItem
          keys={["Space"]}
          action="Start/Stop tracking"
        />
        <ShortcutItem
          keys={["Mod", "Enter"]}
          action="Quick start"
        />
        <ShortcutItem
          keys={["Mod", "K"]}
          action="Focus task input"
        />
        <ShortcutItem
          keys={["T"]}
          action="Timer start/pause"
        />
        <ShortcutItem
          keys={["R"]}
          action="Timer reset"
        />
        <ShortcutItem
          keys={["Alt", "1", "2", "3"]}
          action="Set quick timers"
        />
        <ShortcutItem
          keys={["Mod", "Shift", "Backspace"]}
          action="Clear log"
        />
      </div>
    </footer>
  );
}
