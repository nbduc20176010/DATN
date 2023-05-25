import "@styles/globals.css";
import "antd/dist/reset.css";
import CustomProvider from "../components/CustomProvider";

export const metadata = {
    title: "Moon school",
    description: "Moon school website",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <CustomProvider>{children}</CustomProvider>
            </body>
        </html>
    );
}
