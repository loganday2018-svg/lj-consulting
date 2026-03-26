interface PageHeaderProps {
  title: string
  description?: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <section
      className="bg-primary py-16 md:py-24"
      style={{
        backgroundImage:
          "radial-gradient(circle, oklch(1 0 0 / 0.07) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h1 className="font-display text-4xl font-bold text-primary-foreground md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
