import React from 'react'
import cities from '../../data/cities.json'
import './city-list.css'
import FavouriteCity from "../favourite-city";
import {useDispatch, useSelector} from "react-redux";
import {addCity, openTab} from "../../reducers/city-list-slice";
import {RootState} from "../../app/store";

const CityList = () => {
  const dispatch = useDispatch()
  const showList = useSelector((state: RootState) => state.cityList.open)
  const cityName = useSelector((state: RootState) => state.cityList.cityName)

   return (
    <div className="container">
      <div className="container-city">
        <p>Add a city...</p>
        <button onClick={() => dispatch(openTab())}>+</button>
      </div>
      {showList && (
        <div className="container-city__list">
          {cities.map(city => {
            return (
              <div className="container-city__list__city" key={city._id}>
                <button className="container-city__list__bottom" onClick={() => dispatch(addCity({value: city.name}))}>
                  {city.name}
                </button>
              </div>
            )
            })}
        </div>
      )}
      {cityName && <FavouriteCity />}
    </div>
  )
}

export default CityList
