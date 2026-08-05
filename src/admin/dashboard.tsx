import { ArrowUpRight, ChartLineUp, EnvelopeSimple, Eye, Users } from "@phosphor-icons/react"
import { useQuery } from "convex/react"
import { useState } from "react"
import { api } from "../../convex/_generated/api"
import { PageHeading } from "./ui"

const periods = [7, 30, 90] as const

function formatNumber(value: number | undefined) {
  return new Intl.NumberFormat("en-US").format(value ?? 0)
}

export default function Dashboard() {
  const [days, setDays] = useState<(typeof periods)[number]>(30)
  const [now] = useState(() => Date.now())
  const analytics = useQuery(api.analytics.dashboard, { now, days })
  const maxViews = Math.max(1, ...(analytics?.dailyViews.map((day) => day.views) ?? [1]))
  const cards = [
    {
      label: "Visitors",
      value: formatNumber(analytics?.uniqueVisitors),
      detail: `Unique visitors in ${days} days`,
      icon: Users,
    },
    {
      label: "Page views",
      value: formatNumber(analytics?.pageViews),
      detail: `Total views in ${days} days`,
      icon: Eye,
    },
    {
      label: "Inquiries",
      value: formatNumber(analytics?.inquiries),
      detail: `${analytics?.privateEventInquiries ?? 0} private event`,
      icon: EnvelopeSimple,
    },
    {
      label: "Conversion",
      value: `${(analytics?.conversionRate ?? 0).toFixed(1)}%`,
      detail: "Visitors who sent an inquiry",
      icon: ChartLineUp,
    },
  ]

  return (
    <div className="grid gap-6">
      <PageHeading
        actions={
          <div className="flex rounded-lg border border-kelp-ink/15 bg-white p-1">
            {periods.map((period) => (
              <button
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                  days === period
                    ? "bg-aberdeen-blue text-white"
                    : "text-kelp-ink/60 hover:bg-oyster-white"
                }`}
                key={period}
                onClick={() => setDays(period)}
                type="button"
              >
                {period} days
              </button>
            ))}
          </div>
        }
        description="A simple view of the numbers that matter: traffic and inquiry performance."
        title="Dashboard"
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <article
              className="rounded-xl border border-kelp-ink/15 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              key={card.label}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold tracking-wide text-kelp-ink/60 uppercase">
                  {card.label}
                </p>
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-aberdeen-blue/8 text-aberdeen-blue">
                  <Icon size={18} />
                </span>
              </div>
              <p className="mt-5 text-3xl font-semibold tracking-tight text-kelp-ink">
                {card.value}
              </p>
              <p className="mt-1 text-xs text-kelp-ink/60">{card.detail}</p>
            </article>
          )
        })}
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.5fr_0.8fr]">
        <article className="rounded-xl border border-kelp-ink/15 bg-white p-5 shadow-sm">
          <div>
            <h2 className="text-sm font-semibold text-kelp-ink">Traffic trend</h2>
            <p className="mt-1 text-xs text-kelp-ink/60">Daily page views</p>
          </div>
          <div className="mt-7 flex h-52 items-end gap-1.5">
            {(
              analytics?.dailyViews ?? Array.from({ length: days }, () => ({ date: "", views: 0 }))
            ).map((item, index) => (
              <div
                className="group relative flex h-full min-w-0 flex-1 items-end"
                key={`${item.date}-${index}`}
              >
                <div
                  className="w-full rounded-t-sm bg-aberdeen-blue/75 transition hover:bg-aberdeen-blue"
                  style={{ height: `${Math.max(3, (item.views / maxViews) * 100)}%` }}
                />
                <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 rounded bg-kelp-ink px-2 py-1 text-[10px] whitespace-nowrap text-white group-hover:block">
                  {item.views} views
                </span>
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-xl border border-kelp-ink/15 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-kelp-ink">Popular pages</h2>
          <p className="mt-1 text-xs text-kelp-ink/60">Most visited in this period</p>
          <div className="mt-5 divide-y divide-kelp-ink/10">
            {(analytics?.popularPages ?? []).map((page, index) => (
              <div className="flex items-center gap-3 py-3.5" key={page.path}>
                <span className="grid h-7 w-7 place-items-center rounded-md bg-aberdeen-peach/40 text-xs font-semibold text-kelp-ink/60">
                  {index + 1}
                </span>
                <span className="min-w-0 grow truncate text-sm font-medium text-kelp-ink/80">
                  {page.path === "/" ? "Home" : page.path}
                </span>
                <span className="text-xs font-semibold text-kelp-ink/60">{page.views}</span>
                <ArrowUpRight className="text-kelp-ink/30" size={14} />
              </div>
            ))}
            {analytics?.popularPages.length === 0 ? (
              <p className="py-12 text-center text-sm text-kelp-ink/45">
                Traffic will appear here as visitors use the site.
              </p>
            ) : null}
          </div>
        </article>
      </div>
      <article className="rounded-xl border border-kelp-ink/15 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-kelp-ink">Inquiry mix</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-oyster-white p-4">
            <p className="text-xs text-kelp-ink/60">General contact</p>
            <p className="mt-2 text-2xl font-semibold text-kelp-ink">
              {analytics?.contactInquiries ?? 0}
            </p>
          </div>
          <div className="rounded-lg bg-aberdeen-peach/45 p-4">
            <p className="text-xs text-kelp-ink/60">Private events</p>
            <p className="mt-2 text-2xl font-semibold text-kelp-ink">
              {analytics?.privateEventInquiries ?? 0}
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}
