import memories from "../assets/memories.jpg";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  
  const onSubmit = (data) => {
    axios.post('https://memories-3.onrender.com/users/login', data)
      .then(response => {
        setErrorMessage('');
        toast.success('Login successful!');
        console.log('Response:', response.data);
        navigate('/user/dashboard');
      })
      .catch(error => {
        const errorMessage = error.response ? error.response.data.message : 'Login failed. Please try again.';
        setErrorMessage(errorMessage);
        toast.error(errorMessage);
        console.error('Error:', error);
      });
  }
  
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex w-full max-w-7xl border border-blue-700 rounded-lg shadow-lg overflow-hidden">
        <div className="w-1/2 p-8 bg-orange-700 text-white">
          <img src={memories} alt="memories" className="w-full rounded-lg mb-6" />
          <h1 className="text-3xl font-semibold mb-4">Preserve Your Memories, Cherish Forever</h1>
          <p className="text-lg">Welcome back! Sign in to your account.</p>
        </div>
        <div className="w-1/2 p-8 bg-white">
          <h1 className="text-3xl mb-8 font-semibold">Sign in</h1>
          <ToastContainer />
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input type="email" placeholder="Email" className="input-field w-full p-3 rounded border border-gray-300" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
            </div>
            {errors.email && <span className="text-red-500">Invalid email address</span>}
            <div>
              <input type="password" placeholder="Password" className="input-field w-full p-3 rounded border border-gray-300" {...register("password", { required: true, minLength: 6 })} />
            </div>
            {errors.password && <span className="text-red-500">Password must be at least 6 characters long</span>}
            
            <button type="submit" className="btn-primary text-white p-3 rounded bg-blue-700 hover:bg-blue-800">Sign in</button>
          </form>
          <div className="mt-4">
            <p>Or</p>
          </div>
          
          <span>Sign in with google</span><div className="g-signin2 mt-2" data-onsuccess="onSignIn"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
