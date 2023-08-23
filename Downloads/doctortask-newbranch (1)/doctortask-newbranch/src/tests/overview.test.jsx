import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AuthContextProvider, useAuth } from '../Components/context/Auth/AuthContextProvider';
import OverviewPopup from '../Components/Overview';
import { useAuth } from '../Components/context/Auth/AuthContextProvider';
describe('OverviewPopup', () => {
  const mockDoctorData = {
    id: 1,
    doctor: 'Doctor A',
    city: 'City A',
    mobile: '123456789',
    major: 'Specialty A',
    address: 'Address A',
  };

  it('should render correctly', () => {
    const onCloseMock = jest.fn();

    const { getByText } = render(
      <AuthContextProvider>
         <OverviewPopup doctorData={mockDoctorData} onClose={onCloseMock} />
      </AuthContextProvider>
   );

    expect(getByText("Doctor Overview")).toBeInTheDocument();
    expect(getByText(mockDoctorData.doctor)).toBeInTheDocument();
  });

  it('should show a review popup when قيم button is clicked', () => {
    const onCloseMock = jest.fn();
    const isLoginMock=true;
    useAuth.mockReturnValue({
      isLogin: isLoginMock,
    });
    
    const { getByText } = render( <AuthContextProvider>
      <OverviewPopup doctorData={mockDoctorData} onClose={onCloseMock} />
   </AuthContextProvider>);

    fireEvent.click(getByText("rate"));
 
    expect(getByText('تقييم')).toBeInTheDocument();
  });

  it('should show a notes popup when عرض button is clicked', () => {
    const onCloseMock = jest.fn();

    const { getByText } = render(<OverviewPopup doctorData={mockDoctorData} onClose={onCloseMock} />);

    fireEvent.click(getByText('عرض'));

    expect(getByText('ملاحظات المراجعة')).toBeInTheDocument();
  });

  it('should close the component when اغلاق button is clicked', () => {
    const onCloseMock = jest.fn();

    const { getByText } = render(<OverviewPopup doctorData={mockDoctorData} onClose={onCloseMock} />);

    fireEvent.click(getByText('اغلاق'));

    expect(onCloseMock).toHaveBeenCalled();
  });
});
