import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { giveProductFeedback } from '../services/productServices';
import { useSelector } from 'react-redux';

function Feedbackform({ onSuccess }) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [file, setFile] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false); // State for image loading

  const selectedProduct = useSelector((state) => state.productReducer.selectedProduct);

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
      formData.append('productId', selectedProduct._id);
      formData.append('rating', rating);
      formData.append('feedback', feedback);
      if (file) {
        formData.append('image', file);
      }

      const result = await giveProductFeedback(formData);
      console.log(result);
      setIsSubmitted(true);
      setFeedback('');
      setRating(0);
      setFile(null);
      onSuccess(result.data);
    } catch (err) {
      console.error(err);
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false); 
    }
  };

  const isFormValid = rating > 0 && feedback.trim() !== ''; 

  return (
    <div className="bg-white w-full max-w-xl p-8 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Give Us Your Feedback</h1>
      <p className="text-gray-600 mb-6">What was your experience with the product?</p>

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
        rows={5}
        variant="outlined"
        fullWidth
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="mt-2"
      />

      <div className="my-5">
        <label className="block mb-2 text-gray-700 font-medium">Upload Image (optional)</label>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
          file:rounded-lg file:border-0 file:text-sm file:font-semibold 
          file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer"
        />
        {file && (
          <div className="mt-3 flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="w-16 h-16 rounded-md object-cover border"
            />
            <p className="text-gray-700 text-sm">{file.name}</p>
          </div>
        )}
        {fileLoading && (
          <div className="mt-2 text-center">
            <CircularProgress size={24} />
            <p className="text-gray-600">Uploading Image...</p>
          </div>
        )}
      </div>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        size="large"
        className="!bg-blue-600 hover:!bg-blue-700 transition duration-300"
        disabled={loading || !isFormValid} 
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Submit Feedback"} 
      </Button>

      {isSubmitted && (
        <div className="mt-5 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
          <p>Thank you for your feedback!</p>
        </div>
      )}
    </div>
  );
}

export default Feedbackform;
