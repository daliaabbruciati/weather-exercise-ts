import {createSlice} from "@reduxjs/toolkit";

type city = {
	[key: string]: any
}

interface InitialStateType {
	selectedCity: object[],
	loading: boolean
	error: string | null
}

const initialState: InitialStateType = {
	selectedCity: [],
	loading: false,
	error: null
}

const favouriteCitySlice = createSlice({
	name: 'favourite-city',
	initialState,
	reducers: {
		getData: (state, action) => {
			const itemIndex = state.selectedCity.findIndex((item: city) => item.name === action.payload.name)
			if(itemIndex >= 0){
				state.selectedCity[itemIndex] = action.payload
			}else {
				state.selectedCity.push(action.payload)
				localStorage.setItem('favourite-cities', JSON.stringify(state.selectedCity))
			}
		},
		removeCity: (state, action) => {
			state.selectedCity = state.selectedCity.filter((removed: city) => removed.name !== action.payload)
			localStorage.setItem('favourite-cities', JSON.stringify(state.selectedCity))
		},
		showError: (state, action) => {
			state.loading = initialState.loading
			state.error = action.payload
		},
		setLoading: (state, action) => {
			state.loading = action.payload
		},
		setData: (state, action) => {
			state.selectedCity = action.payload
		}
	},
})

export const {  getData, removeCity, showError, setLoading, setData } = favouriteCitySlice.actions
export default favouriteCitySlice.reducer
