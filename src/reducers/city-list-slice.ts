import {createSlice} from "@reduxjs/toolkit";

interface InitialStateType {
	open: boolean
	cityName: string
}

const initialState: InitialStateType = {
	open: false,
	cityName: ''
}

const cityListSlice = createSlice({
	name: 'favourite-city',
	initialState,
	reducers: {
		addCity: (state, action) => {
			state.cityName = action.payload.value
			state.open = false
		},
		openTab: state => {
			state.open = !state.open
			state.cityName = initialState.cityName

		}
	}
})

export const { addCity, openTab } = cityListSlice.actions
export default cityListSlice.reducer
