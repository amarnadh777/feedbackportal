import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authServices";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/authSlice";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "", general: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = { username: "", password: "", general: "" };
    if (!form.username) newErrors.username = "Username is required";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const result = await login(form);
        localStorage.setItem("token", result.token);
        dispatch(loginUser(result));
        navigate("/");
      } catch (error) {
        const serverMessage = error?.data?.message || "Something went wrong";
        setErrors((prev) => ({ ...prev, general: serverMessage }));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Username */}
          <div>
            <input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={loading}
            />
            {errors.username && <p className="text-red-600 text-sm">{errors.username}</p>}
          </div>

          {/* Password */}
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={loading}
            />
            {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className={`w-full p-3 rounded-lg transition text-white ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Link to Register */}
          <p className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-600 font-medium">
              Register
            </Link>
          </p>
        </form>

        {/* General Error */}
        {errors.general && (
          <p className="text-center text-red-600 mb-4 text-sm">{errors.general}</p>
        )}

      </div>
    </div>
  );
}

export default Login;
