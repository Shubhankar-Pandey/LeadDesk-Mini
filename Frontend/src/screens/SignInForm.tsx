import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { adminLogin } from "../apiEndpoints";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Redux/userSlice";

interface SigninFormData {
  email: string;
  password: string;
}

export default function SigninForm() {

    const user = useSelector((state : any) => state.user);
    console.log("user = ", user);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("user.user = ", user.user);
        if(user.user !== null){
            navigate("/admin/dashboard");
        }
    }, [])



    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SigninFormData>();
  

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  
  
  const onSubmit = async (data: SigninFormData) => {
    try {
      setLoading(true);

      const result = await axios.post(adminLogin, {
        email: data.email,
        password: data.password,
      }, { withCredentials: true });

      if(result.data.success){
        console.log("result.data.name = ", result.data.name);
        dispatch(setUser(result.data.name));
        toast.success("Signin successful");
        navigate("/admin/dashboard");
      }
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message ?? "Signin failed, please try again");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center text-black font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-100 flex flex-col gap-5 items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-4"
      >
        <h1 className="text-xl font-semibold text-gray-900">Sign in</h1>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
              tabIndex={-1}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Sign in
        </button>
        <div className="flex justify-center items-center gap-2">
          <p>Dont't have an account?</p>
          <NavLink to={"/admin/signup"} className="text-blue-500 hover:text-blue-600 font-bold">Signup</NavLink>
      </div>
      </form>
      <div>
        <p>Dummy credentials</p>
        <p>Email - shubhankarpandey2005@gmail.com</p>
        <p>Password - 12345</p>
      </div>
    </div>
  );
}
