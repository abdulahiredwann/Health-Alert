import api from "./api";
import {NewDoctorForm} from "../Components/Admin/CreateDoctor"


async function CreateNewDoctor(data:NewDoctorForm) {
    const {email,fullName,phone,speciality,username} = data

    const newDoctor = {
        email,fullName, phone, speciality, username
    }

    try{
        await api.post('/doctor', newDoctor)
        
    }catch(error){
        console.log(error)
        throw error
    }
}

export default CreateNewDoctor