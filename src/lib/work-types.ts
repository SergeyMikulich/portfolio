export type WorkPlatform = 'tiktok' | 'youtube';

export type WorkItem = {
  id: string;
  platform: WorkPlatform;
  url: string;
  posterUrl?: string;
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
