import { useQuery } from "@tanstack/react-query";

type DataType = {
  id: number;
  title: string;
};

export const TodoList = () => {
  const { data, isFetching, isPending, refetch, isError, error } = useQuery({
    queryKey: ["todoList"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicodexx.com/todos");
      return await res.json();
    },
    retry: 3,
    retryDelay: 1000,
  });

  if (isError) {
    return "에러발생: " + error.message;
  }

  return (
    <>
      <p>Is Pending: {isPending ? "로딩중..." : "완료"}</p>
      <p>Is Fetching: {isFetching ? "로딩중..." : "완료"}</p>
      <button onClick={() => refetch()}>refetch</button>
      <ul>
        {data &&
          data?.map(({ id, title }: DataType) => <li key={id}>{title}</li>)}
      </ul>
    </>
  );
};
