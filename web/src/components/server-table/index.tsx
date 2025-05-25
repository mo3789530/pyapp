// src/components/common/Table/ServerTable.tsx
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  flexRender,
} from "@tanstack/react-table";

type ServerTableProps<T> = {
  columns: ColumnDef<T, unknown>[];
  data: T[];
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  searchQuery: string;
  onSearchQueryChange: (q: string) => void;
  sort: SortingState;
  onSortChange: (updater: SortingState) => void;
  loading?: boolean;
  onPageChange: (index: number) => void;
};

export const ServerTable = <T,>({
  columns,
  data,
  pageIndex,
  pageSize,
  pageCount,
  searchQuery,
  onSearchQueryChange,
  sort,
  loading,
  onPageChange,
}: ServerTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    manualSorting: true,
    pageCount,
    state: {
      pagination: { pageIndex, pageSize },
      sorting: sort,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      onPageChange(newState.pageIndex);
    },
  });

  return (
    <div className="p-4 space-y-4">
      {/* 検索フォーム */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchQueryChange(e.target.value)}
        placeholder="Search..."
        className="p-2 border border-gray-300 rounded-md w-full"
      />

      {/* テーブル */}
      <table className="min-w-full border border-gray-300 rounded shadow">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id}>
              {group.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 border cursor-pointer"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted() as string] ?? ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                Loading...
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ページネーション */}
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => onPageChange(pageIndex - 1)}
          disabled={pageIndex === 0}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {pageIndex + 1} of {pageCount}
        </span>
        <button
          onClick={() => onPageChange(pageIndex + 1)}
          disabled={pageIndex + 1 >= pageCount}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};
