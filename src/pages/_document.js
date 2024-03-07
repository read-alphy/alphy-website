import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <html lang="en" className="bg-white dark:bg-darkMode ">
        <Head>
          {/* Static files and scripts */}
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i,700,700i&display=swap" />
          <script async src="https://tally.so/widgets/embed.js"></script>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-8Z8TFG1KMS"></script>
          {/* More scripts and meta tags as needed */}
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* Inline script and noscript tags */}
          <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MSDBCTS');` }} />
          <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MSDBCTS" height="0" width="0" style="display:none;visibility:hidden"></iframe>` }} />
        </body>
      </html>
    )
  }
}

export default MyDocument
