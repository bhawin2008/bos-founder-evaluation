import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl border border-border p-6 sm:p-8 ${
        hover ? "hover:shadow-lg hover:border-accent/20 transition-all duration-300" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
