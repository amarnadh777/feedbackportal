import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authServices";
import { loginUser } from "../redux/authSlice";
import { useDispatch } from "react-redux";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    profilePic: null,
  });

  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic") {
      const file = files[0];
      setForm({ ...form, profilePic: file });
      setFileName(file ? file.name : "");
      setPreview(file ? URL.createObjectURL(file) : null);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.fullname) newErrors.fullname = "Full Name is required";
    if (!form.username) newErrors.username = "Username is required";
    else if (form.username.length < 3)
      newErrors.username = "Username must be at least 3 characters";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!form.confirmPassword)
      newErrors.confirmPassword = "Confirm your password";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      setServerError("");

      try {
        const formData = new FormData();
        formData.append("fullname", form.fullname);
        formData.append("username", form.username);
        formData.append("password", form.password);
        formData.append("image", form.profilePic);

        const results = await register(formData);
        console.log("Registration successful:", results);

        dispatch(loginUser(results));
        localStorage.setItem("token", results.token);
        navigate("/");
      } catch (error) {
        console.log("Registration error:", error);
        setServerError(
          error?.data?.message || "Something went wrong. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              name="fullname"
              placeholder="Full Name"
              value={form.fullname}
              onChange={handleChange}
              disabled={loading}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.fullname && (
              <p className="text-red-600 text-sm">{errors.fullname}</p>
            )}
          </div>

          <div>
            <input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              disabled={loading}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.username && (
              <p className="text-red-600 text-sm">{errors.username}</p>
            )}
          </div>

          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password}</p>
            )}
          </div>

          <div>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">
              Profile Picture
            </label>
            <input
              name="profilePic"
              type="file"
              accept="image/*"
              onChange={handleChange}
              disabled={loading}
              className="w-full p-3 border rounded-lg"
            />
            {fileName && (
              <p className="text-xs text-gray-500 mt-1">{fileName}</p>
            )}
          </div>

          {preview && (
            <img
              src={preview}
              alt="Profile Preview"
              className="w-24 h-24 object-cover rounded-full mx-auto"
            />
          )}

          <button
            type="submit"
            className={`w-full p-3 rounded-lg transition text-white ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium">
              Login
            </Link>
          </p>
        </form>

        {serverError && (
          <p className="text-center text-red-600 text-sm mt-3">{serverError}</p>
        )}
      </div>
    </div>
  );
}

export default Register;
