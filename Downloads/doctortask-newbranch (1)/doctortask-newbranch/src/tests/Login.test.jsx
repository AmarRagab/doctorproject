import React from 'react';
import { render, fireEvent ,screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import Login from '../Components/Login';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../Components/context/Auth/AuthContextProvider';
jest.mock('../Components/context/Auth/AuthContextProvider', () => ({
  useAuth: jest.fn(),
}));

describe('Login', () => {
  test('should render correctly', () => {
    const loginMock = jest.fn();
    useAuth.mockReturnValue({
      login: loginMock,
    });

    const { getByText, getByPlaceholderText } = render(<Login />, { wrapper: MemoryRouter });

    expect(getByText('تسجيل الدخول')).toBeInTheDocument();
    expect(getByPlaceholderText('اسم المستخدم:')).toBeInTheDocument();
  });

  test('should display error messages on invalid form submission', () => {
    const loginMock = jest.fn();
    useAuth.mockReturnValue({
      login: loginMock,
    });

    const { getByText } = render(<Login />, { wrapper: MemoryRouter });

    fireEvent.click(getByText('تسجيل الدخول'));

    expect(screen.getByText('Username is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  test('should navigate to home page after successful login', () => {
    const loginMock = jest.fn();
    useAuth.mockReturnValue({
      login: loginMock,
    });

    const { getByText, getByPlaceholderText, container } = render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(getByPlaceholderText('اسم المستخدم:'), { target: { value: 'testUser' } });
    fireEvent.change(getByPlaceholderText('كلمة المرور:'), { target: { value: 'password123' } });

    global.localStorage = {
      getItem: jest.fn(() =>
        JSON.stringify({
          username: 'testUser',
          password: 'password123',
        })
      ),
    };

    fireEvent.click(getByText('تسجيل الدخول'));

    expect(container.querySelector('.Toastify__toast--success')).toBeInTheDocument();

    expect(loginMock).toHaveBeenCalledWith({
      username: 'testUser',
      password: 'password123',
    });
  });
});
