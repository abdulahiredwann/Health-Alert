import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import CreateNewPatient from "../../Services/createNewPatient";
import axios from "axios";

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
  gender: z.string().min(2).max(1000),
  phone: z
    .string()
    .min(9, "Phone number must be at least 9 characters")
    .max(20, "Phone number can be up to 20 characters"),
  dateOfBirth: z.date().min(new Date(1900, 0, 1), "Invalid date"),
});

export type NewPatientForm = z.infer<typeof schema>;

function CreatePatient() {
  const [fullName, setFullName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewPatientForm>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fullName = e.target.value;
    setFullName(fullName);
    const formattedUsername = fullName.replace(/\s+/g, "").toLowerCase();
    setUsername(formattedUsername);
  };

  const run = async (data: NewPatientForm) => {
    try {
      setIsLoading(true);
      await CreateNewPatient(data);
      toast.success("Success");
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error) && error.response) {
        // Extract error message from Axios error response
        const errorMessage = error.response.data || "Something went wrong";
        toast.error(errorMessage);
      } else {
        // Handle other types of errors (e.g., network errors)
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster></Toaster>

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-primary text-white">
                Patient Registration
              </div>
              <div className="card-body">
                <form
                  onSubmit={handleSubmit((data) => {
                    run(data);
                    reset();
                  })}
                >
                  <div className="form-group">
                    <label htmlFor="fullName">Patient Name</label>
                    <input
                      {...register("fullName")}
                      type="text"
                      className="form-control"
                      id="fullName"
                      placeholder="Enter Patient name"
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
                    <label htmlFor="gender">Gender</label>
                    <Controller
                      name="gender"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <select {...field} className="form-control" id="gender">
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      )}
                    />
                  </div>
                  {errors.gender && (
                    <p className="text-danger">{errors.gender.message}</p>
                  )}
                  <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <Controller
                      name="dateOfBirth"
                      control={control}
                      render={({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                              {...field}
                              onChange={(date) =>
                                field.onChange(
                                  date ? dayjs(date).toDate() : null
                                )
                              }
                              value={field.value ? dayjs(field.value) : null}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      )}
                    />
                    {errors.dateOfBirth && (
                      <p className="text-danger">
                        {errors.dateOfBirth.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn mt-2 btn-primary w-100"
                    disabled={isLoading} // Disable button when loading
                  >
                    {isLoading && (
                      <span className="loading loading-bars loading-lg"></span>
                    )}{" "}
                    {/* Adjust size as needed */}
                    {isLoading ? "Loading..." : "Submit"}{" "}
                    {/* Change button text based on loading state */}
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

export default CreatePatient;
