export function isTypingTarget() {
  const active = document.activeElement;
  if (!active) return false;
  if (active.tagName === "INPUT" || active.tagName === "TEXTAREA") return true;

  return active instanceof HTMLElement && active.isContentEditable;
}
