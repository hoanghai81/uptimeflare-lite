export const config = { runtime: 'edge' }

export default async function handler(req) {
  const url = new URL(req.url)

  // API uptime
  if (url.pathname === '/api') {
    return fetch('https://YOUR_WORKER_DOMAIN/api')
  }

  // Trang web
  return fetch('https://raw.githubusercontent.com/USERNAME/REPO/main/index.html')
}
