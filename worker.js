export default {
  async fetch(req) {
    const url = new URL(req.url)

    if (url.pathname === '/api') {
      const sites = [
        { name: "Blog", url: "https://blog.rawtv.top" },
        { name: "web", url: "https://www.rawtv.top/?m=1" }
      ]

      const results = await Promise.all(
        sites.map(async site => {
          const start = Date.now()
          try {
            const r = await fetch(site.url, { method: 'HEAD' })
            return {
              name: site.name,
              url: site.url,
              status: r.ok ? 'UP' : 'DOWN',
              latency: Date.now() - start
            }
          } catch {
            return {
              name: site.name,
              url: site.url,
              status: 'DOWN',
              latency: null
            }
          }
        })
      )

      return new Response(JSON.stringify(results, null, 2), {
        headers: { 'content-type': 'application/json' }
      })
    }

    // Trang chủ
    return new Response(`
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Uptime Monitor</title>
<style>
body{font-family:sans-serif;background:#111;color:#eee;padding:20px}
.up{color:#0f0} .down{color:#f33}
</style>
</head>
<body>
<h1>Uptime Status</h1>
<ul id="list"></ul>
<script>
fetch('/api')
  .then(r=>r.json())
  .then(d=>{
    document.getElementById('list').innerHTML = d.map(s =>
      \`<li class="\${s.status==='UP'?'up':'down'}">
        \${s.name} – \${s.status} (\${s.latency ?? '∞'} ms)
      </li>\`
    ).join('')
  })
</script>
</body>
</html>
`, {
      headers: { 'content-type': 'text/html; charset=utf-8' }
    })
  }
}
