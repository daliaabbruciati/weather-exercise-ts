import favouriteCitySlice from '../reducers/favourite-city-slice';
import {configureStore, ThunkAction, Action, combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import cityListSlice from "../reducers/city-list-slice";

const reducers = combineReducers({
  favouriteCity: favouriteCitySlice,
  cityList: cityListSlice
})

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  middleware: (getDefaultMiddleware: any) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  ],
}

const persistedReducer = persistReducer(persistConfig, reducers)


export const store = configureStore({
  reducer: persistedReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

