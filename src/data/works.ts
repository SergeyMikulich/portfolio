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

export const works: WorkItem[] = [
  {
    id: 'work-1',
    platform: 'tiktok',
    url: 'https://www.tiktok.com/@betboomesports/video/7535409267453496583?_r=1&_t=ZS-98VJr5sJiMf',
    title: 'Boombl4 answers weird questions.',
    description: 'Fast-paced tournament recap with motion text and audience hooks.',
    tag: 'Tournament reel',
    accent: 'work-accent-red',
    highlight: 'Aired during Dacha Dubai and reposted across socials.',
    posterUrl: '/posters/poster-1.png',
  },
  {
    id: 'work-2',
    platform: 'tiktok',
    url: 'https://www.tiktok.com/@betboomesports/video/7252783591208357122?_r=1&_t=ZS-98VK47lauoe',
    title: 'BetBoom glasses on everyone',
    description: 'Cinematic vertical teaser designed for premiere day engagement.',
    tag: 'Launch teaser',
    accent: 'work-accent-gold',
    highlight: 'Built to feel premium, tense and instantly recognizable.',
    posterUrl: '/posters/poster-2.png',
  },
  {
    id: 'work-3',
    platform: 'tiktok',
    url: 'https://www.tiktok.com/@betboomesports/video/7452424982178712840?_r=1&_t=ZS-98VJvKXqYWS',
    title: 'Save- is building his perfect hero.',
    description: 'Community-first edit with punchy pacing and social proof overlays.',
    tag: 'Community content',
    accent: 'work-accent-violet',
    highlight: 'Optimized for watch time and rewatchable moments.',
    posterUrl: '/posters/poster-3.png',
  },
  {
    id: 'work-4',
    platform: 'youtube',
    url: 'https://youtube.com/shorts/geOoXZan-3c?si=9DWNK93NBCVMXBww',
    title: 'CS2 event recap',
    description: 'Aftermovie-style cut with dramatic lighting and trophy energy.',
    tag: 'Event recap',
    accent: 'work-accent-rose',
    highlight: 'Cuts tightly to the strongest on-stage and crowd moments.',
  },
];
