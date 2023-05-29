import './city-list.css'
import FavouriteCity from '../favourite-city';
import React from 'react'
import cities from '../../data/cities.json'
import {RootState} from '../../app/store';
import {addCity, openTab} from '../../reducers/city-list-slice';
import {useDispatch, useSelector} from 'react-redux';

const CityList = () => {
  const dispatch = useDispatch()
  const showList = useSelector((state: RootState) => state.cityList.open)

   return (
    <div className="container">
      <button className="container-city" onClick={() => dispatch(openTab())}>
        <p>Add a city...</p>
        <p>+</p>
      </button>
      {showList && (
        <div className="container-city__list">
          {cities.map(city => {
            return (
              <div className="container-city__list__city" key={city._id}>
                <button
                  className="container-city__list__bottom"
                  onClick={() => dispatch(addCity(city.name))}>
                  {city.name}
                </button>
              </div>
            )
            })}
        </div>
      )}
      <FavouriteCity />
    </div>
  )
}

export default CityList
