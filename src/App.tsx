import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Main";
import Layout from "@/components/layout";
import Todo from "@/pages/Todo";
import { Suspense } from "react";

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
    <div>
      <Suspense fallback={null}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;
