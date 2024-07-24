import api from "./api";

interface LoginResponse {
    token?: string
    message?:string
}


async function AdminLoginService(data:any) {
    const {username, password} = data

    try{
        const response = await api.post<LoginResponse>('/admin/login', {username, password})
        if(response.data.token){
            localStorage.setItem('x-auth-token', response.data.token)
        }
        else{
            throw new Error(`Login Failed: ${response.data.message} || "No token recived"`)
        }
    }
    catch(error){
        throw new Error("Something wrong")
    }
}

export default AdminLoginService