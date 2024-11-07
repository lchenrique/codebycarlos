interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold tracking-tight mb-2 funnel-display">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg">{subtitle}</p>
      )}
    </div>
  );
}