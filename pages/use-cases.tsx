import React from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import { PRODUCT } from '../lib/product'

const segments = [
  {
    name: "Solo founders",
    pain: "Notes scattered across Slack/DMs.",
    how: "Cluster into themes with frequency + build-next pick.",
  },
  {
    name: "Indie hackers",
    pain: "No time for a full research process.",
    how: "Paste lines; get buckets in minutes.",
  },
  {
    name: "Small PMs",
    pain: "Need a shareable theme summary.",
    how: "Export themes for roadmap reviews.",
  },
  {
    name: "Support \u2192 product",
    pain: "Tickets hide repeated pain.",
    how: "Bucket bugs vs pricing vs UX.",
  },
]

export default function UseCasesPage() {
  return (
    <Layout>
      <Head>
        <title>{`${PRODUCT.name} — Use Cases`}</title>
        <meta name="description" content={`How ${PRODUCT.name} helps ${PRODUCT.tagline}`} />
      </Head>
      <div className="max-w-4xl">
        <div className="text-xs font-bold tracking-widest uppercase text-indigo-600 mb-3">Use Cases</div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Built for solo founders and small product teams</h1>
        <p className="text-lg text-slate-600 mb-10">Pick your segment to see the workflows that matter most.</p>

        <div className="space-y-5">
          {segments.map((s) => (
            <div key={s.name} className="rounded-2xl border border-slate-200 p-6 bg-white">
              <h2 className="text-xl font-bold mb-2 text-slate-900">{s.name}</h2>
              <p className="text-sm text-slate-600 mb-2"><span className="font-semibold text-slate-900">Pain: </span>{s.pain}</p>
              <p className="text-sm text-slate-600"><span className="font-semibold text-slate-900">How {PRODUCT.name} helps: </span>{s.how}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-8">refs: schema.org Question / FAQPage · Nielsen Norman Group — affinity diagramming · FTC endorsements / testimonials guidance</p>
      </div>
    </Layout>
  )
}
