import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import AssignMedicine from "../../Services/AssignMedicin";
import useVaildation from "../../hooks/useValidation";

interface AddMedicineProps {
  closeModal: () => void;
}

const schema = z.object({
  name: z
    .string()
    .min(3, "Name is required")
    .max(50, "Name cannot exceed 50 characters"),
  dosage: z
    .string()
    .min(3, "Dosage is required")
    .max(50, "Dosage cannot exceed 50 characters"),
  frequency: z
    .string()
    .min(3, "Frequency is required")
    .max(50, "Frequency cannot exceed 50 characters"),
  start_date: z.string().nonempty("Start Date is required"), // Changed to string
  end_date: z.string().nonempty("End Date is required"), // Changed to string
  note: z
    .string()
    .min(5, "Note should be at least 5 characters")
    .max(50, "Note cannot exceed 50 characters"),
});

export type NewMedicine = z.infer<typeof schema>;

const frequencyOptions = [
  { value: "", label: "Select Frequency" },
  { value: "Once Daily", label: "Once Daily" },
  { value: "Twice Daily", label: "Twice Daily" },
  { value: "Three Times Daily", label: "Three Times Daily" },
  { value: "Four Times Daily", label: "Four Times Daily" },
  { value: "Other", label: "Other" },
];

const AddMedicine = ({ closeModal }: AddMedicineProps) => {
  const { username } = useParams();
  useVaildation();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewMedicine>({ resolver: zodResolver(schema) });

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

  const run = async (data: NewMedicine, username: string) => {
    try {
      await AssignMedicine(data, username);
      toast.success("Success");
      navigate(0);
    } catch (error) {
      toast.error("Something Wrong");
    }
  };

  const onSubmit = async (data: NewMedicine) => {
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
      {console.log({ username })}
      <Dialog.Root open={true} onOpenChange={(open) => !open && closeModal()}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
              Add Medicine
            </Dialog.Title>
            <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
              Add details about the new medicine here.
            </Dialog.Description>
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset className="mb-[15px] flex items-center gap-5">
                <label
                  className="text-violet11 w-[90px] text-left text-[15px]"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  {...register("name")}
                  className="text-left text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                  id="name"
                  placeholder="Medicine Name"
                />
              </fieldset>

              <fieldset className="mb-[15px] flex items-center gap-5">
                <label
                  className="text-left text-violet11 w-[90px] text-[15px]"
                  htmlFor="dosage"
                >
                  Dosage
                </label>
                <input
                  {...register("dosage")}
                  className="text-left text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                  id="dosage"
                  placeholder="Dosage"
                />
              </fieldset>

              <fieldset className="mb-[15px] flex items-center gap-5">
                <label
                  className="text-left text-violet11 w-[90px] text-[15px]"
                  htmlFor="frequency"
                >
                  Frequency
                </label>
                <select
                  {...register("frequency")}
                  id="frequency"
                  className="text-left text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                >
                  {frequencyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </fieldset>

              <fieldset className="text-left mb-[15px] flex items-center gap-5">
                <label
                  className="text-left text-violet11 w-[90px] text-[15px]"
                  htmlFor="start_date"
                >
                  Start Date
                </label>
                <input
                  {...register("start_date")}
                  type="datetime-local"
                  className="text-left text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                  id="start_date"
                />
              </fieldset>

              <fieldset className="mb-[15px] flex items-center gap-5">
                <label
                  className="text-left text-violet11 w-[90px] text-[15px]"
                  htmlFor="end_date"
                >
                  End Date
                </label>
                <input
                  {...register("end_date")}
                  type="datetime-local"
                  className="text-left text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                  id="end_date"
                />
              </fieldset>

              <fieldset className="mb-[15px] flex items-center gap-5">
                <label
                  className="text-left text-violet11 w-[90px] text-[15px]"
                  htmlFor="note"
                >
                  Note
                </label>
                <input
                  {...register("note")}
                  className="text-left text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                  id="note"
                  placeholder="Add any additional notes here..."
                />
              </fieldset>

              <div className="mt-[25px] flex justify-end">
                <button type="submit" className="btn btn-outline">
                  Save
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

export default AddMedicine;
