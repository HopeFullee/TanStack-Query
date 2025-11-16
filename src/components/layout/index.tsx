import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <main>
        <Suspense>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default Layout;
