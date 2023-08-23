import React from 'react';
import {  fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import { render ,screen} from "@testing-library/react";
import { useAuth } from '../Components/context/Auth/AuthContextProvider';
import Login from "../Components/Login";
jest.mock('../Components/context/Auth/AuthContextProvider', () => ({
  useAuth: jest.fn(),
}));
it('Login', () => {
      const loginMock = jest.fn();

      useAuth.mockReturnValue({
        login: loginMock,
      });
  
    render(<Login />, { wrapper: MemoryRouter });
  
      expect(screen.getByText('username:')).toBeInTheDocument();


});

it('should display error messages on invalid form submission', () => {
  jest.mock('../Components/context/Auth/AuthContextProvider', () => ({
    useAuth: jest.fn(),
  }));
    const loginMock = jest.fn();
    useAuth.mockReturnValue({
      login: loginMock,
    });

    const { getByText } = render(<Login />, { wrapper: MemoryRouter });

    fireEvent.click(screen.getByTitle('submitbtn'));

    expect(getByText('Username is required')).toBeInTheDocument();
    expect(getByText('Password is required')).toBeInTheDocument();
  });


  it('should navigate to home page after successful login', () => {
    const loginMock = jest.fn();
    useAuth.mockReturnValue({
    loginMock,
    });

    render(<Login />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByPlaceholderText('اسم المستخدم:'), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByPlaceholderText('كلمة المرور:'), { target: { value: 'password123' } });

    global.localStorage = {
      getItem: jest.fn(() =>
        JSON.stringify({
          username: 'testUser',
          password: 'password123',
        })
      ),
    };
    fireEvent.click(screen.getByTitle('submitbtn'));

    expect(loginMock).toHaveBeenCalledWith({
      username: 'testUser',
      password: 'password123',
    });
});


jest.mock('../Components/context/Auth/AuthContextProvider', () => ({
  useAuth: () => ({
    login: jest.fn(),
  }),
}));

global.localStorage = {
  getItem: jest.fn(),
};

test('submitting the login form', async () => {
  render(
    <AuthContextProvider>
      <Login />
    </AuthContextProvider>
  );

  const usernameInput = screen.getByLabelText('username:');
  const passwordInput = screen.getByLabelText('password:');
  const submitButton = screen.getByTitle('submitbtn');

  global.localStorage.getItem.mockReturnValue(
    JSON.stringify({ firstName: 'John', lastName: 'Doe', password: 'secret' })
  );

  userEvent.type(usernameInput, 'testuser');
  userEvent.type(passwordInput, 'secret');
  fireEvent.click(submitButton);


  expect(AuthProvider.useAuth().login).toHaveBeenCalledWith({
    firstName: 'John',
    lastName: 'Doe',
    password: 'secret',
  });
});