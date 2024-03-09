import memories from "../assets/memories.jpg";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const {register, handleSubmit, formState: {errors}} = useForm();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const onSubmit = (data) => {
    axios.post('https://memories-3.onrender.com', data)
      .then(response => {
        // Handle success
        setSuccessMessage('Registration successful!'); 
        setErrorMessage(''); // Clear error message
        toast.success('Registration successful!'); // Display success toast
        console.log('Response:', response.data);
        navigate('/login'); // Redirect to login page using navigate
      })
      .catch(error => {
        // Handle error
        setErrorMessage('Registration failed. Please try again.'); 
        setSuccessMessage(''); 
        toast.error('Registration failed. Please try again.'); 
        console.error('Error:', error);
      });
  }
  
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex w-full max-w-7xl border border-blue-700 rounded-lg shadow-lg overflow-hidden">
        <div className="w-1/2 p-8">
          <img src={memories} alt="memories" className="w-full rounded-lg" />
          <h1 className="text-2xl mt-4 font-semibold">Preserve Your Moments, Cherish Forever.</h1>
        </div>
        <div className="w-1/2 p-8 bg-white">
          <h1 className="text-3xl mb-8 ml-40 font-semibold">Sign Up</h1>
          <ToastContainer /> {/* Add ToastContainer */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input type="text" placeholder="Username" className="input-field w-96 p-2 rounded border border-orange-200" {...register("username", {required: true})}/>
            </div>
            {errors.username && <span className="text-red-500">Username is required</span>}
            <div>
              <input type="text" placeholder="Email" className="input-field w-96 p-2 rounded border border-orange-200" {...register("email", {required: true, pattern: /^\S+@\S+$/i })} />
            </div>
            {errors.email && <span className="text-red-500">Invalid email address</span>}
            <div>
              <input type="password" placeholder="Password" className="input-field w-96 p-2 rounded border border-orange-200" {...register("password", {required: true, minLength: 6})} />
            </div>
            {errors.password && <span className="text-red-500">Password must be at least 6 characters long</span>}
            <div>
              <input type="password" placeholder="Confirm Password" className="input-field w-96 p-2 rounded border border-orange-200" {...register("confirmpassword", {required: true})} />
            </div>
            {errors.confirmpassword && <span className="text-red-500">Please confirm your password</span>}
            <button type="submit" className="btn-primary text-white p-2 rounded bg-blue-500">Sign Up</button>
          </form>
          <p className="mt-4 text-gray-600">Already have an account? <Link to="/login" ><span className="text-blue-600 cursor-pointer">Login</span></Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
