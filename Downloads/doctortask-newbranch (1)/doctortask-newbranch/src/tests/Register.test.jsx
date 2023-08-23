import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import Register from '../Components/Register';
describe('Register', () => {
  test('should render correctly', () => {
    const { getByText, getByPlaceholderText } = render(<Register />, { wrapper: MemoryRouter });

    expect(getByText('التسجيل')).toBeInTheDocument();
    expect(getByPlaceholderText('اسم المستخدم :')).toBeInTheDocument();
  });

  test('should display error messages on invalid form submission', () => {
    const { getByText } = render(<Register />, { wrapper: MemoryRouter });

    fireEvent.click(getByText('التسجيل'));

    expect(getByText('Username is required')).toBeInTheDocument();
    expect(getByText('First name is required')).toBeInTheDocument();
    expect(getByText('Last name is required')).toBeInTheDocument();
    expect(getByText('Email is required')).toBeInTheDocument();
    expect(getByText('Password is required')).toBeInTheDocument();
    expect(getByText('Passwords do not match')).toBeInTheDocument();
  });

  test('should navigate to login page after successful registration', () => {
    const { getByText, getByPlaceholderText, container } = render(<Register />, { wrapper: MemoryRouter });

    fireEvent.change(getByPlaceholderText('اسم المستخدم :'), { target: { value: 'testUser' } });
    fireEvent.change(getByPlaceholderText('الاسم الاول :'), { target: { value: 'John' } });
    fireEvent.change(getByPlaceholderText('الاسم الاخير :'), { target: { value: 'Doe' } });
    fireEvent.change(getByPlaceholderText('البريد الالكتروني :'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByPlaceholderText('كلمة المرور :'), { target: { value: 'password123' } });
    fireEvent.change(getByPlaceholderText('تأكيد كلمة المرور :'), { target: { value: 'password123' } });

    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
    global.localStorage = localStorageMock;

    fireEvent.click(getByText('التسجيل'));

    expect(container.querySelector('.Toastify__toast--success')).toBeInTheDocument();

    expect(localStorageMock.setItem).toHaveBeenCalled();
    expect(localStorageMock.setItem).toHaveBeenCalledWith('testUser', expect.any(String));
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
  });
});
