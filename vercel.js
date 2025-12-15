export const config = { runtime: 'edge' }

export default async function handler(req) {
  const res = await fetch('https://YOUR_WORKER_DOMAIN/api')
  return new Response(await res.text(), { headers: { 'content-type': 'application/json' } })
}
