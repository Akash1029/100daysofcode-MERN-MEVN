import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css"; 
import NotFoundPage from "./404";

const ResetPassword = ({hideLoader}) => {
  const {token} = useParams();
  const navigate = useNavigate();
  const [isSubmitting, SetIsSubmitting] = useState(false);

  // console.log("token", token);
  const [tokenFound, setTokenFound] = useState(0); 
  const [inputValue, setInputValue] = useState({
    password: "",
    con_password: "",
  });

  const [inputError, setInputError] = useState({
    password: '',
    con_password: ''
  });

  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
    if (token) {
      try {
        const { data } = await axios.post(
          `http://localhost:4000/reset-password/${token}`,
          { withCredentials: true }
        );
        const { success, message } = data;
        if (success) {
          // console.log(data);
          setTokenFound(1);
        }
        hideLoader(true);
      } catch (error) {
        hideLoader(true);
        // debugger
        // handleError(error.response.data.message); 
        // console.log(error);
        // navigate('/login');
        
      }
    }
  }
  verifyToken();
  }, []);

  // console.log(inputError);

  const { password, con_password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setInputValue({
      ...inputValue,
      [name]: value,
    });

    validateInput(e);

  };

  const validateInput = e => {
    let { name, value } = e.target;
    setInputError(prev => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (inputValue.con_password && value !== inputValue.con_password) {
            stateObj["con_password"] = "Password and Confirm Password does not match.";
          } else {
            stateObj["con_password"] = inputValue.con_password ? "" : inputError.con_password;
          }
          break;

        case "con_password":
          if (inputValue.password && value !== inputValue.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
            setSubmitDisabled((sub) => sub = true);
            
            
          }else {
            setSubmitDisabled((sub) => sub = false);
          }
          break;

        default:
          break;
      }
      console.log(submitDisabled);
      return stateObj;
    });
  }


  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    SetIsSubmitting(true);
    try {
      const { data } = await axios.post(
        `http://localhost:4000/change-password/${token}`,
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      console.log("success", success);
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } 
    } catch (error) {
      // debugger
      handleError(error.response.data.message); 
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      password: "",
      con_password: "",
    });
    SetIsSubmitting(false);
  };

  if (tokenFound == 1) {
    return (
      <div className="form_container">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="con_password">Confirm Password</label>
            <input
              type="password"
              name="con_password"
              value={con_password}
              placeholder="Confirm your password"
              onChange={handleOnChange}
            />
            {inputError.con_password && <span className='err'>{inputError.con_password}</span>}
          </div>
          <button type="submit" className={`text-white py-2 px-4 rounded self-center ${isSubmitting ? "cursor-not-allowed opacity-25" : ""}`} disabled={submitDisabled} {...isSubmitting ? "disabled" : ("")}>
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
            Already have an account? <Link to={"/login"}>Login</Link>
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
  }else {
    return  <div>
                <div style={{textAlign:"center"}}>
                    <h4>Page not found</h4>
                <Link to="/">Go to Home </Link>
                </div>
            </div>;
  }

};

export default ResetPassword;

