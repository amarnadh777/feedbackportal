import axios from "axios"
import api from "./axiosInstance"

export const getAllproducts = async() =>
{
    try {

        const results = await api.get("/product/") 
        return results.data


        
    } catch (error) {
        console.log(error)
    }
}

export const giveProductFeedback = async(data) =>
    {
        try {
    
            const results = await api.post("/feeback/create",data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                      }
                }
            ) 
           
            console.log(results,"Sdd")
            return results.data
    

            
        } catch (error) {
            console.log(error)
        }
    }
    
    export const getProductFeedback = async(productId) =>
        {
            try {
        
                const results = await api.get(`/feeback/product/${productId}`) 
               
         
                return results.data
        
    
                
            } catch (error) {
               
                throw error
            }
        }
