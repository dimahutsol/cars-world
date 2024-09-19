import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const advertsApi = axios.create({
  baseURL: 'https://66e9c3ad87e41760944aae8b.mockapi.io/',
});

export const fetchAllCarsThunk = createAsyncThunk(
  'cars/fetchAllCars',
  async (params, thunkApi) => {
    try {
      const { data } = await advertsApi.get('adverts', { params });
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
