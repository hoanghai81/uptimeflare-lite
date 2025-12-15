export const config = { runtime: 'edge' }

export default async function handler(req) {
  const url = new URL(req.url)

  if (url.pathname === '/api') {
    const res = await fetch('https://YOUR_WORKER_DOMAIN/api')
    return new Response(await res.text(), {
      headers: { 'content-type': 'application/json' }
    })
  }

  // Serve index.html
  return fetch('https://raw.githubusercontent.com/USERNAME/REPO/main/index.html')
}
