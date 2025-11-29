import { baseAPI } from "@/api/core";

export const todoServiceRemote = () => ({
  todoList: async (pageNum?: number) => {
    try {
      const response = await baseAPI.get("/todo", {
        params: {
          page: pageNum,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  todoPost: async (todoData: Todo) => {
    try {
      const response = await baseAPI.post("/todo", todoData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  todoDelete: async (todoId: string) => {
    try {
      const response = await baseAPI.delete(`/todo/${todoId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
});
