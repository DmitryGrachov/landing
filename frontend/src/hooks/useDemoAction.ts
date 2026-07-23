import { useVideoModal } from "../components/VideoModal";
import { useStreamModal } from "../components/StreamModal";

export function useDemoAction({
  previewVideoUrl,
  modalVideoUrl,
  streamUrl,
}: {
  previewVideoUrl?: string;
  modalVideoUrl?: string;
  streamUrl?: string;
}) {
  const { openVideoModal } = useVideoModal();
  const { openStreamModal } = useStreamModal();
  const videoForModal = modalVideoUrl ?? previewVideoUrl;
  return () => (streamUrl ? openStreamModal(streamUrl) : openVideoModal(videoForModal));
}
