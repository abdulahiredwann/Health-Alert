import api from "./api";

interface LoginResponse{
    token?: string
    message?:string
}

interface Data{
    username:string
    password:string
}

async function PatientLoginService(data:Data) {
    const {password,username} = data

    try{
        const response = await api.post<LoginResponse>('/patient/login', {password, username})
        if(response.data.token){
            localStorage.setItem('x-auth-token', response.data.token)
        }
        else{
            throw new Error("Login Faild")
         }
    }catch(error){
        throw new Error("Something Wrong")
    }
}

export default PatientLoginService