import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchApiData } from '../services/api';

export const fetchDoctors = createAsyncThunk('doctor/fetchDoctors', async () => {
  const response = await fetchApiData();
  return response.data;
});

const doctorSlice = createSlice({
  name: 'doctor',
  initialState: {
    doctors: [],
    filteredDoctors: [],
    majors: [],
    city: [],
    nameFilter: '',
    specializationFilter: 'جميع التخصصات',
    regionFilter: 'الجميع',
  },
  reducers: {
    setNameFilter: (state, action) => {
      state.nameFilter = action.payload;
    },
    setSpecializationFilter: (state, action) => {
      state.specializationFilter = action.payload;
    },
    setRegionFilter: (state, action) => {
      state.regionFilter = action.payload;
    },
    applyFilters: (state) => {
      const { doctors, nameFilter, specializationFilter, regionFilter } = state;

      if (regionFilter === 'الجميع' && specializationFilter === 'جميع التخصصات' && nameFilter === '') {
        state.filteredDoctors = doctors;
      } else {
        const filtered = doctors.filter((doctor) => {
          const nameMatch = nameFilter === '' || doctor.doctor.includes(nameFilter);
          const specMatch = specializationFilter === 'جميع التخصصات' || doctor.major === specializationFilter;
          const regionMatch = regionFilter === 'الجميع' || doctor.city === regionFilter;

          return nameMatch && specMatch && regionMatch;
        });
        state.filteredDoctors = filtered;
      }
    },

  },
  extraReducers: (builder) => {
    builder.addCase(fetchDoctors.fulfilled, (state, action) => {
      state.doctors = action.payload;
      state.filteredDoctors = action.payload;
      const forMajor = action.payload.map((doctor) => doctor.major);
      state.majors = ['جميع التخصصات', ...forMajor];
      const forCity = action.payload.map((doctor) => doctor.city);
      const arrayForSort = ['الجميع', ...forCity.sort()];
      arrayForSort.forEach((region) => {
        if (!state.city.includes(region)) {
          state.city.push(region);
        }
      });
    });
  },
});

export const {
  setNameFilter,
  setSpecializationFilter,
  setRegionFilter,
  applyFilters,
} = doctorSlice.actions;

export default doctorSlice.reducer;
