import { useContext, useState } from "react";
import { isValidEmail } from "../utils/ValidateEmail";
import { loginUser } from "../services/authService";
import { Link } from "react-router-dom";
import { userDataContext} from "../context/UserContext";
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
const Login = () => {

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
const {getCurrentUser,setUserData}=useContext( userDataContext)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };
const navigate=useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await loginUser({ email, password });

      await getCurrentUser();
      setUserData(result.user)
      setLoading(false);
      toast.success(result.message || "Welcome Back!");
      if (result.user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/home"); 
      }
      console.log("Login Success Data:", result); 
      
    } catch (err) {
      setLoading(false);
      setError(err);
    toast.error(err || "Something went wrong");
  
      
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {/* Login Card */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-sm">
            Please enter your details to sign in.
          </p>
        </div>

        {/* Error Message Alert (Conditional Rendering) */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-medium">
            {error}
          </div>
        )}

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-200 
              ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"}`}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-800">
  Register
</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
