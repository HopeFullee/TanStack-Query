import { useQuery } from "@tanstack/react-query";

type DataType = {
  id: number;
  title: string;
};

export const TodoList = () => {
  const { data } = useQuery({
    queryKey: ["todoList"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      return await res.json();
    },
  });

  console.log(data);

  return (
    <ul>
      {data && data.map(({ id, title }: DataType) => <li key={id}>{title}</li>)}
    </ul>
  );
};
