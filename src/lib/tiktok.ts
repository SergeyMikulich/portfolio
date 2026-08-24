export type TikTokOEmbed = {
  title?: string;
  author_name?: string;
  author_url?: string;
  thumbnail_url?: string;
  html?: string;
};

export function extractTikTokVideoId(url: string) {
  const match = url.match(/\/video\/(\d+)/);
  return match?.[1] ?? null;
}

export function getTikTokEmbedUrl(url: string) {
  const videoId = extractTikTokVideoId(url);
  if (!videoId) return null;
  return `https://www.tiktok.com/player/v1/${videoId}`;
}

export async function fetchTikTokOEmbed(url: string): Promise<TikTokOEmbed | null> {
  try {
    const response = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`);
    if (!response.ok) return null;
    return (await response.json()) as TikTokOEmbed;
  } catch {
    return null;
  }
}
