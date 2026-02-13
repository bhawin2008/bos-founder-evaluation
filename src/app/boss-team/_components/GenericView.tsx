"use client";

import { Construction } from "lucide-react";

interface GenericViewProps {
  title: string;
  description: string;
}

export default function GenericView({ title, description }: GenericViewProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Construction size={48} className="text-gray-300 mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-sm text-gray-500 max-w-md text-center">{description}</p>
    </div>
  );
}
