import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import { useAuth } from './context/Auth/AuthContextProvider'; 
import Login from './Login';

jest.mock('./context/Auth/AuthContextProvider', () => ({
  useAuth: jest.fn(),
}));

test('Login', () => {
  it('should render correctly', () => {
    const loginMock = jest.fn();
    useAuth.mockReturnValue({
      login: loginMock,
    });

    const { getByText, getByPlaceholderText } = render(<Login />, { wrapper: MemoryRouter });

    expect(getByText('تسجيل الدخول')).toBeInTheDocument();
    expect(getByPlaceholderText('اسم المستخدم:')).toBeInTheDocument();
  });

  it('should display error messages on invalid form submission', () => {
    const loginMock = jest.fn();
    useAuth.mockReturnValue({
      login: loginMock,
    });

    const { getByText } = render(<Login />, { wrapper: MemoryRouter });

    fireEvent.click(getByText('تسجيل الدخول'));

    expect(getByText('Username is required')).toBeInTheDocument();
    expect(getByText('Password is required')).toBeInTheDocument();
  });

  it('should navigate to home page after successful login', () => {
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
