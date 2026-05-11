import Head from 'next/head'
import WindDownNotice from '../components/WindDownNotice'

export default function HistoryPage() {
  return (
    <div>
      <Head>
        <title>Alphy - Read-only Archive</title>
        <meta property="og:title" content="Alphy - Read-only Archive" />
      </Head>
      <WindDownNotice
        title="Creation history is no longer available"
        body="AI Playground and generated creation history have been disabled as part of the Alphy wind-down."
      />
    </div>
  )
}
