import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { fetchAllCarsThunk } from './operations';
import { toastError, toastSuccess } from '../../helpers/toasts';

const initialState = {
  cars: [],
  favoriteCars: [],
  filter: '',
  filterRentalPrice: null,
  filterMileageFrom: null,
  filterMileageTo: null,
  maxCarsRentalPrice: 0,
  page: 1,
  total: 32,
  isLoading: false,
  isError: false,
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    toggleFavoriteCar(state, { payload }) {
      if (state.favoriteCars.some(item => item.id === payload.id)) {
        state.favoriteCars = state.favoriteCars.filter(
          item => item.id !== payload.id
        );
        toastSuccess('Removed from favorites');
      } else {
        state.favoriteCars.push(payload);
        toastSuccess('Added to favorites');
      }
    },
    setFilter(state, { payload }) {
      state.filter = payload.value === 'all' ? '' : payload;
    },
    setFilterRentalPrice(state, { payload }) {
      state.filterRentalPrice = payload;
    },
    setFilterMileageFrom(state, { payload }) {
      state.filterMileageFrom = payload;
    },
    setFilterMileageTo(state, { payload }) {
      state.filterMileageTo = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllCarsThunk.fulfilled, (state, { payload }) => {
        state.total = payload.total ?? state.total;
        state.cars = [...state.cars, ...payload];
        state.page++;
        state.maxCarsRentalPrice = state.cars.reduce((acc, item) => {
          const price = parseFloat(item.rentalPrice.replace('$', ''));
          return price > acc ? price : acc;
        }, 0);
      })
      .addMatcher(isAnyOf(fetchAllCarsThunk.fulfilled), state => {
        state.isLoading = false;
        state.isError = false;
      })
      .addMatcher(isAnyOf(fetchAllCarsThunk.pending), state => {
        state.isLoading = true;
        state.isError = false;
      })
      .addMatcher(isAnyOf(fetchAllCarsThunk.rejected), state => {
        state.isLoading = false;
        state.isError = true;
        toastError();
      });
  },
});

export const carsReducer = carsSlice.reducer;
export const {
  toggleFavoriteCar,
  setFilter,
  setFilterRentalPrice,
  setFilterMileageFrom,
  setFilterMileageTo,
} = carsSlice.actions;
