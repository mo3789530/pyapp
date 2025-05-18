import { useState } from "react";
import { useMockApi, User } from "./mock";
import { ServerTable } from "../../components/server-table";
import { ColumnDef, SortingState } from "@tanstack/react-table";

const columns: ColumnDef<User>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "age", header: "Age" },
  { accessorKey: "email", header: "Email" },
];

const UserListPage = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const pageSize = 10;

//   const sortParam = sorting[0]
//     ? { field: sorting[0].id as keyof User, order: sorting[0].desc ? "desc" : "asc" }
//     : { field: "id" as keyof User, order: "asc" };

  const [data, count, loading] = useMockApi({
    query,
    pagination: { skip: pageIndex * pageSize, limit: pageSize },
  });
  console.log(data)

  return (
    <ServerTable<User>
      columns={columns}
      data={data}
      pageIndex={pageIndex}
      pageSize={pageSize}
      pageCount={Math.ceil(count / pageSize)}
      searchQuery={query}
      onSearchQueryChange={(q) => {
        setQuery(q);
        setPageIndex(0); // 検索時に先頭ページに戻す
      }}
      sort={sorting}
      onSortChange={setSorting}
      loading={loading}
      onPageChange={setPageIndex}
    />
  );
};

export default UserListPage;
