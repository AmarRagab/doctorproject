import React from 'react';
import { render } from "@testing-library/react";
import {fireEvent,screen } from '@testing-library/react';
import { AuthContextProvider } from '../Components/context/Auth/AuthContextProvider';
import ReviewPopup from '../Components/ReviewDialog';
jest.mock('../Components/context/Auth/AuthContextProvider', () => ({
  useAuth: () => ({
    user: {
      username: 'testUser',
    },
  }),
}));

describe('ReviewPopup', () => {
  it('should render correctly', () => {
    const onSaveMock = jest.fn();
    const onCancelMock = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <ReviewPopup onSave={onSaveMock} onCancel={onCancelMock} />
    );

    expect(getByText('تقييم')).toBeInTheDocument();
    expect(getByPlaceholderText('أكتب ملاحظاتك...')).toBeInTheDocument();
    expect(getByText('اغلاق')).toBeInTheDocument();
  });

  it('should trigger onSave when save button is clicked with valid rating', () => {
    const onSaveMock = jest.fn();
    const onCancelMock = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <ReviewPopup onSave={onSaveMock} onCancel={onCancelMock} />
    );

    fireEvent.click(getByText('★')); 

    const notesTextarea = getByPlaceholderText('أكتب ملاحظاتك...');
    fireEvent.change(notesTextarea, { target: { value: 'This is a test review.' } });

    fireEvent.click(screen.getByText('حفظ'));

    expect(onSaveMock).toHaveBeenCalledWith({
      reviewer: 'testUser',
      rating: 5,
      notes: 'This is a test review.',
      date: expect.any(String),
    });
  });

  it('should not trigger onSave when save button is clicked with no rating', () => {
    const rating=1;
    
    const onSaveMock = jest.fn();
    const onCancelMock = jest.fn();
    const { getByText } = render(
      <ReviewPopup onSave={onSaveMock} onCancel={onCancelMock} />
    );

    fireEvent.click(getByText('save'));

    expect(onSaveMock).not.toHaveBeenCalled();
  });

  it('should trigger onCancel when cancel button is clicked', () => {
    const onSaveMock = jest.fn();
    const onCancelMock = jest.fn();
    const { getByText } = render(
      <ReviewPopup onSave={onSaveMock} onCancel={onCancelMock} />
    );

    fireEvent.click(getByText('اغلاق'));

    expect(onCancelMock).toHaveBeenCalled();
  });
});
