import { useCallback, useEffect, useState } from "react";
import { deleteMedia, fetchCategories, fetchMedia, uploadMedia } from "./api";
import MediaCard from "./components/MediaCard";
import UploadForm from "./components/UploadForm";
import type { Category, Media } from "./types";

export default function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    const [cats, items] = await Promise.all([fetchCategories(), fetchMedia()]);
    setCategories(cats);
    setMedia(items);
  }, []);

  useEffect(() => {
    load()
      .catch((err: unknown) => setError(err instanceof Error ? err.message : String(err)))
      .finally(() => setLoading(false));
  }, [load]);

  async function handleUpload(input: { file: File; category: string; sortOrder?: number }) {
    setUploading(true);
    setError(null);
    try {
      await uploadMedia(input);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Удалить этот файл безвозвратно?")) return;

    setDeletingId(id);
    setError(null);
    try {
      await deleteMedia(id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <div className="app">
        <p>Загрузка…</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Галерея — админка</h1>
        <p>Просмотр, загрузка и удаление фото/видео для страницы /gallery</p>
      </header>

      {error && <div className="error-banner">{error}</div>}

      <section className="panel">
        <h2>Загрузить файл</h2>
        <UploadForm categories={categories} uploading={uploading} onUpload={handleUpload} />
      </section>

      {categories.map((cat) => {
        const items = media.filter((m) => m.category === cat.slug);
        return (
          <section key={cat.id} className="category-section">
            <h2>
              {cat.name} <span className="category-count">({items.length})</span>
            </h2>
            {items.length === 0 ? (
              <p className="empty-state">Пока нет файлов в этой категории.</p>
            ) : (
              <div className="media-grid">
                {items.map((m) => (
                  <MediaCard key={m.id} media={m} onDelete={handleDelete} deleting={deletingId === m.id} />
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
