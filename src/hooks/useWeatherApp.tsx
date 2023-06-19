import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useCities from '../hooks/useCities';
import useWeather from './useWeather';
import onlyLettersAndSpaces from '../helpers/onlyLettersAndSpaces';

import { FullCity, SimpleCity } from '../interfaces/CityInterfaces';
import { OpenWeatherResponse } from '../interfaces/CurrentWeatherInterfaces';
import { OpenWeatherForecastResponse } from '../interfaces/WeatherForecastInterfaces';

const useWeatherApp = () => {
    const [ cities, setCities ] = useState<SimpleCity[]>([]);
    const [ isLoadingCities, setIsLoadingCities ] = useState(false);

    const { getCities, getCity } = useCities();

    const [ isAnError, setIsAnError ] = useState(false);

    const [ city, setCity ] = useState<FullCity>({} as FullCity);
    const [ isLoadingCityInfo, setIsLoadingCityInfo ] = useState(true);

    const [ currentWeather, setCurrentWeather ] = useState<OpenWeatherResponse>({} as OpenWeatherResponse);
    const [ weatherForecast, setWeatherForecast ] = useState<OpenWeatherForecastResponse>({} as OpenWeatherForecastResponse);
    const [ isLoadingWeather, setIsLoadingWeather ] = useState(true);

    const { getCurrentWeather, getWeatherForecast } = useWeather();

    useEffect(() => {
        loadCity();
    }, []);

    useEffect(() => {
        if (!city.id) return;
        loadWeather(city.latitude, city.longitude);
        setIsLoadingCityInfo(false);
    }, [ city ]);

    useEffect(() => {
        if (!currentWeather.cod || !weatherForecast.cod) return;
        setIsLoadingWeather(false);
    }, [ currentWeather, weatherForecast ]);

    useEffect(() => {
        if(cities.length === 0 || !isLoadingCities) return;
        setIsLoadingCities(false);
    }, [ cities ]);

    const loadCities = async (searchTerm: string) => {
        setCities([]);

        if(!searchTerm || !onlyLettersAndSpaces(searchTerm)) return;
        setIsLoadingCities(true);

        const cities = await getCities(searchTerm);
        if(!cities || cities.length === 0) return;

        setCities(cities);
    }

    const loadCity = async (id: number = 3453102) => {
        const cityId = await AsyncStorage.getItem('cityId');
        if(cityId) id = Number(cityId);

        const city = await getCity(id);

        if(!city) {
            setIsAnError(true);
            return;
        }
        
        setCity(city.data);
    }

    const loadWeather = async (lat: number, lon: number) => {
        const currentWeatherPromise = getCurrentWeather(lat, lon);
        const weatherForecastPromise = getWeatherForecast(lat, lon);

        const [ currentWeather, weatherForecast ] = await Promise.all([      
            currentWeatherPromise, 
            weatherForecastPromise 
        ]);

        if(!currentWeather || !weatherForecast) {
            setIsAnError(true);
            return;
        }
        
        setCurrentWeather(currentWeather);
        setWeatherForecast(weatherForecast);
    }

    const loadNewCity = async (id: number) => {
        setIsLoadingCityInfo(true);
        setIsLoadingWeather(true);

        setCities([]);

        await AsyncStorage.setItem('cityId', id.toString());

        loadCity();
    }

    return {
        city,
        cities, 
        isLoadingCityInfo,
        isLoadingWeather,
        isLoadingCities,
        currentWeather, 
        isAnError,
        loadNewCity,
        loadCities
    }
}

export default useWeatherApp;