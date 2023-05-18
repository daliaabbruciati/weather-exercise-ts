import cityListSlice from "../reducers/city-list-slice";
import favouriteCitySlice from "../reducers/favourite-city-slice";
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    cityList: cityListSlice,
    favouriteCity: favouriteCitySlice
  },
  devTools: true
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
