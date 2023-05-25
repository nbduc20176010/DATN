import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwtDecode from "jwt-decode";
// This function can be marked `async` if using `await` inside

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("user-token")?.value;

    if (request.nextUrl.pathname.startsWith("/signin") && !token) {
        return;
    }
    if (!token) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }
    if (token && request.url.includes("/signin")) {
        const decoded: any = jwtDecode(token!);
        return NextResponse.redirect(new URL(`/${decoded.role}`, request.url));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/admin/:path*", "/teacher/:path*", "/signin"],
};
