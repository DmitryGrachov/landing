export const DEMO_VIDEO_URL = "https://rutube.ru/video/230659ccc9a1d93c482bfd667e1ba8ee/?playlist=505201";

export function toRutubeEmbedUrl(url: string, autoplay = false) {
  const id = url.match(/rutube\.ru\/(?:video|play\/embed|shorts)\/([a-zA-Z0-9]+)/)?.[1];
  if (!id) return url;
  return `https://rutube.ru/play/embed/${id}${autoplay ? "?autoplay=1" : ""}`;
}
