import WindDownNotice from '@/components/WindDownNotice'

export default function ArcFormUrlSubmit() {
  return (
    <WindDownNotice
      title="Submissions are no longer available"
      body="Adding new source links has been disabled."
      actionHref={null}
    />
  )
}
