export interface AuthHeadingProps {
  title: string;
  subtitle: string;
}

export function AuthHeading({ title, subtitle }: AuthHeadingProps) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <h1 className="font-display text-2xl font-semibold text-graphite">{title}</h1>
      <p className="font-sans text-lg text-graphite/60">{subtitle}</p>
    </div>
  );
}
