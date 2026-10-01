/** Heading block shared by all auth screens. */
export function AuthHeader({
  title,
  description,
  icon,
}: {
  title: string;
  description?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      {icon && (
        <span className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-accent text-primary">
          {icon}
        </span>
      )}
      <h1 className="text-h1">{title}</h1>
      {description && (
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
