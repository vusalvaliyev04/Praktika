import React, { useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { loginschema } from "../../../schemas/LoginSchema";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './login.css';
import { login, logout } from "../../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const notify = (text, type) =>
    toast(text, {
      type: type,
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    const submitForm = async (values, action) => {
      const { data } = await axios.get("http://localhost:3000/users");
    
      const findUser = data.find(
        (user) =>
          user.username === values.username && user.password === values.password
      );
    
      if (!findUser) {
        notify("Username or password incorrect", "error");
        return;
      } else {
        const updateUsers = data.map((user) => ({
          ...user,
          isLogin: user.id === findUser.id, 
        }));
        await Promise.all(
          updateUsers.map((user) =>
            axios.put(`http://localhost:3000/users/${user.id}`, user)
          )
        );
    
        dispatch(login({ username: values.username, email: findUser.email }));
        notify("Login successful", "success");
    
        setTimeout(() => {
          action.resetForm();
          navigate("/");
        }, 2000);
      }
    };
    
  const handleLogout = () => {
    dispatch(logout());
    notify("Logged out successfully", "success");
    navigate("/login");
  };

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: submitForm,
    validationSchema: loginschema,
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <div className="label-container">
            <label htmlFor="username">Username</label>
            {errors.username && <span className="error">{errors.username}</span>}
          </div>
          <input
            type="text"
            id="username"
            value={values.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="label-container">
            <label htmlFor="password">Password</label>
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <input
            type="password"
            id="password"
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <div className='accunt'>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </div>
        <button className="register-btn" type="submit">
          Sign In
        </button>

      </form>

      {isAuthenticated && (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Login;
