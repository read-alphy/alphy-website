import Head from 'next/head'
import WindDownNotice from '../components/WindDownNotice'

export default function Submit() {
  return (
    <div>
      <Head>
        <title>Alphy - Read-only Archive</title>
        <meta property="og:title" content="Alphy - Read-only Archive" />
        <meta
          property="og:description"
          content="Alphy is now a read-only archive. New submissions and uploads are no longer available."
        />
      </Head>
      <WindDownNotice
        title="New processing is no longer available"
        body="Submitting links and uploading audio have been disabled as part of the Alphy wind-down. Existing public materials remain available for reading."
      />
    </div>
  )
}
