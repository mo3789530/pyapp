import Table from "../../components/table";
import { ColumnDef } from "@tanstack/react-table";

// データ型
type User = {
    id: number;
    name: string;
    age: number;
    email: string;
};

// ダミーデータ
const userData: User[] = [
    { id: 1, name: "Alice", age: 25, email: "alice@example.com" },
    { id: 2, name: "Bob", age: 30, email: "bob@example.com" },
    { id: 3, name: "Charlie", age: 28, email: "charlie@example.com" },
    { id: 4, name: "David", age: 35, email: "david@example.com" },
    { id: 5, name: "Emma", age: 27, email: "emma@example.com" },
    { id: 6, name: "Frank", age: 40, email: "frank@example.com" },
    { id: 7, name: "Grace", age: 23, email: "grace@example.com" },
    { id: 8, name: "Henry", age: 33, email: "henry@example.com" },
    { id: 9, name: "Isabella", age: 26, email: "isabella@example.com" },
    { id: 10, name: "Jack", age: 29, email: "jack@example.com" },
];

// 列定義

const columns: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "age",
        header: "Age",
        cell: (info) => `${info.getValue()} years old`,
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: (info) => (
            <a href={`mailto:${info.getValue()}`} className="text-blue-500 hover:underline">
                {info.getValue() as string}
            </a>
        ),
    },
];

const TablePage = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">User Table</h1>
            <Table columns={columns} data={userData} />
        </div>
    );
};

export default TablePage;
