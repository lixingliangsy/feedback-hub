import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import ChatWidget from '../components/ChatWidget'
import { SUPPORT } from '../lib/support.config'

export default function App({ Component, pageProps }: AppProps) {
  return       <><Head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="FeedbackHub" />
        <meta property="og:description" content="Paste user feedback lines from Slack, DMs, or surveys; get them grouped by theme with a frequency count and a suggested 'build next' pick. For solo founders drowning in notes." />
        <meta property="og:url" content="https://feedback-hub.lxsaihub.com/" />
        <meta property="og:image" content="https://feedback-hub.lxsaihub.com/og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FeedbackHub" />
        <meta name="twitter:description" content="Paste user feedback lines from Slack, DMs, or surveys; get them grouped by theme with a frequency count and a suggested 'build next' pick. For solo founders drowning in notes." />
        <meta name="twitter:image" content="https://feedback-hub.lxsaihub.com/og.png" />
                                        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"SoftwareApplication","name":"FeedbackHub","url":"https://feedback-hub.lxsaihub.com/","description":"Paste user feedback lines from Slack, DMs, or surveys; get them grouped by theme with a frequency count and a suggested \'build next\' pick. For solo founders drowning in notes.","applicationCategory":"BusinessApplication","operatingSystem":"Web","offers":{"@type":"Offer","priceCurrency":"USD","price":"0","availability":"https://schema.org/OnlineOnly"}}' }} />
      </Head>
      <Component {...pageProps} />
      <ChatWidget productName={SUPPORT.productName} brandColor={SUPPORT.brandColor} sessionKeyPrefix={SUPPORT.productSlug} /></>
}
