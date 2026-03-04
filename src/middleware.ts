import { NextRequest, NextResponse } from "next/server";
export const middleware = (request: NextRequest) => {
  console.log("Middleware is running");
  const authToken = request.headers.get("authtoken") as string;
  if (!authToken) {
    return NextResponse.json(
      { message: "No AuthToken Provided, Access Denied!" },
      { status: 401 },
    );
  }
};

export const config = {
    matcher: [
        "/",
        "/about/:paths*",
    ]
}
