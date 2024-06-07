import { Loader2 } from "lucide-react";

export default function LoadingRotate() {
  return (
    <div className="h-full flex items-center justify-center">
      <Loader2 className="h-40 w-40 animate-spin stroke-green-500" />
    </div>
  );
}
