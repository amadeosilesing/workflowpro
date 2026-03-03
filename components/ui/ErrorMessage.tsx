interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg">
      <p className="text-red-400 text-sm">{message}</p>
    </div>
  );
}