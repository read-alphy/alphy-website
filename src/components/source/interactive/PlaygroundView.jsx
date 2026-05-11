import WindDownNotice from '@/components/WindDownNotice'

export default function PlaygroundView() {
  return (
    <WindDownNotice
      title="Playground is no longer available"
      body="AI generation tools have been disabled. Existing summaries and transcripts remain available for reading."
      actionHref={null}
    />
  )
}
