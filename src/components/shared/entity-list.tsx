// components/EntityList.tsx
import React from "react";

type EntityListProps<T> = {
  title: string;
  data: T[];
  isLoading?: boolean;
  renderItem: (item: T, index: number) => React.ReactNode;
  actions?: React.ReactNode;
};

export default function EntityList<T>({
  title,
  data,
  isLoading = false,
  renderItem,
  actions,
}: EntityListProps<T>) {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        {actions}
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {data.map((item, index) => (
            <li key={index} className="border p-2 rounded">
              {renderItem(item, index)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
