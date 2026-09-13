"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LogoutBtn = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await axios.get(`http://localhost:3000/api/users/logout`);
      toast.success("Logout Successful!");
      router.replace("/");
      router.refresh()
    } catch (error) {
      toast.warning("Logout failed. Please try again!");
    }
  };

  return (
    <button onClick={handleLogout} className="px-4 py-2 bg-red-600 hover:bg-red-800 text-white rounded-md cursor-pointer">
      Logout
    </button>
  );
};

export default LogoutBtn;
