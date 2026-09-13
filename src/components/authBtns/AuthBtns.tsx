import { verifyTokenPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import LogoutBtn from "../logout/LogoutBtn";

const AuthBtns = async () => {
  const token = (await cookies()).get("jwtToken")?.value || "";
  const user = verifyTokenPage(token);
  return (
    <div className="hidden md:flex items-center space-x-8">
      {user ? (
        <>
          <span>{user.username}</span>
          <LogoutBtn />
        </>
      ) : (
        <>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-md">
            <Link href={"/login"}>Login</Link>
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-md">
            <Link href={"/register"}>Register</Link>
          </button>
        </>
      )}
    </div>
  );
};

export default AuthBtns;
