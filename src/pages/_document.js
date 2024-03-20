import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <html lang="en" suppressHydrationWarning>
        <Head>
          {/* Static files and scripts */}
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i,700,700i&display=swap" />
          <script async src="https://tally.so/widgets/embed.js"></script>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-8Z8TFG1KMS"></script>
          <script dangerouslySetInnerHTML={{ __html: `      ;(function (w, d, s, l, i) {
        w[l] = w[l] || []
        w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != 'dataLayer' ? '&l=' + l : ''
        j.async = true
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
        f.parentNode.insertBefore(j, f)
      })(window, document, 'script', 'dataLayer', 'GTM-MSDBCTS')` }} />
          <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MSDBCTS');` }} />
          <script dangerouslySetInnerHTML={{ __html: ` window.dataLayer = window.dataLayer || []
      function gtag() {
        dataLayer.push(arguments)
      }
      gtag('js', new Date())

      gtag('config', 'G-8Z8TFG1KMS')
    </script>
    <script type="text/javascript">
      var userId =
        localStorage.getItem('userId') !== null
          ? localStorage.getItem('userId')
          : 'notLoggedIn'
      var tier =
        localStorage.getItem('tier') !== null
          ? localStorage.getItem('tier')
          : 'free'

      ;(function (c, l, a, r, i, t, y) {
        c[a] =
          c[a] ||
          function () {
            ;(c[a].q = c[a].q || []).push(arguments)
          }

        t = l.createElement(r)
        t.async = 1 
        t.src = 'https://www.clarity.ms/tag/' + i
        y = l.getElementsByTagName(r)[0]
        y.parentNode.insertBefore(t, y)
        c[a]('identify', userId)
        c[a]('set', 'tier', tier) // Assuming Clarity accepts custom attributes
      })(window, document, 'clarity', 'script', 'fy8nzp2uqz')` }} />
          {/* More scripts and meta tags as needed */}
        </Head>
        <body className="bg-white dark:bg-darkMode">
          <Main />
          <NextScript />    
          {/* Inline script and noscript tags */}
       
          <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MSDBCTS" height="0" width="0" style="display:none;visibility:hidden"></iframe>` }} />
        </body>
      </html>
    ) 
  }
}

export default MyDocument
