import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeModal: null,
};

const slice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.activeModal = action.payload;
    },
    closeModal: state => {
      state.activeModal = null;
    },
  },
});

export const modalReducer = slice.reducer;
export const { openModal, closeModal } = slice.actions;
