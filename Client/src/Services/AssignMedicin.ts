import { NewMedicine } from "../Components/Doctor/AddMedicine";
import api from "./api";


async function AssignMedicine(data:NewMedicine, username:string){
    const {dosage,end_date,frequency,name,note,start_date} = data
    const medicine = {
    medication: {
        dosage,
        end_date,
        frequency,
        name,
        notes: note, // Adjusted key to match backend structure
        start_date
    }
      }
    try{

       await api.put(`/patient/${username}/medicine`, medicine )
    }catch(error){
        throw new Error
        console.log(error)
    }

}

export default AssignMedicine