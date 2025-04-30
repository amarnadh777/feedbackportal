import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import { editMyfeedback } from '../services/feedbackServices';
import Navbar from './Navbar';

function EditFeedbackForm({ onSuccess }) {
  const selectedFeedback = useSelector((state) => state.feedbackReducer.selectetedFeedback);

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedFeedback) {
      setRating(selectedFeedback.rating);
      setFeedback(selectedFeedback.feedback);
    }
  }, [selectedFeedback]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0 || feedback.trim() === '') {
      setError('Please provide a rating and feedback.');
      return;
    }

    setError('');
    setIsSubmitted(false);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('rating', rating);
      formData.append('feedback', feedback);
      if (file) {
        formData.append('image', file);
      }

      const result = await editMyfeedback(selectedFeedback.feedbackId, formData);
      setIsSubmitted(true);
      onSuccess?.(result.data);
    } catch (err) {
      console.error(err);
      setError('Failed to update feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (selectedFeedback === null) {
    return <p>No feedback selected for editing.</p>;
  }

  return (
    <div className='bg-gray-200 h-screen overflow-auto'>

<Navbar/>
    <div className="bg-white mt-24 w-[40em] h-[auto] p-8 rounded-lg shadow-lg max-w-md mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Edit Your Feedback</h1>

      <div className="mb-5">
        <Stack spacing={1}>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            precision={0.5}
            size="large"
          />
        </Stack>
      </div>

      <TextField
        label="Write your feedback"
        multiline
        rows={6}
        variant="outlined"
        fullWidth
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="mb-5"
        InputProps={{
          className: 'rounded-lg'
        }}
        />

      <div className="mb-5">
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="border p-2 rounded-lg w-full text-sm text-gray-600 bg-gray-50 cursor-pointer hover:bg-gray-100"
          />
        {file && (
          <div className="mt-3 flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="w-16 h-16 rounded-md object-cover"
              />
            <p className="text-gray-700 text-sm">{file.name}</p>
          </div>
        )}
      </div>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        className="!bg-blue-600 hover:!bg-blue-700 transition duration-300 py-2"
        disabled={loading}
        >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'Update Feedback'
        )}
      </Button>

      {isSubmitted && (
        <div className="mt-4 text-green-500">
          <p>Feedback updated successfully!</p>
        </div>
      )}
    </div>
      </div>
  );
}

export default EditFeedbackForm;
