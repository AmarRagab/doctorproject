import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {

  const navigateto = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (localStorage.getItem(formData.username)) {
      newErrors.username = 'Username already exists';
    }
    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (localStorage.getItem(formData.username)) {
        toast.error('Username already exists!', {
          position: 'top-center',
          autoClose: 1000,
        });
        return;
      }

      const user = {
        id: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      };
      localStorage.setItem(formData.username, JSON.stringify(user));

      toast.success('User registered successfully!', {
        position: 'top-center',
        autoClose: 1000,
        onClose: () => {
          navigateto('/login');
        },
      });
    }
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  return (
    <>
     <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto">
  <h2 className="text-2xl font-semibold mb-6">Register</h2>
  <form onSubmit={handleSubmit} className="space-y-4">
    <div className="flex flex-col">
      <label htmlFor="username" className="text-sm font-medium mb-1">
        Username:
      </label>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        className="border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
      />
      {errors.username && (
        <span className="text-red-500 text-xs mt-1">{errors.username}</span>
      )}
    </div>
    <div className="flex flex-col">
      <label htmlFor="firstName" className="text-sm font-medium mb-1">
        First Name:
      </label>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        className="border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
      />
      {errors.firstName && (
        <span className="text-red-500 text-xs mt-1">{errors.firstName}</span>
      )}
    </div>
    <div className="flex flex-col">
      <label htmlFor="lastName" className="text-sm font-medium mb-1">
        Last Name:
      </label>
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        className="border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
      />
      {errors.lastName && (
        <span className="text-red-500 text-xs mt-1">{errors.lastName}</span>
      )}
    </div>
    <div className="flex flex-col">
      <label htmlFor="email" className="text-sm font-medium mb-1">
        Email:
      </label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
      />
      {errors.email && (
        <span className="text-red-500 text-xs mt-1">{errors.email}</span>
      )}
    </div>
    <div className="flex flex-col">
      <label htmlFor="password" className="text-sm font-medium mb-1">
        Password:
      </label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className="border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
      />
      {errors.password && (
        <span className="text-red-500 text-xs mt-1">{errors.password}</span>
      )}
    </div>
    <div className="flex flex-col">
      <label htmlFor="confirmPassword" className="text-sm font-medium mb-1">
        Confirm Password:
      </label>
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
      />
      {errors.confirmPassword && (
        <span className="text-red-500 text-xs mt-1">{errors.confirmPassword}</span>
      )}
    </div>
    <div className="flex flex-col">
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 focus:outline-none"
      >
        Register
      </button>
      <p className="text-sm mt-3">
        Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
      </p>
    </div>
  </form>
  <ToastContainer />
</div>

    </>
   
  );
};

export default Register;
