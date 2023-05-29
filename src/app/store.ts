import cityListSlice from '../reducers/city-list-slice'
import favouriteCitySlice from '../reducers/favourite-city-slice'
import storage from 'redux-persist/lib/storage'
import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'

const reducers = combineReducers({
  favouriteCity: favouriteCitySlice,
  cityList: cityListSlice
})

const persistConfig = {
  key: 'root',
  version: 1,
  storage
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

