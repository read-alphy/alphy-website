import WindDownNotice from '@/components/WindDownNotice'

export default function QAView() {
  return (
    <WindDownNotice
      title="Q&A is no longer available"
      body="AI question answering has been disabled. Existing summaries and transcripts remain available for reading."
      actionHref={null}
    />
  )
}
