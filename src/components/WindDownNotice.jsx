import Link from 'next/link'
import { Archive } from 'lucide-react'
import { WIND_DOWN_COPY } from '@/constants/windDown'

export default function WindDownNotice({
  title = WIND_DOWN_COPY.title,
  body = WIND_DOWN_COPY.body,
  actionHref = '/explore',
  actionLabel = 'Browse existing material',
}) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-300">
        <Archive className="h-7 w-7" />
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
        {title}
      </h1>
      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-zinc-400">
        {body}
      </p>
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="mt-6 inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
