import { Download, PlayCircle } from "lucide-react";
import Button from "./Button";
import { useDemoAction } from "../hooks/useDemoAction";

export default function PulseCtaButton({
  buttonLabel = "Запустить демо",
  showDemoButton = true,
  previewVideoUrl,
  modalVideoUrl,
  streamUrl,
  downloadLabel,
  downloadHref,
}: {
  buttonLabel?: string;
  showDemoButton?: boolean;
  previewVideoUrl?: string;
  modalVideoUrl?: string;
  streamUrl?: string;
  downloadLabel?: string;
  downloadHref?: string;
}) {
  const openDemo = useDemoAction({ previewVideoUrl, modalVideoUrl, streamUrl });

  if (showDemoButton) {
    return (
      <div className="animate-pulse-scale">
        <Button variant="primary" icon={<PlayCircle className="h-4 w-4" />} onClick={openDemo}>
          {buttonLabel}
        </Button>
      </div>
    );
  }

  if (downloadLabel) {
    return (
      <a href={downloadHref ?? "#"} download className="animate-pulse-scale inline-block">
        <Button variant="primary" icon={<Download className="h-4 w-4" />}>
          {downloadLabel}
        </Button>
      </a>
    );
  }

  return null;
}
