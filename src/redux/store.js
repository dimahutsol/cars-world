import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { modalReducer } from './modal/slice';
import { carsReducer } from './cars/slice';

const carsPersistConfig = {
  key: 'cars',
  storage,
  whitelist: ['favoriteCars'],
};

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    cars: persistReducer(carsPersistConfig, carsReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
