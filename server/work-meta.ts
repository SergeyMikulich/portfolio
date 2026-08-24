import type { IncomingMessage, ServerResponse } from 'node:http';

export type WorkPlatform = 'tiktok' | 'youtube';

export type WorkSource = {
  id: string;
  platform: WorkPlatform;
  url: string;
  title: string;
  description: string;
  tag: string;
  accent: string;
  highlight: string;
};

export type WorkMetadata = {
  url: string;
  platform: WorkPlatform;
  title: string;
  authorName: string | null;
  thumbnailUrl: string | null;
  likeCount: string | null;
  viewCount: string | null;
  embedUrl: string | null;
  sourceAvailable: boolean;
};

type CacheEntry = {
  expiresAt: number;
  value: WorkMetadata;
};

const cache = new Map<string, CacheEntry>();
const cacheTtlMs = 5 * 60 * 1000;

function formatCount(value: unknown) {
  const numberValue = typeof value === 'string' ? Number(value) : value;
  if (typeof numberValue !== 'number' || Number.isNaN(numberValue)) {
    return null;
  }

  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: numberValue >= 1_000_000 ? 1 : 0,
  }).format(numberValue);
}

function parseTikTokVideoId(url: string) {
  return url.match(/\/video\/(\d+)/)?.[1] ?? null;
}

function parseYouTubeVideoId(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) {
      return parsed.pathname.split('/').filter(Boolean)[0] ?? null;
    }

    if (parsed.pathname.includes('/shorts/')) {
      return parsed.pathname.split('/shorts/')[1]?.split('/')[0] ?? null;
    }

    return parsed.searchParams.get('v');
  } catch {
    return null;
  }
}

function detectPlatform(url: string): WorkPlatform | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('tiktok.com')) {
      return 'tiktok';
    }

    if (
      parsed.hostname.includes('youtube.com') ||
      parsed.hostname.includes('youtu.be')
    ) {
      return 'youtube';
    }
  } catch {
    return null;
  }

  return null;
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T | null> {
  try {
    const response = await fetch(url, init);
    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

async function fetchTikTokMetadata(url: string): Promise<WorkMetadata> {
  const videoId = parseTikTokVideoId(url);
  const oEmbed = await fetchJson<{
    title?: string;
    author_name?: string;
    thumbnail_url?: string;
    html?: string;
  }>(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`);

  let likeCount: string | null = null;
  let viewCount: string | null = null;
  let embedUrl: string | null = videoId ? `https://www.tiktok.com/player/v1/${videoId}` : null;

  if (videoId && process.env.TIKTOK_ACCESS_TOKEN) {
    const response = await fetchJson<{
      data?: { videos?: Array<{ like_count?: number; view_count?: number; embed_link?: string; cover_image_url?: string }> };
    }>('https://open.tiktokapis.com/v2/video/query/?fields=id,title,cover_image_url,embed_link,like_count,view_count', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.TIKTOK_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filters: { video_ids: [videoId] } }),
    });

    const video = response?.data?.videos?.[0];
    likeCount = formatCount(video?.like_count);
    viewCount = formatCount(video?.view_count);
    embedUrl = video?.embed_link ?? embedUrl;

    return {
      url,
      platform: 'tiktok',
      title: oEmbed?.title ?? 'TikTok video',
      authorName: oEmbed?.author_name ?? null,
      thumbnailUrl: video?.cover_image_url ?? oEmbed?.thumbnail_url ?? null,
      likeCount,
      viewCount,
      embedUrl,
      sourceAvailable: Boolean(video),
    };
  }

  return {
    url,
    platform: 'tiktok',
    title: oEmbed?.title ?? 'TikTok video',
    authorName: oEmbed?.author_name ?? null,
    thumbnailUrl: oEmbed?.thumbnail_url ?? null,
    likeCount,
    viewCount,
    embedUrl,
    sourceAvailable: Boolean(oEmbed),
  };
}

async function fetchYouTubeMetadata(url: string): Promise<WorkMetadata> {
  const videoId = parseYouTubeVideoId(url);
  const oEmbed = await fetchJson<{
    title?: string;
    author_name?: string;
    thumbnail_url?: string;
    html?: string;
  }>(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`);

  let likeCount: string | null = null;
  let viewCount: string | null = null;
  let embedUrl: string | null = videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1` : null;

  if (videoId && process.env.YOUTUBE_API_KEY) {
    const response = await fetchJson<{
      items?: Array<{
        snippet?: {
          title?: string;
          thumbnails?: {
            maxres?: { url?: string };
            standard?: { url?: string };
            high?: { url?: string };
            medium?: { url?: string };
          };
        };
        statistics?: {
          likeCount?: string;
          viewCount?: string;
        };
        player?: {
          embedHtml?: string;
        };
      }>;
    }>(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,player&id=${encodeURIComponent(videoId)}&key=${encodeURIComponent(process.env.YOUTUBE_API_KEY)}`,
    );

    const video = response?.items?.[0];
    const thumbnails = video?.snippet?.thumbnails;
    likeCount = formatCount(video?.statistics?.likeCount);
    viewCount = formatCount(video?.statistics?.viewCount);
    embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1` : embedUrl;

    return {
      url,
      platform: 'youtube',
      title: video?.snippet?.title ?? oEmbed?.title ?? 'YouTube Short',
      authorName: oEmbed?.author_name ?? null,
      thumbnailUrl:
        thumbnails?.maxres?.url ??
        thumbnails?.standard?.url ??
        thumbnails?.high?.url ??
        thumbnails?.medium?.url ??
        oEmbed?.thumbnail_url ??
        null,
      likeCount,
      viewCount,
      embedUrl,
      sourceAvailable: Boolean(video),
    };
  }

  return {
    url,
    platform: 'youtube',
    title: oEmbed?.title ?? 'YouTube Short',
    authorName: oEmbed?.author_name ?? null,
    thumbnailUrl: oEmbed?.thumbnail_url ?? null,
    likeCount,
    viewCount,
    embedUrl,
    sourceAvailable: Boolean(oEmbed),
  };
}

async function getMetadataForUrl(url: string): Promise<WorkMetadata | null> {
  const cached = cache.get(url);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.value;
  }

  const platform = detectPlatform(url);
  if (!platform) {
    return null;
  }

  const value =
    platform === 'tiktok' ? await fetchTikTokMetadata(url) : await fetchYouTubeMetadata(url);

  cache.set(url, { value, expiresAt: Date.now() + cacheTtlMs });
  return value;
}

export async function handleWorkMetadataRequest(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  const rawBody = await new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });

  let parsed: { urls?: string[] };
  try {
    parsed = JSON.parse(rawBody) as { urls?: string[] };
  } catch {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Invalid JSON body' }));
    return;
  }

  const urls = Array.isArray(parsed.urls) ? parsed.urls.filter(Boolean) : [];
  const uniqueUrls = [...new Set(urls)];
  const results = await Promise.all(uniqueUrls.map(async (url) => [url, await getMetadataForUrl(url)] as const));

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      items: Object.fromEntries(results),
    }),
  );
}
