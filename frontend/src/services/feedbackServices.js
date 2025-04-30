import api from "./axiosInstance"
export const getMyfeedbacks = async() =>
{
    try {
        const results = await api.get("/feeback/myfeedback")
        return results.data
    } catch (error) {
        throw error.response || error
    }
}

export const deleteMyfeedback = async(feedbackId) =>
{
    try {
        const results = await api.delete(`/feeback/delete/${feedbackId}`)
        return results.data
        
    } catch (error) {
         throw error
    }
}




export const editMyfeedback = async(feedbackId,data) =>
    {
        try {
            const results = await api.put(`/feeback/edit/${feedbackId}`,data)
            return results.data
            
        } catch (error) {
             throw error
        }
    }



    export const givefeedbackresponse = async(data) =>
        {
            console.log(data,"SDfd")
            try {
                const results = await api.post(`/admin/feedback/response`,{
                    feedbackId:data.feedbackId,
                    response:data.response
                  })
                return results.data
                
            } catch (error) {
                 throw error
            }
        }



        export const getMyresponse = async() =>
            {
            
                try {
                    const results = await api.get("/admin/myrespones")
                    return results.data
                    
                } catch (error) {
                     throw error
                }
            }



            
        export const ediMyresponse = async(data) =>
            {
            
                try {
                    console.log(data    )
                    const results = await api.put("/admin/editrespones",

                        {
                            feedbackId:data.feedbackId,
                            response:data.response
                            
                          }
                    )
                    return results.data
                    
                } catch (error) {
                     throw error
                }
            }



                       
            export const deleteMyresponse = async (feedbackId) => {
                try {
                  const results = await api.delete("/admin/deleteresponse", {
                    data: {
                      feedbackId: feedbackId
                    }
                  });
                  return results.data;
                } catch (error) {
                  throw error;
                }
              };
              