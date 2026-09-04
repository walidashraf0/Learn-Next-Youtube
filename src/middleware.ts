import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const jwtToken = request.cookies.get("jwtToken");
  const token = jwtToken?.value as string;

  if (!token) {
    return NextResponse.json(
      { message: "No token provided, Access Denied!" },
      { status: 401 },
    );
  }
}

export const config = {
  matcher: "/about/:path*",
};
