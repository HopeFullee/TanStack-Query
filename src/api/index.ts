import { todoServiceRemote } from "./service";

const provideAPIService = () => {
  const todoService = todoServiceRemote();

  return {
    todoService,
  };
};

export const API = provideAPIService();
