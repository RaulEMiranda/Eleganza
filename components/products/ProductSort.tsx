// components/products/ProductSort.tsx
"use client";

import { SORT_OPTIONS } from "@/constants";
import Select from "@/components/ui/Select";

interface ProductSortProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ProductSort({ value, onChange }: ProductSortProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600 whitespace-nowrap">
        Ordenar por:
      </span>
      <Select
        options={SORT_OPTIONS.map((option) => ({
          value: option.value,
          label: option.label,
        }))}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-[200]"
      />
    </div>
  );
}
