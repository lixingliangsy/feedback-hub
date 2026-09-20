/**
 * Deterministic feedback-governance rules for feedback-hub.
 * Runs WITHOUT the LLM (rule-based) and tags generated content so output is
 * reproducible, not just chat. Each rule carries a stable id + a real reference.
 *
 * Research-augmented (RAD) against professional standards:
 *  - GDPR Art.5 (data minimisation / storage limitation) & Art.7 (consent)
 *  - FTC — fake/undisclosed reviews (16 CFR Part 255)
 *  - ISO 10002 (customer complaint handling)
 */
export const RULESET_ID = 'feedback-privacy'
export const RULESET_VERSION = '2026-07-20'

export interface RuleResult {
  ruleId: string
  name: string
  category: string
  severity: 'low' | 'medium' | 'high'
  passed: boolean
  message: string
  ref?: string
}

export interface Rule {
  ruleId: string
  name: string
  category: string
  severity: 'low' | 'medium' | 'high'
  ref: string
  check: (content: string, context?: Record<string, string>) => RuleResult
}

const rules: Rule[] = [
  {
    ruleId: 'FB-01',
    name: 'PII minimisation (no raw email/phone in feedback content)',
    category: 'privacy',
    severity: 'high',
    ref: 'https://gdpr-info.eu/art-5/',
    check: (content) => {
      const hasEmail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/.test(content)
      const hasPhone = /\b(?:\+?\d{1,3}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3,4}[\s-]?\d{4}\b/.test(content)
      const passed = !(hasEmail || hasPhone)
      return {
        ruleId: 'FB-01',
        name: 'PII minimisation (no raw email/phone)',
        category: 'privacy',
        severity: 'high',
        passed,
        message: passed
          ? 'No raw email/phone detected (GDPR Art.5(1)(c) data minimisation).'
          : 'Raw email/phone found in feedback content — redact before storage (GDPR Art.5(1)(c)).',
        ref: 'https://gdpr-info.eu/art-5/',
      }
    },
  },
  {
    ruleId: 'FB-02',
    name: 'Consent cue present when collecting feedback',
    category: 'consent',
    severity: 'high',
    ref: 'https://gdpr-info.eu/art-7/',
    check: (content) => {
      const passed = /consent|agree|opt[- ]?in|i accept|permission/i.test(content)
      return {
        ruleId: 'FB-02',
        name: 'Consent cue present',
        category: 'consent',
        severity: 'high',
        passed,
        message: passed
          ? 'Consent/agreement language present (GDPR Art.7).'
          : 'Add explicit consent language for feedback collection (GDPR Art.7).',
        ref: 'https://gdpr-info.eu/art-7/',
      }
    },
  },
  {
    ruleId: 'FB-03',
    name: 'No fabricated / undisclosed testimonials',
    category: 'integrity',
    severity: 'high',
    ref: 'https://www.ftc.gov/legal-library/browse/rules/ftc-rule-concerning-use-endorsements-testimonials',
    check: (content) => {
      const hasFakeClaim = /(fake review|generated testimonial|pretend customer|i am a real customer)/i.test(content)
      const passed = !hasFakeClaim
      return {
        ruleId: 'FB-03',
        name: 'No fabricated / undisclosed testimonials',
        category: 'integrity',
        severity: 'high',
        passed,
        message: passed
          ? 'No fabricated-review language (FTC 16 CFR Part 255).'
          : 'Remove fabricated/undisclosed testimonial language (FTC 16 CFR Part 255).',
        ref: 'https://www.ftc.gov/legal-library/browse/rules/ftc-rule-concerning-use-endorsements-testimonials',
      }
    },
  },
  {
    ruleId: 'FB-04',
    name: 'Sentiment label uses standard taxonomy',
    category: 'quality',
    severity: 'medium',
    ref: 'https://iso.org/standard/74205.html',
    check: (content) => {
      const hasLabel = /(positive|negative|neutral|mixed)/i.test(content)
      const passed = hasLabel
      return {
        ruleId: 'FB-04',
        name: 'Sentiment label uses standard taxonomy',
        category: 'quality',
        severity: 'medium',
        passed,
        message: passed
          ? 'Sentiment uses standard positive/negative/neutral labels (ISO 10002).'
          : 'Use standard sentiment labels (positive/negative/neutral) (ISO 10002).',
        ref: 'https://iso.org/standard/74205.html',
      }
    },
  },
  {
    ruleId: 'FB-05',
    name: 'Storage-limitation / retention notice',
    category: 'privacy',
    severity: 'medium',
    ref: 'https://gdpr-info.eu/art-5/',
    check: (content) => {
      const passed = /(retain|retention|delete after|storage limit|30 days|90 days|1 year)/i.test(content)
      return {
        ruleId: 'FB-05',
        name: 'Storage-limitation / retention notice',
        category: 'privacy',
        severity: 'medium',
        passed,
        message: passed
          ? 'Retention/storage-limitation notice present (GDPR Art.5(1)(e)).'
          : 'State a retention period for stored feedback (GDPR Art.5(1)(e)).',
        ref: 'https://gdpr-info.eu/art-5/',
      }
    },
  },
  {
    ruleId: 'FB-06',
    name: 'No discriminatory / biased prompt language',
    category: 'fairness',
    severity: 'medium',
    ref: 'https://gdpr-info.eu/recital-75/',
    check: (content) => {
      const biased = /(based on your race|because you are (old|young)|only (men|women) should)/i.test(content)
      const passed = !biased
      return {
        ruleId: 'FB-06',
        name: 'No discriminatory / biased prompt language',
        category: 'fairness',
        severity: 'medium',
        passed,
        message: passed
          ? 'No discriminatory language detected (GDPR Recital 75).'
          : 'Remove discriminatory language from feedback prompts (GDPR Recital 75).',
        ref: 'https://gdpr-info.eu/recital-75/',
      }
    },
  },
  {
    ruleId: 'FB-07',
    name: 'Source attribution for cited feedback',
    category: 'traceability',
    severity: 'low',
    ref: 'https://www.iso.org/standard/74205.html',
    check: (content) => {
      const citesSource = /(source:|from |submitted by|channel:|via )/i.test(content)
      const passed = citesSource
      return {
        ruleId: 'FB-07',
        name: 'Source attribution for cited feedback',
        category: 'traceability',
        severity: 'low',
        passed,
        message: passed
          ? 'Feedback source is attributed (ISO 10002 traceability).'
          : 'Attribute the source/channel of cited feedback (ISO 10002).',
        ref: 'https://www.iso.org/standard/74205.html',
      }
    },
  },
]

export function runAllRules(content: string, context?: Record<string, string>): RuleResult[] {
  return rules.map((r) => r.check(content, context))
}

export type RuleHit = { id: string; title: string; severity: 'low' | 'medium' | 'high'; passed: boolean; remediation?: string; ref?: string }
export function runDeterministicChecks(inputs: Record<string, string>): RuleHit[] {
  const blob = Object.values(inputs || {}).join('\n')
  return runAllRules(blob).map((r: any) => ({
    id: String(r.id || r.ruleId || 'R'),
    title: String(r.name || r.title || 'check'),
    severity: (r.severity as 'low' | 'medium' | 'high') || 'medium',
    passed: !!r.passed,
    remediation: r.message || r.remediation,
    ref: r.ref || r.source,
  }))
}
