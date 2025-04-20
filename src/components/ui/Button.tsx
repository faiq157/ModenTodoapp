import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
  children: React.ReactNode;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      children,
      fullWidth = false,
      isLoading = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 rounded-md";

    const variantClasses = {
      primary: "bg-primary text-white hover:bg-primary-light",
      secondary: "bg-secondary text-white hover:bg-secondary-light",
      outline: "border border-border text-foreground bg-transparent hover:bg-surface",
      danger: "bg-error text-white hover:bg-error/90",
      ghost: "text-foreground hover:bg-surface",
    };

    const sizeClasses = {
      sm: "text-xs px-2 py-1",
      md: "text-sm px-4 py-2",
      lg: "text-base px-6 py-3",
      icon: "p-2",
    };

    const widthClass = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className} ${
          isLoading ? "opacity-70 cursor-not-allowed" : ""
        }`}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;