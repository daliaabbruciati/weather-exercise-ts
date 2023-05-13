import React, {useEffect} from 'react'
import {OW_APIKEY, OW_BASEURL} from "../../data/config";
import './favourite-city.css'
import {useDispatch, useSelector} from "react-redux";
import {showError, removeCity, updateData} from "../../reducers/favourite-city-slice";
import {RootState} from "../../app/store";

type city = {
	[key: string]: any
}

const FavouriteCity = () => {
	const dispatch = useDispatch()
	const cityName = useSelector((state: RootState) => state.cityList.cityName)
	const selectedData: city[] = useSelector((state: RootState) => state.favouriteCity.selectedCity)
	const loading = useSelector((state: RootState) => state.favouriteCity.loading)
	const error = useSelector((state: RootState) => state.favouriteCity.error)

	const getCity = async (cityName: string) => {
		try {
			const response = await fetch(`${OW_BASEURL}/weather?q=${cityName}&appid=${OW_APIKEY}`)
			const result = await response.json()
			if(!selectedData.map(item => item.name).includes(cityName)){
				dispatch(updateData({value: result}))
			}
		}catch (error) {
			dispatch(showError({value: error.message}))
		}
	}

	useEffect(() => {
		getCity(cityName)
	}, [cityName]);


  return (
    <div className="container-favourite">
			<h3>Favourite cities</h3>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
			<div className="container-favourite-city">
			{selectedData.map( (select) => {
				return (
					<div className="favourite-city" key={select.name}>
						<div className="favourite-city__weather">
							<p>{select.name}</p>
							<img
								className="favourite-city__icon"
								alt='weather-icon'
								src={`https://openweathermap.org/img/wn/${select.weather[0].icon}@2x.png`}/>
							<p>{select.weather[0].description}</p>
						</div>
						<div className="favourite-city__actions">
							<button>refresh</button>
							<button onClick={() => dispatch(removeCity({value: select.name}))}>X</button>
						</div>
					</div>
				)
			})}
			</div>
    </div>
  )
}

export default FavouriteCity
