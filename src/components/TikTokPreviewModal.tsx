import { ExternalLink, X } from 'lucide-react';
import { getEmbedUrl } from '../lib/media';
import type { WorkItem } from '../lib/work-types';

type TikTokPreviewModalProps = {
  work: WorkItem | null;
  onClose: () => void;
};

function TikTokPreviewModal({ work, onClose }: TikTokPreviewModalProps) {
  if (!work) return null;

  const embedUrl = getEmbedUrl(work.platform, work.url);

  return (
    <div className="tiktok-modal" role="dialog" aria-modal="true" aria-label={work.title}>
      <button
        className="tiktok-modal-backdrop"
        type="button"
        aria-label="Close preview"
        onClick={onClose}
      />
      <div className="tiktok-modal-panel">
        <div className="tiktok-modal-head">
          <div>
            <p className="eyebrow">{work.platform === 'tiktok' ? 'TikTok preview' : 'Shorts preview'}</p>
            <h4>{work.title}</h4>
          </div>
          <button
            className="tiktok-modal-close"
            type="button"
            aria-label="Close preview"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>
        <div className="tiktok-modal-body">
          {embedUrl ? (
            <iframe
              title={work.title}
              src={embedUrl}
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <div className="tiktok-modal-fallback">
              <p>Не удалось собрать embed для этой ссылки.</p>
              <a href={work.url} target="_blank" rel="noreferrer">
                Open source
                <ExternalLink size={16} />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TikTokPreviewModal;
