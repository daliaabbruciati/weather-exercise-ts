import {createSlice} from "@reduxjs/toolkit";

type city = {
	[key: string]: any
}

interface InitialStateType {
	selectedCity: object[],
	loading: boolean
	error: string
}

const initialState: InitialStateType = {
	selectedCity: [],
	loading: true,
	error: ''
}

const cityListSlice = createSlice({
	name: 'favourite-city',
	initialState,
	reducers: {
		updateData: (state, action) => {
			state.selectedCity.push(action.payload.value)
			state.loading = false
		},
		removeCity: (state, action) => {
			state.selectedCity = state.selectedCity.filter((removed: city) => removed.name !== action.payload.value)
		},
		refreshData: (state, action) => {

		},
		showError: (state, action) => {
			state.error = action.payload.value
			state.loading = false
		},
	},
})

export const {  removeCity, showError, updateData } = cityListSlice.actions
export default cityListSlice.reducer
