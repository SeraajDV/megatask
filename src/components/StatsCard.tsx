type StatsCardProps = {
  label: string;
  value: string;
};

export function StatsCard({ label, value }: StatsCardProps) {
  return (
    <article className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-primary">{value}</p>
    </article>
  );
}
