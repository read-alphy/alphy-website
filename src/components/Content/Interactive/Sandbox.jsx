import WindDownNotice from '@/components/WindDownNotice'

export default function Sandbox() {
  return (
    <WindDownNotice
      title="Playground is no longer available"
      body="AI generation tools have been disabled. Existing summaries and transcripts remain available for reading."
      actionHref={null}
    />
  )
}
