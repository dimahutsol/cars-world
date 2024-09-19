import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchAllCarsThunk } from './operations';

const initialState = {
  cars: [],
  favoriteCars: [],
  filter: '',
  page: 1,
  total: 32,
  loading: false,
  error: false,
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    toggleFavoriteCar(state, { payload }) {
      if (state.favoriteCars.includes(payload)) {
        state.favoriteCars = state.favoriteCars.filter(id => id !== payload);
      } else {
        state.favoriteCars.push(payload);
      }
    },
    setFilter(state, { payload }) {
      state.filter = payload === 'all' ? '' : payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllCarsThunk.fulfilled, (state, { payload }) => {
        state.total = payload.total ?? state.total;
        state.cars = [...state.cars, ...payload];
        state.page++;
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
export const { toggleFavoriteCar, setFilter } = carsSlice.actions;
