import { NewPatientForm } from "../Components/Admin/CreatePatient";
import api from "./api";

async function CreateNewPatient(data:NewPatientForm) {
    const {dateOfBirth,email,fullName,phone,username, gender} = data
    const newPatient = {
        dateOfBirth,fullName,email,phone,username,gender
    }

    try{
        await api.post('/patient', newPatient)
    }catch(error){
        console.log("something is Wrong")
        throw error
    }
}


export default CreateNewPatient