import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../Services/api"

const useVaildation =()=>{
    const navigate = useNavigate()

    useEffect(()=>{
        const verfyToken = async()=>{
            try {
                const token = localStorage.getItem("x-auth-token")
                const response = await api.post("/validate", {token})
                if (!response.data.valid) {
                    throw new Error("Invalid Token")};
            } catch (error) {
                navigate("/login")
            }
        }
        verfyToken()
    },[navigate])
}
export default useVaildation