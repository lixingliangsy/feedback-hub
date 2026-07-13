export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "FeedbackHub",
  slug: "feedback-hub",
  tagline: "Turn scattered feedback into a roadmap",
  description: "Paste user feedback lines from Slack, DMs, or surveys; get them grouped by theme with a frequency count and a suggested 'build next' pick. For solo founders drowning in notes.",
  toolTitle: "Cluster feedback",
  resultLabel: "Your themes",
  ctaLabel: "Cluster",
  features: [
  "Theme buckets",
  "Frequency count",
  "Build-next pick",
  "No spreadsheet"
],
  inputs: [
  {
    "key": "feedback",
    "label": "Feedback (one per line)",
    "type": "textarea",
    "placeholder": "export to CSV is broken\ntoo expensive for solo\nlove the new UI\nloading is slow"
  },
  {
    "key": "product",
    "label": "Product (optional)",
    "type": "input",
    "placeholder": "e.g. TaskNinja"
  }
] as InputField[],
  systemPrompt: "You are a product strategist. Given a list of user feedback lines, cluster them into themes (Pricing, Bugs, UI/UX, Performance, Other), count frequency, and recommend the top theme to build next.",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "Unlimited"
  },
  {
    "tier": "Pro",
    "price": "$12/mo",
    "desc": "Sentiment, dedupe"
  },
  {
    "tier": "Team",
    "price": "$29/mo",
    "desc": "Trend over time, API"
  }
],
  mock: (inputs: Record<string, string>): string => {
  const lines = (inputs['feedback'] || '').split(/\n/).map(s => s.trim()).filter(Boolean)
  const buckets = {}
  lines.forEach(l => {
    const k = /price|cost|cheap|expensive/i.test(l) ? 'Pricing' : /bug|error|broken|crash/i.test(l) ? 'Bugs' : /ui|design|look|ux/i.test(l) ? 'UI/UX' : /slow|speed|fast|performance/i.test(l) ? 'Performance' : 'Other'
    ;(buckets[k] = buckets[k] || []).push(l)
  })
  const keys = Object.keys(buckets).sort((a, b) => buckets[b].length - buckets[a].length)
  let out = 'FEEDBACK THEMES (' + lines.length + ' notes)\n\n'
  keys.forEach(k => { out += '- ' + k + ' (' + buckets[k].length + '): ' + buckets[k][0].slice(0, 60) + '\n' })
  out += '\nBUILD NEXT: ' + (keys[0] || 'n/a')
  return out + '\n\n--- (Mock bucket. Add OPENAI_API_KEY for sentiment + dedupe.)'
}
}
