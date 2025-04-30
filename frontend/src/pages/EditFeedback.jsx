import React from 'react'
import EditFeedbackForm from '../components/EditFeedbackForm'
import { useNavigate } from 'react-router-dom'

function EditFeedback() {
  const navigate = useNavigate()
  const onedit = () =>
  {
     navigate("/myfeedback")
  }
  return (
    <div>

        <EditFeedbackForm onSuccess={onedit}/>
    </div>
  )
}

export default EditFeedback