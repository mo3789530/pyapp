import { useEffect, useState } from "react";

// データ型
export type User = {
    id: number;
    name: string;
    age: number;
    email: string;
};
 

const userData: User[] = Array.from({ length: 100 }, (_, i) => {
  const id = i + 1;
  return {
    id,
    name: `User${id}`,
    age: 20 + (id % 30), // 年齢は20〜49の範囲
    email: `user${id}@example.com`,
  };
});

type UseMockApiOptions = {
  query?: string;
  pagination?: { limit: number; skip: number };
  sort?: { field: keyof User; order: "asc" | "desc" };
};

export function useMockApi({
  query = "",
  pagination = { limit: 10, skip: 0 },
  sort = { field: "id", order: "desc" },
}: UseMockApiOptions = {}) {
  const [data, setData] = useState<User[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      let filtered = userData;

      // フィルター
      if (query) {
        const q = query.toLowerCase();
        filtered = filtered.filter(
          (user) =>
            user.name.toLowerCase().includes(q) ||
            user.email.toLowerCase().includes(q)
        );
      }

      // ソート
      filtered = [...filtered].sort((a, b) => {
        const aValue = a[sort.field];
        const bValue = b[sort.field];
        if (aValue < bValue) return sort.order === "asc" ? -1 : 1;
        if (aValue > bValue) return sort.order === "asc" ? 1 : -1;
        return 0;
      });

      // カウント
      const total = filtered.length;

      // ページネーション
      const paginated = filtered.slice(
        pagination.skip,
        pagination.skip + pagination.limit
      );

      setData(paginated);
      setCount(total);
      setLoading(false);
    }, 500); // 模擬遅延
  }, [query, pagination, sort]);

  return [data, count, loading] as const;
}
