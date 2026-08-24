import type { WorkPlatform } from './work-types';

function extractTikTokVideoId(url: string) {
  return url.match(/\/video\/(\d+)/)?.[1] ?? null;
}

export function extractYouTubeVideoId(url: string) {
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

export function getEmbedUrl(platform: WorkPlatform, url: string) {
  if (platform === 'tiktok') {
    const videoId = extractTikTokVideoId(url);
    return videoId ? `https://www.tiktok.com/player/v1/${videoId}` : null;
  }

  const videoId = extractYouTubeVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1` : null;
}

export function getFallbackThumbnailUrl(platform: WorkPlatform, url: string) {
  if (platform === 'youtube') {
    const videoId = extractYouTubeVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
  }

  return null;
}

export function getPlatformLabel(platform: WorkPlatform) {
  return platform === 'tiktok' ? 'TikTok' : 'YouTube Shorts';
}
