import { useState } from "react";
import {
    useReactTable,
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
} from "@tanstack/react-table";

type TableProps<TData> = {
    columns: ColumnDef<TData, unknown>[]; // 列の定義
    data: TData[]; // 表示するデータ
};

const Table = <TData,>({ columns, data }: TableProps<TData>) => {
    const [globalFilter, setGlobalFilter] = useState(""); // フィルター用
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(), // ページネーション
        getFilteredRowModel: getFilteredRowModel(), // フィルター機能
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
    });

    return (
        <div className="p-4">
            {/* 🔼 ページネーション (上部) */}
            <div className="flex justify-between items-center mb-4">
                <button
                    className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </button>

                {/* 📌 ページ番号 */}
                <div className="flex space-x-2">
                    {Array.from({ length: table.getPageCount() }, (_, index) => (
                        <button
                            key={index}
                            className={`px-3 py-2 rounded-md ${
                                table.getState().pagination.pageIndex === index
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-300"
                            }`}
                            onClick={() => table.setPageIndex(index)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

                <button
                    className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </button>
            </div>

            {/* 🔍 フィルター */}
            <input
                type="text"
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search..."
                className="mb-4 p-2 border border-gray-300 rounded-md w-full"
            />

            {/* 📌 テーブル本体 */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg shadow-sm">
                    {/* ヘッダー */}
                    <thead className="bg-gray-200">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="px-4 py-2 border border-gray-300 text-left">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>

                    {/* ボディ */}
                    <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-100">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="px-4 py-2 border border-gray-300">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
