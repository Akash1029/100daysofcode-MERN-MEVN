import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Login = ({hideLoader}) => {
  const navigate = useNavigate();
  const [cookies] = useCookies([]);
  const [isSubmitting, SetIsSubmitting] = useState(false);
  // console.log(cookies);
  useEffect(() => {
    const verifyCookie = async () => {
      if (cookies.token) {
        navigate("/");
      }else {
        hideLoader(true);
      }
    };
    verifyCookie();
  }, []);

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) => toast.error(err);
  const handleSuccess = (msg) => toast.success(msg);

  const handleSubmit = async (e) => {
    SetIsSubmitting(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      // console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
    SetIsSubmitting(false);
  };

  return (
    <div className="form_container">
      <h2 className="text-3xl font-bold underline text-center">Login Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit" className={`text-white py-2 px-4 rounded self-center ${isSubmitting ? "cursor-not-allowed opacity-25" : ""}`} disabled={isSubmitting}>
          {isSubmitting ? (
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 animate-spin"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          ) : (
            "Submit"
          )}
          </button>
        <span className="span-text">
          Don't have an account? <Link to={"/signup"}>Signup</Link>
        </span>
        <span>
          <Link to={"/forgot-password"}>Forgot password ?</Link>
        </span>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Login;
