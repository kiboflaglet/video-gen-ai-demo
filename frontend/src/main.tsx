import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
  type LoaderFunctionArgs,
} from "react-router";
import "./index.css";
import { authClient } from "./lib/auth-client.ts";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Register.tsx";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import Home from "./pages/home/Home.tsx";

const dashboardLoader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const session = await authClient.getSession(); // check if user is logged in

    if (!session?.data?.user) {
      return redirect("/login");
    }
  } catch (error) {
    console.log(error);
  }
};

const authRedirectLoader = async () => {
  try {
    const session = await authClient.getSession(); // check if user is logged in

    if (session?.data?.user) {
      // if user is logged in, redirect to dashboard
      return redirect("/dashboard");
    }
  } catch (error) {
    console.log(error);
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
    loader: authRedirectLoader,
  },
  {
    path: "/register",
    element: <Register />,
    loader: authRedirectLoader,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    loader: dashboardLoader,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
