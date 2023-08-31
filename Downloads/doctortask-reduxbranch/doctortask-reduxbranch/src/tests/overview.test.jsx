import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import OverviewPopup from './OverviewPopup';

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

    const { getByText } = render(<OverviewPopup doctorData={mockDoctorData} onClose={onCloseMock} />);

    expect(getByText('ملخص الدكتور')).toBeInTheDocument();
    expect(getByText(mockDoctorData.doctor)).toBeInTheDocument();
  });

  it('should show a review popup when قيم button is clicked', () => {
    const onCloseMock = jest.fn();

    const { getByText } = render(<OverviewPopup doctorData={mockDoctorData} onClose={onCloseMock} />);

    fireEvent.click(getByText('قيم'));

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
