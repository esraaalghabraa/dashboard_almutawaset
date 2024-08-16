import { useStateContext } from "../context/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";
import { Sidebar, Navbar } from '../components';
import { ConfigProvider } from "antd";
import '../App.css'

const DashboardLayout = () => {
    const { token, activeMenu, activeMenuHover } = useStateContext();

    if (!token) {
        return <Navigate to="/auth/login" />;
    }

    return (
        <ConfigProvider
            direction="rtl"
            theme={{
                token: {
                    colorPrimary: "#AE4387",
                    fontFamily: "Tajawal",
                },
                components: {
                    Table: {
                        cellFontSize: 16,
                        cellPaddingInline: 5,
                        stickyScrollBarBg: '#DFB4CF',
                    },
                    Pagination: {
                        itemInputBg: '#F9F0F5',
                    },
                    Select: {
                        optionLineHeight: '2',
                        optionFontSize: 16,
                    },
                },
            }}
        >
            <div className='flex'>
                {/* Sidebar */}
                {(activeMenu || activeMenuHover) ? (
                    <div className="w-64 fixed sidebar top-0 right-0 h-full z-10">
                        <Sidebar />
                    </div>
                ) : (
                    <div className="w-0">
                        <Sidebar />
                    </div>
                )}

                {/* Main Content */}
                <div className={`bg-white min-h-screen w-full ${activeMenu ? 'md:mr-64' : 'flex-1'} transition-all duration-300`}>
                    {/* Navbar */}
                    <div className="w-full z-20 bg-white ">
                        <Navbar />
                    </div>

                    {/* Content */}
                    <div className='mx-12 my-4'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </ConfigProvider>
    );
}

export default DashboardLayout;
