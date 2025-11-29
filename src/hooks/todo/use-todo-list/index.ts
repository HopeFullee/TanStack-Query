import { useQuery, queryOptions } from "@tanstack/react-query";
import { API } from "@/api";

export const useTodoList = (pageIndex?: number) =>
  useQuery({
    queryKey: ["todoList"],
    queryFn: () => API.todoService.todoList(pageIndex),
  });
