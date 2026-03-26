interface TeamMemberProps {
  name: string
  title: string
  credentials: string[]
  bio: string
  initials: string
}

export function TeamMember({
  name,
  title,
  credentials,
  bio,
  initials,
}: TeamMemberProps) {
  return (
    <div className="flex flex-col items-start gap-8 md:flex-row">
      {/* Placeholder avatar -- replace with next/image headshots later */}
      <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
        {initials}
      </div>

      <div>
        <h3 className="text-2xl font-semibold">{name}</h3>
        <p className="mt-1 text-slate-700">{title}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {credentials.map((credential) => (
            <span
              key={credential}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
            >
              {credential}
            </span>
          ))}
        </div>

        <p className="mt-4 leading-relaxed text-slate-700">{bio}</p>
      </div>
    </div>
  )
}
