import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Main";
import Layout from "@/components/layout";
import Todo from "@/pages/Todo";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div></div>,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "todo",
        element: <Todo />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={null}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
