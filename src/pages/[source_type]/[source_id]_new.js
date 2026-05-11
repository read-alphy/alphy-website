/**
 * New Source Page - Rewritten version
 * Uses new component architecture with contexts
 */
import { useRouter } from 'next/router'
import Head from 'next/head'
import Loading from '@/components/Loading'
import SideFeed from '@/components/SideFeed/SideFeed'
import { SourceProvider, UIProvider, SourceLayout, useSource } from '@/components/source'
import { getThumbnailUrl } from '@/components/source/utils/api'

// Meta tags component that reads from context
function SourceMeta() {
  const { source } = useSource()
  
  if (!source) return null
  
  const imageUrl = getThumbnailUrl(source.source_type, source.source_id, source.thumbnail)
  const description = source.summaries?.[0]?.key_takeaways?.[0] || 
    'Explore audiovisual content like never before with Alphy.'
  
  return (
    <Head>
      <title>{source.title || 'Alphy'}</title>
      <meta property="og:title" content={source.title || 'Alphy'} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={`https://alphy.app/${source.source_type}/${source.source_id}`} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={source.title || 'Alphy'} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Head>
  )
}

export default function SourcePageNew({
  // Props from _app.js
  collapsed,
  setCollapsed,
  tier,
  userArcs,
  currentUser,
  sandboxHistory,
  setSandboxHistory,
  getSandboxHistory,
  loggedIn,
  setLoggedIn,
}) {
  const router = useRouter()
  const { source_type, source_id } = router.query
  
  // Wait for router to be ready
  if (!router.isReady) {
    return <Loading />
  }
  
  // Validate source_id
  if (!source_id || typeof source_id !== 'string' || source_id === '[object Object]') {
    router.push('/404')
    return <Loading />
  }
  
  return (
    <SourceProvider sourceType={source_type} sourceId={source_id}>
      <UIProvider>
        <div className="article bg-white dark:bg-darkMode dark:text-zinc-300">
          <SourceMeta />
          
          <div className="flex flex-row bg-white dark:bg-darkMode">
            {/* Sidebar */}
            <SideFeed
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              currentUser={currentUser}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              tier={tier}
              sandboxHistory={sandboxHistory}
            />
            
            {/* Main Content */}
            <div className={`w-full max-h-[90vh] sm:max-h-[100vh] ${
              collapsed ? 'overflow-hidden' : 'overflow-y-auto'
            }`}>
              <SourceLayout />
            </div>
          </div>
        </div>
      </UIProvider>
    </SourceProvider>
  )
}

