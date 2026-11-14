/**
 * Host half of the rain ocean skin.
 *
 * Serves the looping 1080p clip (with byte-range support so the browser can
 * stream/loop it) plus the tiny page under /rain-ocean. Nothing here touches
 * the Harness checkout; the route disappears with the plugin.
 */
import { createReadStream } from 'node:fs'
import { readFile, stat } from 'node:fs/promises'
import { extname, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

export const name = 'rain-ocean-skin'
export const inject = ['webServer']

const ROUTE = '/rain-ocean'
const ASSET_ROOT = resolve(fileURLToPath(new URL('./native-dist/', import.meta.url)))
const MIME = Object.freeze({
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
})

function finish(res, status, headers = {}) {
  res.writeHead(status, {
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
    ...headers,
  })
  res.end()
}

function parseRange(header, size) {
  if (!header) return null
  const match = /^bytes=(\d*)-(\d*)$/.exec(String(header).trim())
  if (!match) return null
  const start = match[1] === '' ? size - Number(match[2]) : Number(match[1])
  const end = match[1] === '' || match[2] === '' ? size - 1 : Number(match[2])
  if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || end < start || start >= size) {
    return 'invalid'
  }
  return { start, end: Math.min(end, size - 1) }
}

async function serveAsset(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    finish(res, 405, { allow: 'GET, HEAD' })
    return
  }

  let pathname
  try {
    pathname = decodeURIComponent(new URL(req.url ?? ROUTE, 'http://dsh.local').pathname)
  } catch {
    finish(res, 400)
    return
  }

  const suffix = pathname === ROUTE || pathname === `${ROUTE}/`
    ? 'skin.html'
    : pathname.slice(`${ROUTE}/`.length)
  const target = resolve(ASSET_ROOT, suffix)
  if (target !== ASSET_ROOT && !target.startsWith(`${ASSET_ROOT}${sep}`)) {
    finish(res, 403)
    return
  }

  try {
    const info = await stat(target)
    const type = MIME[extname(target)] ?? 'application/octet-stream'
    const range = parseRange(req.headers.range, info.size)

    if (range === 'invalid') {
      finish(res, 416, { 'content-range': `bytes */${info.size}` })
      return
    }

    if (range) {
      res.writeHead(206, {
        'cache-control': 'public, max-age=3600',
        'content-length': String(range.end - range.start + 1),
        'content-range': `bytes ${range.start}-${range.end}/${info.size}`,
        'content-type': type,
        'accept-ranges': 'bytes',
        'x-content-type-options': 'nosniff',
      })
      if (req.method === 'HEAD') res.end()
      else createReadStream(target, { start: range.start, end: range.end }).pipe(res)
      return
    }

    res.writeHead(200, {
      'cache-control': 'public, max-age=3600',
      'content-length': String(info.size),
      'content-type': type,
      'accept-ranges': 'bytes',
      'x-content-type-options': 'nosniff',
    })
    if (req.method === 'HEAD') {
      res.end()
      return
    }
    createReadStream(target).pipe(res)
  } catch (error) {
    if (error instanceof Error && 'code' in error
      && (error.code === 'ENOENT' || error.code === 'EISDIR')) {
      finish(res, 404)
      return
    }
    throw error
  }
}

export function apply(ctx) {
  ctx.effect(() => ctx.webServer.register({
    kind: 'prefix',
    path: ROUTE,
    handler: serveAsset,
  }), 'rain-ocean-skin: static video route')
}
