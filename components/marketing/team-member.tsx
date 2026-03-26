import Image from "next/image"

function LinkedInIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

interface TeamMemberProps {
  name: string
  title: string
  credentials: string[]
  bio: string
  initials: string
  imageSrc?: string
  linkedIn?: string
}

export function TeamMember({
  name,
  title,
  credentials,
  bio,
  initials,
  imageSrc,
  linkedIn,
}: TeamMemberProps) {
  return (
    <div className="flex flex-col items-start gap-8 md:flex-row">
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={name}
          width={128}
          height={128}
          className="h-32 w-32 shrink-0 rounded-full object-cover object-top"
          preload
        />
      ) : (
        <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
          {initials}
        </div>
      )}

      <div>
        <div className="flex items-center gap-3">
          <h3 className="text-2xl font-semibold">{name}</h3>
          {linkedIn && (
            <a
              href={linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 transition-colors hover:text-primary"
              aria-label={`${name} on LinkedIn`}
            >
              <LinkedInIcon />
            </a>
          )}
        </div>
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

        <div className="mt-4 space-y-3">
          {bio.split("\n\n").map((paragraph, i) => (
            <p key={i} className="leading-relaxed text-slate-700">{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
