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

//TODO: aggiungere localstore

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
			}
		},
		removeCity: (state, action) => {
			state.selectedCity = state.selectedCity.filter((removed: city) => removed.name !== action.payload.value)
		},
		showError: (state, action) => {
			state.loading = initialState.loading
			state.error = action.payload
		},
		setLoading: (state, action) => {
			state.loading = action.payload
		}
	},
})

export const {  removeCity, setLoading, showError, getData } = favouriteCitySlice.actions
export default favouriteCitySlice.reducer
