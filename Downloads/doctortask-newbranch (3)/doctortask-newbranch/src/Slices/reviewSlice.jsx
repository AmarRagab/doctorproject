import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rating: 0,
  notes: '',
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
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

export const { setRating, setNotes, clearReview ,rating,notes} = reviewSlice.actions;

export default reviewSlice.reducer;
