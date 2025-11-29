import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@/api";

interface Props {
  clearInput: () => void;
}

export const useTodoPost = ({ clearInput }: Props) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoData: Todo) => API.todoService.todoPost(todoData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todoList"] });
      clearInput();
    },
  });
};
