import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchAllCarsThunk } from './operations';

const initialState = {
  cars: [],
  loading: false,
  error: false,
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchAllCarsThunk.fulfilled, (state, { payload }) => {
        state.cars = payload;
      })
      .addMatcher(isAnyOf(fetchAllCarsThunk.fulfilled), state => {
        state.loading = false;
        state.error = false;
      })
      .addMatcher(isAnyOf(fetchAllCarsThunk.pending), state => {
        state.loading = true;
        state.error = false;
      })
      .addMatcher(isAnyOf(fetchAllCarsThunk.rejected), state => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const carsReducer = carsSlice.reducer;
