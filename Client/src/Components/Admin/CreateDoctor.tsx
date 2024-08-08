import { zodResolver } from "@hookform/resolvers/zod";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CreateNewDoctor from "../../Services/createNewDoctor";
import toast, { Toaster } from "react-hot-toast";
import useVaildation from "../../hooks/useValidation";

// Define the schema with Zod
const schema = z.object({
  fullName: z
    .string()
    .min(4, "Full name must be at least 4 characters")
    .max(20, "Full name can be up to 20 characters"),
  username: z
    .string()
    .min(4, "Username must be at least 4 characters")
    .max(20, "Username can be up to 20 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(9, "Phone number must be at least 9 characters")
    .max(20, "Phone number can be up to 20 characters"),

  speciality: z
    .string()
    .min(3, "Speciality must be at least 3 characters")
    .max(20, "Speciality can be up to 20 characters"),
});
export type NewDoctorForm = z.infer<typeof schema>;

function CreateDoctor() {
  const [fullName, setFullName] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<NewDoctorForm>({
    resolver: zodResolver(schema),
    mode: "onSubmit", // Ensure validation occurs on form submission
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fullName = e.target.value;
    setFullName(fullName);
    const formattedUsername = fullName.replace(/\s+/g, "").toLowerCase();
    setUsername(formattedUsername);
  };

  const run = async (data: NewDoctorForm) => {
    try {
      await CreateNewDoctor(data);
      toast.success("Success");
    } catch (error) {
      console.log(error);
      toast.error("Something wrong");
    }
  };
  // Function to handle form submission
  const onSubmit = (data: NewDoctorForm) => {
    run(data);
    reset();
  };
  useVaildation();

  return (
    <>
      <Toaster></Toaster>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-primary text-white">
                Doctor Registration
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <label htmlFor="fullName">Doctor Name</label>
                    <input
                      {...register("fullName")}
                      type="text"
                      className="form-control"
                      id="fullName"
                      placeholder="Enter Doctor name"
                      value={fullName}
                      onChange={handleNameChange}
                      required
                    />
                    {errors.fullName && (
                      <p className="text-danger">{errors.fullName.message}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      {...register("username")}
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Generated username"
                      value={username}
                    />
                    {errors.username && (
                      <p className="text-danger">{errors.username.message}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      {...register("email")}
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                    />
                    {errors.email && (
                      <p className="text-danger">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      {...register("phone")}
                      type="text"
                      className="form-control"
                      id="phone"
                      placeholder="Phone"
                    />
                    {errors.phone && (
                      <p className="text-danger">{errors.phone.message}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="speciality">Speciality</label>
                    <input
                      {...register("speciality")}
                      type="text"
                      className="form-control"
                      id="speciality"
                      placeholder="Speciality"
                    />
                    {errors.speciality && (
                      <p className="text-danger">{errors.speciality.message}</p>
                    )}
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateDoctor;
