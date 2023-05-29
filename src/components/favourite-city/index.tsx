import './favourite-city.css'
import React, {useEffect} from 'react'
import axios from "axios";
import {OW_APIKEY, OW_BASEURL} from "../../data/config";
import {RootState} from "../../app/store";
import {showError, removeCity, getData, setLoading, setData} from "../../reducers/favourite-city-slice";
import {useDispatch, useSelector} from "react-redux";

type city = {
	[key: string]: any
}

const FavouriteCity = () => {
	const dispatch = useDispatch()
	// const getStorageData = JSON.parse(localStorage.getItem('favourite-cities') as string)
	const cityName = useSelector((state: RootState) => state.cityList.cityName)
	const selectedData: city[] = useSelector((state: RootState) => state.favouriteCity.selectedCity)
	const loading = useSelector((state: RootState) => state.favouriteCity.loading)
	const error = useSelector((state: RootState) => state.favouriteCity.error)

	const getCity = async (cityName: string, override?: boolean) => {
		dispatch(setLoading(true))
		if(override || !selectedData?.includes((item: city) => item?.name === cityName)){
			axios.get(`${OW_BASEURL}/weather?q=${cityName}&appid=${OW_APIKEY}`)
			.then( ( res)=> {
				const data = res.data
				dispatch(setLoading(false))
				dispatch(getData(data))
			})
				.catch( (err) => {
					dispatch(showError(err.message))
				})
		}
	}

	useEffect(() => {
		if (cityName?.length > 0) getCity(cityName)
	}, [cityName]);

	useEffect(() => {
		dispatch(setData(selectedData))
	}, []);

  return (
    <div className="container-favourite">
			<h3>Favourite cities</h3>
			<div className="container-favourite-city">
			{selectedData?.map( (city) => {
				return (
					<div className="favourite-city" key={city.name}>
						<div className="favourite-city__weather">
							<p>{city.name}</p>
							<img
								className="favourite-city__icon"
								alt='weather-icon'
								src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}/>
							<p>{city.weather[0].description}</p>
						</div>
						<div className="favourite-city__actions">
							<button
								onClick={() => getCity(city.name, true)}
							>
								refresh
							</button>
							<button
								onClick={() => dispatch(removeCity(city.name))}
							>
								X
							</button>
						</div>
					</div>
				)
			})}
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
			</div>
    </div>
  )
}

export default FavouriteCity
