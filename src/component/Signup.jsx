import React, { useState } from "react";
import axios from "axios";
import "./signup.css";
import Popup from "./Popup";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if( !name || !email || !password ){
        alert('All fields are required')
      }else{
      const response = await axios.post('http://localhost:5001/signup', { name, email, password });
      
      setSuccessMessage(response.data.msg);
      setIsSuccessPopupOpen(true);
      
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Adjust delay as needed
    }} catch (err) {
      const errorMessage = err.response?.data?.msg || 'An unexpected error occurred. Please try again later.';
      setErrorMessage(errorMessage);
      setIsErrorPopupOpen(true);
    }
  };

  const closeErrorPopup = () => {
    setIsErrorPopupOpen(false);
  };

  const closeSuccessPopup = () => {
    setIsSuccessPopupOpen(false);
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>Sign-Up</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="signup-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="signup-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="signup-input"
        />
        <button type="submit" className="signup-btn">Submit</button>
        <p>Already Have Id?</p>
        <Link className="signtologin-btn" to={'/login'}>Login</Link>
      </form>

      {/* Error Popup */}
      <Popup
        isOpen={isErrorPopupOpen}
        onClose={closeErrorPopup}
        message={errorMessage}
      />
      
      {/* Success Popup */}
      <Popup
        isOpen={isSuccessPopupOpen}
        onClose={closeSuccessPopup}
        message={successMessage}
      />
    </div>
  );
};

export default Signup;
