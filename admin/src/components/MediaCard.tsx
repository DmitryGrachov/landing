import type { Media } from "../types";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MediaCard({
  media,
  onDelete,
  deleting,
}: {
  media: Media;
  onDelete: (id: string) => void;
  deleting: boolean;
}) {
  return (
    <div className="media-card">
      {media.type === "VIDEO" ? (
        <video className="media-thumb" src={media.url} muted controls={false} />
      ) : (
        <img className="media-thumb" src={media.url} alt={media.originalName ?? ""} loading="lazy" />
      )}
      <div className="media-meta">
        <span className="name" title={media.originalName ?? undefined}>
          {media.originalName ?? media.id}
        </span>
        <span>
          {media.type === "VIDEO" ? "видео" : "фото"} · {formatSize(media.size)}
          {media.group ? ` · ${media.group}` : ""}
        </span>
        <span>#{media.sortOrder}</span>
        <button
          type="button"
          className="btn-danger"
          disabled={deleting}
          onClick={() => onDelete(media.id)}
        >
          {deleting ? "Удаление…" : "Удалить"}
        </button>
      </div>
    </div>
  );
}
