import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../../../public/logo.png";
import PatientLoginService from "../../Services/patientLoginService";
import { useState } from "react";
import { CiLogin } from "react-icons/ci";
import { useAuth } from "../../Services/Auth";

// Define your schema using zod
const schema = z.object({
  username: z
    .string()
    .min(6, { message: "Username must be more than 6 characters" })
    .max(20),
  password: z
    .string()
    .min(6, { message: "Password must be more than 6 characters" })
    .max(20),
});

type LoginFormData = z.infer<typeof schema>;

function LoginPatient() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormData>({ resolver: zodResolver(schema) });

  const run = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      await PatientLoginService(data);
      toast.success("Welcome");
      navigate(`/patient/dashboard/${data.username}`);
      setIsAuthenticated(true);
    } catch (error: any) {
      setIsLoading(false);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center justify-center  ">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          {/* Logo and Welcome Message */}
          <div className="text-center mb-6">
            <img src={Logo} alt="Logo" className="mx-auto mb-4 h-16 w-auto" />
            <h1 className="text-2xl font-bold text-gray-800">Welcome Back!</h1>
          </div>
          {/* Login Form */}
          <form
            onSubmit={handleSubmit((data) => {
              run(data);
              reset();
            })}
            className="space-y-4"
          >
            <div className="relative">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="username"
                  {...register("username")}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your username"
                />
              </div>
              {errors.username && (
                <p className="text-red-600">{errors.username.message}</p>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  {...register("password")}
                  type="password"
                  id="password"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className={`w-full py-2 px-4 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <div className="flex items-center justify-center">
                {isLoading && (
                  <span className="loading loading-infinity loading-lg mr-2"></span>
                )}
                <div className="flex items-center justify-center space-x-2">
                  {isLoading ? "Loading..." : "Login"}
                  <CiLogin className="ml" size={25} />
                </div>
              </div>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPatient;
