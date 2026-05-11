import Head from 'next/head'
import WindDownNotice from '../../components/WindDownNotice'

export default function CreateArcPage() {
  return (
    <div>
      <Head>
        <title>Alphy - Arcs Unavailable</title>
        <meta property="og:title" content="Alphy - Arcs Unavailable" />
      </Head>
      <WindDownNotice
        title="Arcs are no longer available"
        body="Creating Arcs has been disabled. Existing source materials remain available for reading."
      />
    </div>
  )
}
