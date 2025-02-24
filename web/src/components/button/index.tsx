import React from "react";
import clsx from "clsx";

type ButtonProps = {
  variant?: "primary" | "secondary" | "danger" | "outline"; // ボタンの種類
  size?: "sm" | "md" | "lg"; // ボタンサイズ
  disabled?: boolean; // 無効状態
  children: React.ReactNode; // ボタン内のテキストやアイコン
  onClick?: () => void; // クリックイベント
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  disabled = false,
  children,
  onClick,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg focus:outline-none transition duration-200";

  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-500 text-gray-700 hover:bg-gray-100",
  };

  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
