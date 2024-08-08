import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import EditProfiles from "../../Services/editProfileService";

interface EditProfileProps {
  closeModal: () => void;
}

const schema = z.object({
  fullName: z
    .string()
    .min(3, "Name is required")
    .max(50, "Name cannot exceed 50 characters"),
  phone: z
    .string()
    .min(9, "Phone  is required")
    .max(50, "Phone cannot exceed 50 characters"),
  email: z.string().email(),
});

export type EditProfile = z.infer<typeof schema>;

const EditProfile = ({ closeModal }: EditProfileProps) => {
  const { username } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfile>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((error) => {
        if (error && typeof error === "object" && "message" in error) {
          const message = error.message as string; // Type assertion
          if (message) {
            toast.error(message);
          }
        }
      });
    }
  }, [errors]);

  const run = async (data: EditProfile, username: string) => {
    try {
      await EditProfiles(data, username);
      toast.success("Update Successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Somthing Wrong");
    }
  };

  const onSubmit = async (data: EditProfile) => {
    if (username) {
      try {
        await run(data, username); // Ensure username is a string
        // Handle success
      } catch (error) {
        toast.error("Failed to assign medicine");
      }
    } else {
      toast.error("Username not found");
    }
  };
  return (
    <>
      <Toaster></Toaster>
      <Dialog.Root open={true} onOpenChange={(open) => !open && closeModal()}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
              Edit Profile
            </Dialog.Title>
            <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
              After u finsh please submit
            </Dialog.Description>
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset className="mb-[15px] flex items-center gap-5">
                <label
                  className="text-violet11 w-[90px] text-left text-[15px]"
                  htmlFor="fullName"
                >
                  Full Name
                </label>
                <input
                  {...register("fullName")}
                  className="text-left text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                  id="fullName"
                  placeholder="Full Name"
                />
              </fieldset>
              <fieldset className="mb-[15px] flex items-center gap-5">
                <label
                  className="text-violet11 w-[90px] text-left text-[15px]"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <input
                  {...register("phone")}
                  className="text-left text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                  id="phone"
                  placeholder="Phone"
                />
              </fieldset>
              <fieldset className="mb-[15px] flex items-center gap-5">
                <label
                  className="text-violet11 w-[90px] text-left text-[15px]"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  {...register("email")}
                  className="text-left text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                  id="email"
                  placeholder="email"
                />
              </fieldset>

              <div className="mt-[25px] flex justify-end">
                <button type="submit" className="btn btn-outline btn-info ">
                  Update
                </button>
              </div>
            </form>
            <Dialog.Close asChild>
              <button
                className="text-violet11 hover:bg-violet4 focus:shadow-violet8 data-[state=open]:bg-violet3 inline-flex h-[35px] w-[35px] items-center justify-center rounded-full hover:bg-violet4 focus:shadow-violet8"
                aria-label="Close"
              >
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default EditProfile;
