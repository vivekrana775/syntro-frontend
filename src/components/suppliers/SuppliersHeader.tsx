import { Button, Icon } from '@/components/ui';

export interface SuppliersHeaderProps {
  title: string;
  subtitle: string;
  onNewSupplier: () => void;
}

/** Page title block + "New Supplier" CTA (1:21910). */
export function SuppliersHeader({ title, subtitle, onNewSupplier }: SuppliersHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-2xl font-semibold leading-8 text-graphite">{title}</h2>
        <p className="font-sans text-base text-graphite/60">{subtitle}</p>
      </div>
      <Button
        variant="primary"
        size="md"
        className="gap-2"
        leadingIcon={<Icon name="plus" />}
        onClick={onNewSupplier}
      >
        New Supplier
      </Button>
    </div>
  );
}
