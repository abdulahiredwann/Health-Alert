import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import AdminLoginService from "../../Services/adminLoginServivice";
import toast, { Toaster } from "react-hot-toast";

const schema = z.object({
  username: z
    .string()
    .min(6, { message: "Username must be more that 6" })
    .max(20),
  password: z
    .string()
    .min(6, { message: "Password must be more than 6 character" })
    .max(20),
});

type LoginFormData = z.infer<typeof schema>;

function AdminLogin() {
  const navigate = useNavigate();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormData>({ resolver: zodResolver(schema) });

  const run = async (data: LoginFormData) => {
    try {
      await AdminLoginService(data);
      toast.success("Welcome");
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } catch (error: any) {
      console.log(error);
      toast.error("Something Wrong ");
    }
  };
  return (
    <>
      <Toaster></Toaster>
      <div className="container mx-auto mt-9 p-4 bg-white rounded-lg shadow-md max-w-md">
        <h1 className="text-center font-bold text-lg"> Admin Login</h1>
        <form
          onSubmit={handleSubmit((date) => {
            run(date);

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
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AdminLogin;
