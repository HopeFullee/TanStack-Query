import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type DataType = {
  id: number;
  title: string;
};

export const TodoList = () => {
  const [enableQuery, setEnableQuery] = useState(false);

  const { data, isFetching, isPending, refetch, isError, error } = useQuery({
    queryKey: ["todoList"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicodexx.com/todos");
      return await res.json();
    },
    retry: 3,
    // retryDelay: 1000,
    // enabled: enableQuery,
    // refetchInterval: 3000,
    // refetchOnWindowFocus: true,
    staleTime: 3000,
  });

  if (isError) {
    return "에러발생: " + error.message;
  }

  return (
    <>
      <p>Is Pending: {isPending ? "로딩중..." : "완료"}</p>
      <p>Is Fetching: {isFetching ? "로딩중..." : "완료"}</p>
      <button className="p-1 border-1" onClick={() => setEnableQuery(true)}>
        show list
      </button>
      <button className="p-1 border-1" onClick={() => refetch()}>
        refetch
      </button>
      <ul>
        {data &&
          data?.map(({ id, title }: DataType) => <li key={id}>{title}</li>)}
      </ul>
    </>
  );
};
