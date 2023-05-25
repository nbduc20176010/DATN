import Navbar from "@components/Navbar";
import { iExtraMenu } from "@dtos/userNavDto";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const adminNav: iExtraMenu[] = [
        {
            label: "Home",
            path: "/admin",
        },
        {
            label: "Board",
            path: "/admin/board",
        },
        {
            label: "Manager",
            path: "/admin/manager",
        },
    ];

    return (
        <div className="h-full">
            <Navbar extraMenu={adminNav} />
            <div className="w-full bg-white">{children}</div>
        </div>
    );
};

export default Layout;
