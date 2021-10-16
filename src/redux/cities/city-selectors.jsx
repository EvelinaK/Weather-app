import { createSelector } from '@reduxjs/toolkit';

const getLoading = state => state.cities.loading;
const getError = state => state.error;
const getfetch = state => state.cities.favouriteCities;

const getFilter = state => state.cities.filter;

export const getItem = state => state.cities.items;

export const getFavouriteCities = state => state.cities.favouriteCities;

export const getLocation = state => state.cities.location.coord;

export const getLocationWeather = state => state.cities.location;

export const getFavouriteCityByID = (state, weatherId) => {
    const allFavorites = getFavouriteCities(state);
    return allFavorites.find(({ weather }) => weather.id === weatherId);
};

export const getForecast = state => state.cities.forecast;

const getTotalCitiesCount = state => {
    const cities = getItem(state);

    return cities.length;
};

export default {
    getLoading,
    getError,
    getItem,
    getfetch,
    getForecast,
    getFilter,
    getTotalCitiesCount,
    getFavouriteCities,
    getLocation,
    getLocationWeather,
};