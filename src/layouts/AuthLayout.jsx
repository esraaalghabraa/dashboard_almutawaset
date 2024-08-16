import { ConfigProvider } from "antd";
import { useStateContext } from "../context/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthLayout() {
  const { token } = useStateContext();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <ConfigProvider
    direction="rtl"
    theme={{
      token:{
        colorPrimary:"#AE4387"
      }
    }}
    >
      <div  dir="rtl" className="flex justify-center items-center h-full w-full">
      <Outlet />
    </div>
    </ConfigProvider>
  );
}
