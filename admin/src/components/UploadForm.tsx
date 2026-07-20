import { useState } from "react";
import type { FormEvent } from "react";
import type { Category } from "../types";

export default function UploadForm({
  categories,
  uploading,
  onUpload,
}: {
  categories: Category[];
  uploading: boolean;
  onUpload: (input: { file: File; category: string; group?: string; sortOrder?: number }) => Promise<void>;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState(categories[0]?.slug ?? "");
  const [group, setGroup] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!file || !category) return;

    await onUpload({
      file,
      category,
      group: group.trim() || undefined,
      sortOrder: sortOrder.trim() ? Number(sortOrder) : undefined,
    });

    setFile(null);
    setGroup("");
    setSortOrder("");
    const input = document.getElementById("admin-file-input") as HTMLInputElement | null;
    if (input) input.value = "";
  }

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="admin-file-input">Файл</label>
        <input
          id="admin-file-input"
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="admin-category">Категория</label>
        <select id="admin-category" value={category} onChange={(e) => setCategory(e.target.value)} required>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name} ({c.slug})
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="admin-group">Группа (необязательно)</label>
        <input
          id="admin-group"
          type="text"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          placeholder="works-1"
        />
      </div>

      <div className="field">
        <label htmlFor="admin-sort-order">Порядок (необязательно)</label>
        <input
          id="admin-sort-order"
          type="number"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          placeholder="авто"
        />
      </div>

      <button type="submit" className="btn-primary" disabled={uploading || !file || !category}>
        {uploading ? "Загрузка…" : "Загрузить"}
      </button>
    </form>
  );
}
