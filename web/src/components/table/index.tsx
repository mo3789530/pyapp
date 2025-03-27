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

const Table = <TData extends { id: string | number },>({ columns, data }: TableProps<TData>) => {
    const [globalFilter, setGlobalFilter] = useState(""); // フィルター用
    const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set()); // 選択した行のID

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

    // 🔼 すべて選択 or 解除
    const toggleAllRows = () => {
        if (selectedRows.size === data.length) {
            setSelectedRows(new Set());
        } else {
            setSelectedRows(new Set(data.map((row) => row.id)));
        }
    };

    // ✅ 行の選択・解除
    const toggleRow = (id: string | number) => {
        const newSelectedRows = new Set(selectedRows);
        if (newSelectedRows.has(id)) {
            newSelectedRows.delete(id);
        } else {
            newSelectedRows.add(id);
        }
        setSelectedRows(newSelectedRows);
    };

    return (
        <div className="p-4">
            {/* 🔍 サーチ & ページネーション（横並び） */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                {/* 🔍 フィルター */}
                <input
                    type="text"
                    value={globalFilter ?? ""}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search..."
                    className="p-2 border border-gray-300 rounded-md w-64"
                />

                {/* 📌 ページネーション */}
                <div className="flex items-center space-x-2">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </button>

                    {Array.from({ length: table.getPageCount() }, (_, index) => (
                        <button
                            key={index}
                            className={`px-3 py-2 rounded-md ${
                                table.getState().pagination.pageIndex === index
                                    ? "bg-gray-500 text-white"
                                    : "bg-gray-300"
                            }`}
                            onClick={() => table.setPageIndex(index)}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* 📌 テーブル本体 */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg shadow-sm">
                    {/* ヘッダー */}
                    <thead className="bg-gray-200">
                        <tr>
                            {/* ✅ チェックボックス (全選択) */}
                            <th className="px-4 py-2 border border-gray-300">
                                <input
                                    type="checkbox"
                                    checked={selectedRows.size === data.length}
                                    onChange={toggleAllRows}
                                />
                            </th>
                            {table.getHeaderGroups().map((headerGroup) =>
                                headerGroup.headers.map((header) => (
                                    <th key={header.id} className="px-4 py-2 border border-gray-300 text-left">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))
                            )}
                        </tr>
                    </thead>

                    {/* ボディ */}
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className={`hover:bg-gray-100 ${
                                    selectedRows.has(row.original.id) ? "bg-gray-300" : ""
                                }`}
                            >
                                {/* ✅ チェックボックス (各行) */}
                                <td className="px-4 py-2 border border-gray-300">
                                    <input className="cursor-pointer justify-center"
                                        type="checkbox"
                                        checked={selectedRows.has(row.original.id)}
                                        onChange={() => toggleRow(row.original.id)}
                                    />
                                </td>
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

            {/* 📢 選択済みデータの表示 */}
            {selectedRows.size > 0 && (
                <div className="mt-4 p-2 bg-gray-200 rounded-md">
                    <p className="font-semibold">Selected Rows:</p>
                    <p>{Array.from(selectedRows).join(", ")}</p>
                </div>
            )}
        </div>
    );
};

export default Table;
