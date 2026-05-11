import Head from 'next/head'
import WindDownNotice from '../../components/WindDownNotice'

export default function ArcPage() {
  return (
    <div>
      <Head>
        <title>Alphy - Arcs Unavailable</title>
        <meta property="og:title" content="Alphy - Arcs Unavailable" />
      </Head>
      <WindDownNotice
        title="Arcs are no longer available"
        body="Arcs have been removed as part of the Alphy wind-down. Existing source materials remain available for reading."
      />
    </div>
  )
}
