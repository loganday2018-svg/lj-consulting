export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  category: string
  author: {
    name: string
    image: string
  }
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "claude-mobile-remote-control",
    title: "Claude Mobile & Remote Control: Start on Desktop, Finish From Your Phone",
    description:
      "Your AI doesn't clock out when you leave your desk. Here's how to run Claude from your phone and keep work moving from anywhere.",
    date: "April 6, 2026",
    readTime: "5 min read",
    category: "AI Tips",
    author: {
      name: "Logan Day",
      image: "/images/logan.jpg",
    },
  },
  {
    slug: "claude-power-user-tips",
    title: "Claude Power-User Tips: Plugins, Auto Mode & Scheduled Tasks",
    description:
      "Most teams stop at 'ask Claude a question, get an answer.' Three features that turn Claude from a chatbot into a workflow engine.",
    date: "March 30, 2026",
    readTime: "6 min read",
    category: "AI Tips",
    author: {
      name: "Logan Day",
      image: "/images/logan.jpg",
    },
  },
  {
    slug: "claude-team-features",
    title: "3 Claude Features That 10x Your Team's Output",
    description:
      "Skills, mobile Dispatch, and multi-agent workflows. The features that fundamentally change how PE-backed teams operate.",
    date: "March 20, 2026",
    readTime: "7 min read",
    category: "AI Tips",
    author: {
      name: "Logan Day",
      image: "/images/logan.jpg",
    },
  },
]

export function getRelatedPosts(currentSlug: string): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.slug !== currentSlug)
}
