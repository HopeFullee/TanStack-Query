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
      console.log(error);
    }
  },
});
