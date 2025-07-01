// components/layouts/ListPage.tsx
import React from "react";
import { Link } from "react-router-dom";

type ListPageProps<T> = {
  title: string;
  data: T[];
  columns: string[];
  buttonLabel?: string;
  buttonUrl?: string;
  isLoading?: boolean;

  renderRow: (item: T, index: number) => React.ReactNode;
  onClickButton?: () => void;
};

export default function ListPage<T>({
  title,
  buttonLabel,
  buttonUrl,
  data,
  columns,
  renderRow,
  isLoading = false,
}: ListPageProps<T>) {
  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">{title}</h1>
        {buttonLabel && buttonUrl && (
          <Link to={buttonUrl}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              {buttonLabel}
            </button>
          </Link>
        )}
      </div>

      {/* Optional: show loading */}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm">
                {columns.map((col, i) => (
                  <th key={i} className="px-4 py-2 border-b">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => renderRow(item, index))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-center p-4">
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
