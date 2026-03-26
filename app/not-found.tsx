import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900">Page Not Found</h1>
        <p className="text-slate-700 mt-4 text-lg">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8">
          <Button render={<Link href="/" />} size="lg">
            Return Home
          </Button>
        </div>
      </div>
    </div>
  )
}
