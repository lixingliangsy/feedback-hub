export interface InputField {
  key: string
  label: string
  type: 'input' | 'text' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "FeedbackHub",
  slug: "feedback-hub",
  productId: "PROD_7FFJmV0li9bMmWKtKmgPTI",
  priceMonthly: 19,
  yearlyProductId: "PROD_3lh1wT3X4m4yuUTAYpaYCV",
  priceYearly: 190,

  checkoutUrl: "https://pancake.waffo.ai/store/lixingliang-ai-tools-6cilbw8v/checkout/cs_94f5b419-2d78-ce51-b5b1-ccd7572555c0",
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
  definitionLead: "FeedbackHub groups scattered user feedback from Slack, DMs, or surveys into themes with a frequency count and a suggested 'build next' pick — for solo founders drowning in notes.",
  geoFaq: [
    { q: "What is FeedbackHub?", a: "A tool that groups scattered user feedback into themes with a frequency count and suggests a 'build next' item." },
    { q: "Where can feedback come from?", a: "You can paste lines from Slack, DMs, or surveys." },
    { q: "Does it count frequency?", a: "Yes. Each theme carries a frequency count so you see what repeats." },
    { q: "What is the build-next pick?", a: "It is a suggested first roadmap item derived from the most frequent themes." },
    { q: "Do I need a spreadsheet?", a: "No. It is built to replace the manual spreadsheet synthesis." },
    { q: "Who should use it?", a: "Solo founders and small teams who collect feedback everywhere but never turn it into a roadmap." },
  ],
  systemPrompt: "You are a product strategist. Given a list of user feedback lines, cluster them into themes (Pricing, Bugs, UI/UX, Performance, Other), count frequency, and recommend the top theme to build next.",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "Unlimited"
  },
  {
    "tier": "Pro",
    "price": "$19/mo",
    "desc": "Sentiment, dedupe"
  }
],
  mock: (inputs: Record<string, string>): string => {
  const lines = (inputs['feedback'] || '').split(/\n/).map(s => s.trim()).filter(Boolean)
  const buckets: Record<string, string[]> = {}
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
