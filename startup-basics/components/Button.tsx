import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
  external?: boolean;
}

const variants = {
  primary: "bg-accent text-white hover:bg-accent-light",
  secondary: "bg-primary text-white hover:bg-primary-light",
  outline: "border-2 border-accent text-accent hover:bg-accent hover:text-white",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  href,
  variant = "primary",
  size = "md",
  children,
  className = "",
  external = false,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center font-semibold rounded-xl transition-colors duration-200 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
}
