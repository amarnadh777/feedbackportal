import axios from "axios"
import api from "./axiosInstance"
 
 export const register = async(data) =>
{
    try {
        const results = await api.post("/auth/register",data)
       

        return results.data
    } catch (error) {
        throw error.response || error
        
    }
}

export const login = async(data) =>
{
    try {
        const  results = await api.post("/auth/login",data)
        return results.data

    } catch (error) {
        throw error.response || error
        
    }
}