import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { deleteMyfeedback, deleteMyresponse, ediMyresponse, getMyresponse } from '../../services/feedbackServices';
import CircularProgress from '@mui/material/CircularProgress';
import { Modal, Box, TextField, Button } from '@mui/material';
import noProfile from "../../assets/noprofile.jpg"
function Myresponse() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [newResponseText, setNewResponseText] = useState("");
  const [updating, setUpdating] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchMyresponse = async () => {
    try {
      const results = await getMyresponse();
      setResponses(results.data);
    } catch (error) {
      console.error("Failed to fetch responses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyresponse();
  }, []);

  const openEditModalHandler = (item) => {
    setSelectedResponse(item);
    setNewResponseText(item.response);
    setOpenEditModal(true);
  };
  

  const handleUpdate = async () => {
    if (newResponseText.trim() === "") return;
    try {
      setUpdating(true);
        console.log(newResponseText)
      const results = await ediMyresponse({feedbackId:selectedResponse._id,response:newResponseText})
     
      const updatedList = responses.map((item) =>
        item._id === selectedResponse._id
          ? { ...item, response: newResponseText }
          : item
      );
      setResponses(updatedList);
      setOpenEditModal(false);
    } catch (error) {
      console.error("Failed to update response:", error);
    } finally {
      setUpdating(false);
    }
  };

  const openDeleteModal = (item) => {
    setDeleteTarget(item);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      setDeleteLoading(true);
     const results =   await deleteMyresponse(deleteTarget._id);
     console.log(results)
      setResponses(responses.filter((item) => item._id !== deleteTarget._id));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Failed to delete:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen pt-20 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">My Feedback Responses</h1>

        {loading ? (
          <div className="flex justify-center mt-10">
            <CircularProgress />
          </div>
        ) : responses.length === 0 ? (
          <p className="text-center text-gray-600">No responses given yet.</p>
        ) : (
          <div className="flex flex-col gap-6 items-center">
           
            {responses.map((item) => (
              <div
                key={item._id}
                className="w-[38em] bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={item.createdBy.profilePic ? item.createdBy.profilePic   : noProfile}
                    alt="admin"
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <div>
                    <p className="font-semibold">{item.createdBy.fullname}</p>
                  </div>
                </div>
                  <div>
                    <img src={item?.image} alt="" />
                  </div>
                <p className="text-gray-700 mb-4">
                  <strong>Feedback:</strong> {item.feedback}
                </p>
                 
                <p className="text-blue-700 mb-4">
                  <strong>Your Response:</strong> {item.response}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => openEditModalHandler(item)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(item)}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Response Modal */}
      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <Box className="bg-white p-6 rounded-lg shadow-lg w-[25em] m-auto mt-[15%] text-center">
          <h2 className="text-xl font-bold mb-4">Edit Your Response</h2>
          <TextField
            label="Response"
            multiline
            rows={3}
            variant="outlined"
            fullWidth
            value={newResponseText}
            onChange={(e) => setNewResponseText(e.target.value)}
            className="mb-4"
          />
          <div className="flex justify-center gap-4">
            <button
              onClick={handleUpdate}
              disabled={updating}
              className={`${
                updating ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              } text-white font-medium py-2 px-5 rounded-lg transition`}
            >
              {updating ? "Updating..." : "Update"}
            </button>
            <button
              onClick={() => setOpenEditModal(false)}
              className="border border-gray-400 text-gray-700 font-medium py-2 px-5 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </Box>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={isDeleteModalOpen} onClose={() => !deleteLoading && setIsDeleteModalOpen(false)}>
        <Box className="bg-white p-6 rounded-lg shadow-lg w-[25em] m-auto mt-[15%] text-center">
          <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
          <p className="mb-6 text-gray-600">Are you sure you want to delete this feedback?</p>
          <div className="flex justify-center gap-4">
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteConfirm}
              disabled={deleteLoading}
            >
              {deleteLoading ? <CircularProgress size={24} color="inherit" /> : "Delete"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={deleteLoading}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Myresponse;
