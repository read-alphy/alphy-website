import { useSource } from '../context/SourceContext'
import Loading from '@/components/Loading'
import Link from 'next/link'
import SourceHeader from '../header/SourceHeader'
import ReadPanel from '../read/ReadPanel'

export default function SourceLayout() {
  const { source, isLoading, error } = useSource()
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    )
  }
  
  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-xl font-bold text-red-500 mb-4">Something went wrong</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">{error.message}</p>
        <Link href="/" className="text-indigo-500 hover:underline">
          Back to Home
        </Link>
      </div>
    )
  }
  
  // No data state
  if (!source) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-xl font-bold mb-4">Content Not Found</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          The content you're looking for doesn't exist or you don't have access.
        </p>
        <Link href="/" className="text-indigo-500 hover:underline">
          Back to Home
        </Link>
      </div>
    )
  }
  
  return (
    <div className="h-full lg:overflow-hidden lg:max-h-screen">
      <div className="hidden h-full lg:block">
        <div className="mx-auto flex h-full max-w-5xl flex-col px-4 pt-6">
          <SourceHeader />
          <div className="mt-4 flex-grow overflow-auto">
            <ReadPanel />
          </div>
        </div>
      </div>
      
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="max-w-[600px] mx-auto px-4">
          <div className="pt-4">
            <SourceHeader />
          </div>
          
          <div className="mt-4">
            <ReadPanel />
          </div>
        </div>
      </div>
    </div>
  )
}
