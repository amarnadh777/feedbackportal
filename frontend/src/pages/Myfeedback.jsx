import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getMyfeedbacks } from "../services/feedbackServices"
import FeedbackCard from '../components/FeedbackCard'

function Myfeedback() {
  const [myfeedback, setMyfeedbacks] = useState([])
  const [loading, setLoading] = useState(true)

  const deleteMyfeedback = (feedbackId) => {
    setMyfeedbacks(prev => prev.filter(each => each._id !== feedbackId))
  }

  useEffect(() => {
    const fetchMyFeedbacks = async () => {
      try {
        const result = await getMyfeedbacks()
        setMyfeedbacks(result.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchMyFeedbacks()
  }, [])

  return (
    <div className='bg-gray-200 h-screen overflow-auto'>
      <Navbar />

      <div className='flex gap-5 items-center flex-col mt-20'>
        {loading ? (
          <p className='text-gray-700 text-xl'>Loading your feedbacks...</p>
        ) : myfeedback.length === 0 ? (
          <p className='text-gray-700 text-xl'>No feedbacks yet.</p>
        ) : (
          myfeedback.map((each) =>
            <FeedbackCard
              key={each._id}
              feedbackId={each._id}
              feedback={each.feedback}
              rating={each.rating}
              createdBy={each.createdBy}
              createdAt={each.createdAt}
              editable={true}
              onDelete={deleteMyfeedback}
              image={each.image}
              adminResponse={each.response}
              responsedBy={each.responsedBy}
            />
          )
        )}
      </div>

    </div>
  )
}

export default Myfeedback
