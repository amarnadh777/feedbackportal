import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import { Modal, Box, Button, CircularProgress, TextField } from "@mui/material";
import { deleteMyfeedback,givefeedbackresponse } from "../services/feedbackServices";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectetedFeedback } from "../redux/feedbackSlice";
import noProfile from "../assets/noprofile.jpg"
function FeedbackCard({
  feedback,
  rating,
  createdBy,
  createdAt,
  editable,
  onDelete,
  feedbackId,
  image,
  adminResponse,
  responsedBy,
  isAdmin, 
  onResponseAdded 
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [submittingResponse, setSubmittingResponse] = useState(false);
  const dispatch = useDispatch();
  const formatedDate = dayjs(createdAt).format("DD MMM YYYY");

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteMyfeedback(feedbackId);
      onDelete(feedbackId);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResponseSubmit = async () => {
    if (responseText.trim() === "") return;
    setSubmittingResponse(true);
    try {
  
     const results =  await givefeedbackresponse({  feedbackId:feedbackId,response:responseText});
      console.log(results)
      setResponseText("");
      onResponseAdded?.(); 

    
    } catch (error) {
      console.error("Error submitting response:", error);
    } finally {
      setSubmittingResponse(false);
    }
  };

  return (
    <div className="w-[38em] bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 mb-8">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={createdBy.profilePic ? createdBy.profilePic : noProfile }
          className="w-14 h-14 rounded-full object-cover border-2 border-gray-300"
          alt="profile"
        />
        <div className="flex flex-col">
          <p className="font-semibold text-lg">{createdBy.fullname}</p>
          <p className="text-gray-500 text-sm">{formatedDate}</p>
        </div>
        <div className="ml-auto">
          <Stack spacing={1}>
            <Rating name="read-only" value={rating} precision={0.5} readOnly />
          </Stack>
        </div>
      </div>

      {image && (
        <div className="mb-4">
          <img
            src={image}
            alt="feedback"
            className="w-full h-64 object-cover rounded-lg border"
          />
        </div>
      )}

      <p className="text-gray-800 text-base mb-2">{feedback}</p>

      {editable && (
        <div className="flex gap-3 mt-4">
          <Link to="/myfeedback/edit">
            <button
              onClick={() =>
                dispatch(
                  selectetedFeedback({
                    feedbackId,
                    rating,
                    feedback,
                  })
                )
              }
              className="bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-black transition duration-300"
            >
              Edit
            </button>
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Delete
          </button>
        </div>
      )}

      <Modal open={isModalOpen} onClose={() => !loading && setIsModalOpen(false)}>
        <Box className="bg-white p-6 rounded-lg shadow-lg w-[25em] m-auto mt-[15%] text-center">
          <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
          <p className="mb-6 text-gray-600">Are you sure you want to delete this feedback?</p>
          <div className="flex justify-center gap-4">
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Delete"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => setIsModalOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>


      {adminResponse && (
        <section className="mt-4 p-4 bg-blue-200 rounded-lg">
          <div className="flex gap-4 items-center mb-2">
            <img src={responsedBy.profilePic ? responsedBy.profilePic : noProfile} alt="" className="size-10 rounded-full" />
            <p className="text-blue-700 font-semibold">{responsedBy.fullname}</p>
            <div className="bg-blue-500 h-6 px-2 rounded-1xl text-sm text-center text-white ml-2">
              Admin
            </div>
          </div>
          <p className="text-gray-700">{adminResponse}</p>
        </section>
      )}


      {isAdmin && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg ">
          <h3 className="font-semibold mb-2">Respond to this feedback:</h3>
          <TextField
            label="Your response"
            multiline
            rows={3}
            variant="outlined"
            fullWidth
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleResponseSubmit}
            disabled={submittingResponse || responseText.trim() === ""}
            className="mt-10"
          >
            {submittingResponse ? <CircularProgress size={20} color="inherit" /> : "Submit Response"}
          </Button>
        </div>
      )}

      <hr className="border-t-2 border-gray-300 my-4" />
    </div>
  );
}

export default FeedbackCard;
