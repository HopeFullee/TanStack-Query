import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

type DataType = {
  id: string;
  title: string;
};

export const TodoList = () => {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["todoList"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/posts");
      return await res.json();
    },
  });

  const addPost = async (post: DataType) => {
    const res = await axios.post("http://localhost:3000/posts", post);
    return res.data;
  };

  const deletePost = async (postId: string) => {
    const res = await axios.delete("http://localhost:3000/posts/" + postId);
    return res.data;
  };

  const { mutate: postMutate, isPending } = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      alert("등록 완료!");
      queryClient.invalidateQueries({ queryKey: ["todoList"] });
    },
    onError: (err) => {
      alert(err);
    },
    onSettled: () => {
      setTitle("");
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      alert("삭제 완료!");
      queryClient.invalidateQueries({ queryKey: ["todoList"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postMutate({
      id: uuidv4(),
      title,
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
        {data?.map(({ id, title }: DataType) => (
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
