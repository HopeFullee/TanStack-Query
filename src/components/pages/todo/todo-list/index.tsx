import { useState, type FormEvent } from "react";
import { useTodoList, useTodoPost, useDeleteTodo } from "@/hooks/todo";
import { v4 as uuidv4 } from "uuid";

type PostType = {
  id: string;
  title: string;
  page: number;
};

export const TodoList = () => {
  const [title, setTitle] = useState("");

  const { data: todos } = useTodoList();
  const { mutate: postMutate, isPending } = useTodoPost({
    clearInput: () => setTitle(""),
  });
  const { mutate: deleteMutate } = useDeleteTodo();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postMutate({
      id: uuidv4(),
      title,
      page: 2,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          className="border p-1"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="border p-1" disabled={isPending}>
          등록
        </button>
        {isPending ? "등록중...." : null}
      </form>

      <ul>
        {todos?.map(({ id, title }: PostType) => (
          <li key={id}>
            {title}
            <button
              className="border p-0.5"
              onClick={() => {
                deleteMutate(id);
              }}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
