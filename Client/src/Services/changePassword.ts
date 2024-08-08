import { ChangePassword as schema } from "../Components/Patient/ChangePassword";
import api from "./api";

async function ChangePasswords(data: schema, username: string) {
  const {  newPassword, oldPassword } = data;
  const change = {
    oldPassword,
    newPassword,
  };
  try {
    await api.put(`/patient/${username}/password`, change);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to change password");
  }
}

export default ChangePasswords;
