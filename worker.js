export default {
  async fetch(req) {
    const url = new URL(req.url)

    if (url.pathname === '/api') {
      const sites = await fetch('https://raw.githubusercontent.com/USERNAME/REPO/main/sites.json').then(r => r.json())

      const results = await Promise.all(sites.map(async site => {
        const start = Date.now()
        try {
          const r = await fetch(site.url, { method: 'HEAD', redirect: 'follow' })
          return { name: site.name, url: site.url, status: r.ok ? 'UP' : 'DOWN', latency: Date.now() - start }
        } catch {
          return { name: site.name, url: site.url, status: 'DOWN', latency: null }
        }
      }))

      return new Response(JSON.stringify(results, null, 2), { headers: { 'content-type': 'application/json' } })
    }

    return fetch('https://raw.githubusercontent.com/USERNAME/REPO/main/index.html')
  }
}
