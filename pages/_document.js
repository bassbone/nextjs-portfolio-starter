import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const meta = {
    title: "bassbone's blog",
    description: "bassbone's blog is a blog about web development, programming, and more.",
    image: '/images/ファミコン-16x16.webp'
  }

  return (
    <Html lang="ja">
      <Head>
        <meta name="robots" content="follow, index" />
        <meta name="description" content={meta.description} />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@bassbone0" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
