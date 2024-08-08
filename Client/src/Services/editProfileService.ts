
import { EditProfile } from "../Components/Patient/EditProfile";
import api from "./api";


async function EditProfiles(data:EditProfile, username:string){
    const {email,fullName,phone} = data
    const profile = {
                email,fullName,phone
      }
    try{

       await api.put(`/patient/${username}/profile`, profile )
    }catch(error){
        throw new Error
        console.log(error)
    }

}

export default EditProfiles