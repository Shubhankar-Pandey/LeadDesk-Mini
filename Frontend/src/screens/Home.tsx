import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createLead } from "../apiEndpoints";
import { NavLink } from "react-router-dom";
import Footer from "../Component/Footer";

interface FormData {
  name: string;
  email: string;
  budgetFrom: string;
  budgetTo: string;
  message: string;
}

export default function HomeScreen() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [loading, setLoading] = useState<boolean>(false);

  const submitHandler = async (data: FormData) => {
    try {
        setLoading(true);
        const response = await axios.post(createLead, {
            name: data.name,
            email: data.email,
            budgetFrom: data.budgetFrom,
            budgetTo: data.budgetTo,
            message: data.message,
        });
        if (response.data.success) {
            toast.success("Lead submitted successfully");
        }
        else{
            toast.error(response.data.message);
        }
    } 
    catch (error) {
        toast.error("Lead submission failed, retry after 15 minutes");
    } 
    finally {
        setLoading(false);
    }
  };

  if(loading){
    return (
        <div className="w-screen h-screen flex items-center justify-center text-black font-bold">
            Loading...
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-amber-100 flex flex-col gap-5 items-center justify-center px-4 py-2">
        <div className="flex justify-end items-center w-full">
            <NavLink to={"/admin/dashboard"} 
            className="bg-amber-300 border border-amber-700 p-2 hover:scale-95 rounded transition-all duration-200">Admin Dashboard</NavLink>
        </div>
        <form
            onSubmit={handleSubmit(submitHandler)}
            className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-4"
        >
            <h1 className="text-xl font-semibold text-gray-900">Contact us</h1>

            <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
            </label>
            <input
                id="name"
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.name && (
                <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
            )}
            </div>

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

            <div className="flex gap-4">
            <div className="flex-1">
                <label htmlFor="budgetFrom" className="block text-sm font-medium text-gray-700 mb-1">
                Budget from
                </label>
                <input
                id="budgetFrom"
                type="number"
                {...register("budgetFrom", { required: "Required", valueAsNumber: true })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.budgetFrom && (
                <p className="text-sm text-red-600 mt-1">{errors.budgetFrom.message}</p>
                )}
            </div>

            <div className="flex-1">
                <label htmlFor="budgetTo" className="block text-sm font-medium text-gray-700 mb-1">
                Budget to
                </label>
                <input
                id="budgetTo"
                type="number"
                {...register("budgetTo", { required: "Required", valueAsNumber: true })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.budgetTo && (
                <p className="text-sm text-red-600 mt-1">{errors.budgetTo.message}</p>
                )}
            </div>
            </div>

            <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
            </label>
            <textarea
                id="message"
                rows={4}
                {...register("message", { required: "Message is required" })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.message && (
                <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>
            )}
            </div>

            <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
            {loading ? "Submitting..." : "Submit"}
            </button>
        </form>
        <Footer/>
    </div>
  );
}
