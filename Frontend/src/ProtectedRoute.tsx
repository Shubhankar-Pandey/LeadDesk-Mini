import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { callme } from "./apiEndpoints";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function ProtectedRoute() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const user = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  async function meCall() {
    try {
      await axios.get(callme, { withCredentials: true });
      setIsAuthenticated(true);
    } catch (error) {
      toast.error("Need to login");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!user?.name) {
      meCall();
    } else {
      setIsAuthenticated(true);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/admin/dashboard");
    }
    if (!loading && !isAuthenticated) {
      navigate("/admin/signin");
    }
  }, [loading, isAuthenticated]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center text-black font-bold">
        Loading...
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : null;
}