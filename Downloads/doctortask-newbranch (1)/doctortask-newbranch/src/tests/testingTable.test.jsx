
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import { useAuth } from '../Components/context/Auth/AuthContextProvider';
import Table from '../Components/Table/Table';
import { waitFor } from '@testing-library/react';
jest.mock('../Components/context/Auth/AuthContextProvider', () => ({
  useAuth: jest.fn(),
}));

const mockDoctorData = [
    {
      id: 1,
      doctor: 'Doctor A',
      city: 'City A',
      mobile: '123456789',
      major: 'Specialty A',
      address: 'Address A',
    },
  ];


  it('should render correctly', () => {
    const isLoging = true;
    useAuth.mockReturnValue({
      isLoging: isLoging,
    });

    const { getByText } = render(<Table data={mockDoctorData} rowsPerPage={10}></Table>);

    expect(getByText('الطبيب')).toBeInTheDocument();
    expect(getByText('الجوال')).toBeInTheDocument();
  });

  it('should open the review popup when review button is clicked', () => {
    const isLoging = true;
    useAuth.mockReturnValue({
      isLoging: isLoging,
    });

    const { getByText } = render(<Table data={mockDoctorData} rowsPerPage={10} />)

    fireEvent.click(getByText('التقييم'));


    waitFor(() =>expect(document.querySelector('.review-popup')).toBeInTheDocument());
  });


  it('should open the overview popup when overview button is clicked', () => {
    const isLoging = true;
    useAuth.mockReturnValue({
      isLoging: isLoging,
    });

    const { getByText } = render(<Table data={mockDoctorData} rowsPerPage={10} />)

    fireEvent.click(getByText('الملخص'));

   
    waitFor(() =>expect(document.querySelector('.overview-popup')).toBeInTheDocument());
  });


 