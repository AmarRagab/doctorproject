import React from 'react';
import { render, fireEvent,screen } from '@testing-library/react';
import StarRating from '../Components/StarRating';
import { waitFor } from '@testing-library/react';
test('should render correctly', () => {
    const rating = 3;
    const onRatingChangeMock = jest.fn();

    const { getAllByText } = render(
      <StarRating rating={rating} onRatingChange={onRatingChangeMock} />
    );

    const stars = getAllByText('★');

    expect(stars.length).toBe(5);

    expect(stars.filter((star) => star.classList.contains('text-yellow-500')).length).toBe(rating);
    expect(stars.filter((star) => star.classList.contains('text-gray-400')).length).toBe(5 - rating);
  });


    test('should trigger onRatingChange when a star is clicked', async () => {
        const onRatingChangeMock = jest.fn();
    
       render(
          <StarRating rating={0} onRatingChange={onRatingChangeMock} />
        );
    
        const stars = screen.getAllByText('★');
    
        fireEvent.click(stars[2]);
    
        await waitFor(() => {
          expect(stars.filter((star) => star.classList.contains('text-yellow-500')).length).toBe(3);
          expect(stars.filter((star) => star.classList.contains('text-gray-400')).length).toBe(2);
          expect(onRatingChangeMock).toHaveBeenCalledWith(3);
        });
      });