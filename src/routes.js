import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from './layouts/DashboardLayout'
import AuthLayout from "./layouts/AuthLayout";
import Login from "./components/auth/Login";
import { Ads, Customers, Dashboard, DeliveryAgents, MainCategory, Marketers, NotFound, Stores, Sub1Category, Traders } from "./pages";
import App from "./App";
import Sub2Category from "./pages/Sub2Category";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout/>,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/ecommerce",
        element: <Dashboard />,
      },
      {
        path: "/ads",
        element: <Ads />,
      },
      {
        path: "/stores",
        element: <Stores isStoreRequest={2}/>,
      },
      {
        path: "/main-category",
        element: <MainCategory />,
      },
      {
        path: "/sub1-category",
        element: <Sub1Category />,
      },
      {
        path: "/sub2-category",
        element: <Sub2Category />,
      },
      {
        path: "/orders-creating-stores",
        element: <Stores isStoreRequest={0}/>,
      },
      {
        path: "/orders-updating-stores",
        element: <Sub1Category />,
      },
      {
        path: "/orders-creating-ads",
        element: <Sub1Category />,
      },
      {
        path: "/customers",
        element: <Customers />,
      },
      {
        path: "/traders",
        element: <Traders />,
      },
      {
        path: "/marketers",
        element: <Marketers />,
      },
      {
        path: "/delivery_agents",
        element: <DeliveryAgents />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound/>,
  },
]);


