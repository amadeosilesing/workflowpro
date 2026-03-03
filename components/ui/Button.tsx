interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const variants = {
    primary:   "bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white",
    secondary: "bg-gray-800 hover:bg-gray-700 text-gray-300",
    danger:    "bg-red-600/10 hover:bg-red-600/20 text-red-400",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition disabled:cursor-not-allowed
        ${variants[variant]} ${fullWidth ? "w-full" : ""}`}
    >
      {children}
    </button>
  );
}