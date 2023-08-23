import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from '../Components/context/Auth/AuthContextProvider';
import Login from '../Components/Login';
import { Toast } from 'react-toastify/dist/components';

jest.mock('react-toastify', () => ({
  ToastContainer: jest.fn(() => null),
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('react-router-dom', () => ({
  Link: jest.fn(({ to, children }) => <a href={to}>{children}</a>),
  useNavigate: jest.fn(),
}));

jest.mock('../Components/context/Auth/AuthContextProvider', () => ({
  useAuth: jest.fn(),
}));

  it('displays error messages on form submission with empty fields', async () => {
    const { getByTitle, getByText } = render(
      <AuthContextProvider>
        <Router>
          <Login />
        </Router>
      </AuthContextProvider>
    );

    const submitButton = getByTitle('submitbtn');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('Username is required')).toBeInTheDocument();
      expect(getByText('Password is required')).toBeInTheDocument();
    });
  });

  it('displays success toast on successful login', async () => {
    const mockLogin = jest.fn();
    const mockNavigate = jest.fn();
    const { getByTitle, getByLabelText } = render(
      <AuthContextProvider>
        <Router>
          <Login />
        </Router>
      </AuthContextProvider>
    );

    useAuth.mockReturnValue({ login: mockLogin });
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(
      JSON.stringify({
        username: 'testuser',
        password: 'testpassword',
        firstName: 'Test',
        lastName: 'User',
      })
    );

    const usernameInput = getByLabelText('username:');
    const passwordInput = getByLabelText('password:');
    const submitButton = getByTitle('submitbtn');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        expect.objectContaining({
          username: 'testuser',
          password: 'testpassword',
          firstName: 'Test',
          lastName: 'User',
        })
      );

      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('displays error toast on unsuccessful login', async () => {
    const mockNavigate = jest.fn();
    const { getByTitle, getByLabelText } = render(
      <AuthContextProvider>
        <Router>
          <Login />
        </Router>
      </AuthContextProvider>
    );

    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(
      JSON.stringify({
        username: 'testuser',
        password: 'testpassword',
        firstName: 'Test',
        lastName: 'User',
      })
    );

    const usernameInput = getByLabelText('username:');
    const passwordInput = getByLabelText('password:');
    const submitButton = getByTitle('submitbtn');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.toast.error).toHaveBeenCalledWith('Incorrect username or password', {
        position: 'top-center',
        autoClose: 1000,
      });

      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
