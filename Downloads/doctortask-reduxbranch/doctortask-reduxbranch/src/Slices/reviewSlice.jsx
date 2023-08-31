import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reviews: [],
  averageRating: 0,
  selectedReview: null,
  isReviewPopupOpen: false,
  rating: 0,
  notes: '',
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setReviews(state, action) {
      state.reviews = action.payload;
    },
    setAverageRating(state, action) {
      state.averageRating = action.payload;
    },
    setSelectedReview(state, action) {
      state.selectedReview = action.payload;
    },
    setIsReviewPopupOpen(state, action) {
      state.isReviewPopupOpen = action.payload;
    },

    setRating(state, action) {
      state.rating = action.payload;
    },
    setNotes(state, action) {
      state.notes = action.payload;
    },
    clearReview(state) {
      state.rating = 0;
      state.notes = '';
    },
  },
});

export const {
  setReviews,
  setAverageRating,
  setSelectedReview,
  setIsReviewPopupOpen,
  setRating,
  setNotes,
  clearReview,
} = reviewSlice.actions;

export default reviewSlice.reducer;
