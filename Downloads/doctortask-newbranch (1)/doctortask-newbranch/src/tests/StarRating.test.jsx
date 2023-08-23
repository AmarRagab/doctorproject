import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StarRating from './StarRating';

describe('StarRating', () => {
  it('should render correctly', () => {
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

  it('should trigger onRatingChange when a star is clicked', async () => {
    const onRatingChangeMock = jest.fn();

    const { getAllByText } = render(
      <StarRating rating={0} onRatingChange={onRatingChangeMock} />
    );

    const stars = getAllByText('★');

    fireEvent.click(stars[2]);

    await waitFor(() => {
      expect(onRatingChangeMock).toHaveBeenCalledWith(3);
      expect(stars.filter((star) => star.classList.contains('text-yellow-500')).length).toBe(3);
      expect(stars.filter((star) => star.classList.contains('text-gray-400')).length).toBe(2);
    });
  });
});
