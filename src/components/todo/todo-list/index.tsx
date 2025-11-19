import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type DataType = {
  id: number;
  title: string;
};

export const TodoList = () => {
  const [id, setId] = useState(0);

  const { data, isFetching, isPending } = useQuery({
    queryKey: ["todoList"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      return await res.json();
    },
  });

  const { data: detailData } = useQuery({
    queryKey: ["todoList", id],
    queryFn: async () => {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos/" + id
      );
      return await res.json();
    },
    enabled: id > 0,
    staleTime: 5000,
    gcTime: 6000,
  });

  return (
    <>
      <p>Is Pending: {isPending ? "로딩중..." : "완료"}</p>
      <p>Is Fetching: {isFetching ? "로딩중..." : "완료"}</p>
      <div>{JSON.stringify(detailData)}</div>
      <ul>
        {data?.map(({ id, title }: DataType) => (
          <li key={id} onClick={() => setId(id)}>
            {id} {title}
          </li>
        ))}
      </ul>
    </>
  );
};
