import React from 'react';
import { render, fireEvent,screen, getByText } from '@testing-library/react';
import { AuthContextProvider } from '../Components/context/Auth/AuthContextProvider';
import { useAuth } from '../Components/context/Auth/AuthContextProvider';
import OverviewPopup from '../Components/Overview';
import { MemoryRouter } from 'react-router';
import { Screen } from '@testing-library/react';
jest.mock('../Components/context/Auth/AuthContextProvider', () => ({
    useAuth: jest.fn(),
  }));
const mockDoctorData = {
    id: 1,
    doctor: 'Doctor A',
    city: 'City A',
    mobile: '123456789',
    major: 'Specialty A',
    address: 'Address A',
};

test('should render correctly', () => {
    const onCloseMock = jest.fn();

render(
        <AuthContextProvider>
            <OverviewPopup doctorData={mockDoctorData} onClose={onCloseMock}></OverviewPopup>
        </AuthContextProvider>,{ wrapper: MemoryRouter }
    );

    expect(getByText('Doctor Overview')).toBeInTheDocument();
    expect(getByText(mockDoctorData.doctor)).toBeInTheDocument();
});


test('should show a review popup when rate button is clicked', () => {
    const isLoging = true;
     useAuth.mockReturnValue({
      isLoging: isLoging,
    });
    const onCloseMock = jest.fn();

   render( <AuthContextProvider><OverviewPopup doctorData={mockDoctorData} onClose={onCloseMock} /></AuthContextProvider>
    );

    fireEvent.click(screen.getAllByRole("Button",{ name: /rate/i }));

    expect(getByText('تقييم')).toBeInTheDocument();
});


test('should show a notes popup when show button is clicked', () => {
    const onCloseMock = jest.fn();

    const { getByTitle } = render(<AuthContextProvider><OverviewPopup doctorData={mockDoctorData} onClose={onCloseMock} /></AuthContextProvider>);

    fireEvent.click(getByTitle("showbtn"));

    expect(getByText('ملاحظات المراجعة')).toBeInTheDocument();
  });



  test('should close the component when close button is clicked', () => {
    const onCloseMock = jest.fn();

    const { getByText } =  render(<AuthContextProvider><OverviewPopup doctorData={mockDoctorData} onClose={onCloseMock} /></AuthContextProvider>);

      fireEvent.click(getByText('rate'));

    expect(onCloseMock).toHaveBeenCalled();
  });