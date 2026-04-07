import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { PageHeader } from "@/components/marketing/page-header"
import { BLOG_POSTS } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical AI tips, workflows, and strategies for PE-backed portfolio companies.",
}

export default function BlogPage() {
  return (
    <>
      <PageHeader
        title="Blog"
        description="Practical AI tips and strategies for PE-backed teams. No theory, no fluff."
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="space-y-6">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-lg border border-slate-200 bg-white p-8 transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3 text-sm">
                  <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
                    {post.category}
                  </span>
                  <span className="text-slate-400">|</span>
                  <time className="text-slate-500">{post.date}</time>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-500">{post.readTime}</span>
                </div>
                <h2 className="mt-4 text-2xl font-semibold text-foreground transition-colors group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="mt-3 leading-relaxed text-slate-600">
                  {post.description}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={post.author.image}
                      alt={post.author.name}
                      width={32}
                      height={32}
                      className="rounded-full object-cover object-top"
                    />
                    <span className="text-sm text-slate-600">
                      {post.author.name}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Read more
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
