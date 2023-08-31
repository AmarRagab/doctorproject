import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setFormData, setFormErrors, clearForm } from '../Slices/loginSlice';
import { setUser } from '../Slices/authSlice'; 

const Login = () => {
  const dispatch = useDispatch();
  const navigateto = useNavigate();
  const { formData, errors } = useSelector((state) => state.login);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    dispatch(setFormErrors(newErrors));
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { username, password } = formData;

      const storedUser = JSON.parse(localStorage.getItem(username));

      if (storedUser && storedUser.password === password) {
        const fullName = `${storedUser.firstName} ${storedUser.lastName}`;

        dispatch(clearForm());

        dispatch(setUser(storedUser));

        toast.success(`Welcome, ${fullName}!`, {
          position: 'top-center',
          autoClose: 1000,
          onClose: () => {
            navigateto('/');
          },
        });
      } else {
        toast.error('Incorrect username or password', {
          position: 'top-center',
          autoClose: 1000,
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ ...formData, [name]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto mt-8" dir='rtl'>
    <h2 className="text-2xl font-semibold mb-6">تسجيل الدخول</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="username" className="text-sm font-medium mb-1">
          اسم المستخدم:
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
        <label htmlFor="password" className="text-sm font-medium mb-1">
          كلمة المرور:
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
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 focus:outline-none"
        >
          تسجيل الدخول
        </button>
        <p className="text-sm mt-3">
          ليس لديك حساب؟ <Link to="/register" className="text-blue-500">سجّل الآن</Link>
        </p>
      </div>
    </form>
    <ToastContainer />
  </div>
  

  )
};

export default Login;
