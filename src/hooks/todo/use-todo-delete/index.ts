import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@/api";

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoId: string) => API.todoService.todoDelete(todoId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todoList"] }),
  });
};
