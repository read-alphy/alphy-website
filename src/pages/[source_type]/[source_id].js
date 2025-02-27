import { useState, useEffect } from 'react'
import Loading from '../../components/Loading'
import { API_URL } from '../../constants'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Source = dynamic(() => import('../../components/Content/Source'), {
  ssr: false,
  loading: () => <Loading />
})

export default function SourceMaterial() {
  const router = useRouter()
  const { source_type, source_id } = router.query
  const [initialData, setInitialData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [imageUrl, setImageUrl] = useState("")

  useEffect(() => {
    if (!router.isReady) return

    async function fetchData() {
      if (!source_id || typeof source_id !== 'string' || source_id === '[object Object]') {
        setError('Invalid source ID')
        setLoading(false)
        return
      }
      
      const url = `${API_URL}/sources/${source_type}/${source_id}`
      
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setInitialData(data)
        
        // Set image URL based on data and source type
        if (data && data.thumbnail) {
          setImageUrl(data.thumbnail)
        } else if (source_type === "x") {
          setImageUrl("/img/X.png")
        } else if (source_type === "yt") {
          setImageUrl(`https://i.ytimg.com/vi/${source_id}/hqdefault.jpg`)
        } else if (source_type === "sp") {
          setImageUrl("/img/twitter_space.png")
        } else if (source_type === "ap") {
          setImageUrl("/img/apple_podcast_banner.png")
        } else if (source_type === "tw") {
          setImageUrl("/img/twitchSource.png")
        }
      } catch (error) {
        console.error(`Error fetching data: ${error}`)
        setError(error.message || 'Error fetching data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router.isReady, source_id, source_type])

  if (error) {
    return <div>Error loading data: {error}</div>
  }

  if (loading || !initialData) {
    return <Loading />
  }

  return (
    <div>
      <Head>
        <meta property="og:title" content={initialData.title || "Turn audio to text, summarize, and generate content with AI"} />
        <meta name="twitter:description" content={initialData.summaries?.[0]?.key_takeaways || 'Explore audiovisual content like never before with Alphy.'} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={`https://alphy.app/${source_type}/${source_id}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={initialData.title ? `Alphy - ${initialData.title}` : "Turn audio to text, summarize, and generate content with AI"} />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={initialData.title || "Alphy - Turn audio to text, summarize, and generate content with AI"} />
        <meta name="twitter:image" content={imageUrl} />
        <title>{initialData.title || "Alphy - Turn audio to text, summarize, and generate content with AI"}</title>
      </Head>

      <Source 
        source_type={source_type}
        source_id={source_id}
        data={initialData}
      />
    </div>
  )
}