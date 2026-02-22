interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({ label, title, subtitle, centered = true }: SectionHeadingProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      {label && (
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-3">
          {label}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-primary">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
