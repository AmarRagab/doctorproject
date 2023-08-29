import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reviews:[],
  averageRating:0,
  selectedReview:null,
  isReviewPopupOpen:false,
};

const overviewSlice = createSlice({
  name: 'overview',
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
  },
});

export const { setReviews, setAverageRating, setSelectedReview ,setIsReviewPopupOpen} = overviewSlice.actions;

export default overviewSlice.reducer;
