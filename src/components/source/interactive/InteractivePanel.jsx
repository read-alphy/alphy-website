import WindDownNotice from '@/components/WindDownNotice'

export default function InteractivePanel() {
  return (
    <WindDownNotice
      title="AI interactions are no longer available"
      body="Q&A and Playground have been disabled as part of the Alphy wind-down."
      actionHref={null}
    />
  )
}
