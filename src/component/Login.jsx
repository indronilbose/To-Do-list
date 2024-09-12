import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import PopLogin from './PopLogin';
import axios from 'axios'

const Login = () => {
  const [email,setEmail] =useState('')
  const [password,setPassword] =useState('')
  const [error , setError]=useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  

  const navigate = useNavigate();

  axios.defaults.withCredentials=true;


  const handleSubmit= async(e)=>{
    e.preventDefault();

    try {
     
      const response =  await axios.post('http://localhost:5001/login',{email,password})
      setSuccessMessage(response.data.msg);
      setIsSuccessPopupOpen(true);
      console.log("Success message:", successMessage);      
      
      setTimeout(() => {
        navigate("/home");
      }, 2000);
      
    } catch (err) {
      const errorMessage = err.response?.data?.msg || 'An unexpected error occurred. Please try again later.';
      setErrorMessage(errorMessage);
      setIsErrorPopupOpen(true);
      console.log("Error message:", errorMessage);
    }
  };

  const closeErrorPopup = () => {
    setIsErrorPopupOpen(false);
  };

  const closeSuccessPopup = () => {
    setIsSuccessPopupOpen(false);
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
       {error && <p>{error}</p>} 
      <h1>Login</h1>
        <input 
        type="email"
         placeholder="Email" 
         value={email} 
         onChange={(e) => setEmail(e.target.value)} 
         />
        <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <PopLogin
      isOpen={isErrorPopupOpen}
      onClose={closeErrorPopup}
      message={errorMessage}
      />
      
      {/* Success Popup */}
      <PopLogin
        isOpen={isSuccessPopupOpen}
        onClose={closeSuccessPopup}
        message={successMessage}
      />

    </div>
  );
};

export default Login