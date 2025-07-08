import { MessageCircleWarningIcon } from "lucide-react";

type ErrorMessageProps = {
  name?: string;
  message?: string;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return;

  return (
    <div className="flex items-center gap-2 text-sm p-2 rounded-lg bg-red-100 text-red-500">
      <MessageCircleWarningIcon /> {message}
    </div>
  );
}
