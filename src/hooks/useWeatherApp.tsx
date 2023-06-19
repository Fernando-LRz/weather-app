import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useCities from '../hooks/useCities';
import useCurrentWeather from '../hooks/useCurrentWeather';
import onlyLettersAndSpaces from '../helpers/onlyLettersAndSpaces';

import { FullCity, SimpleCity } from '../interfaces/CityInterfaces';
import { OpenWeatherResponse } from '../interfaces/CurrentWeatherInterfaces';

const useWeatherApp = () => {
    const [ cities, setCities ] = useState<SimpleCity[]>([]);
    const [ isLoadingCities, setIsLoadingCities ] = useState(false);

    const { getCities, getCity } = useCities();

    const [ isAnError, setIsAnError ] = useState(false);

    const [ city, setCity ] = useState<FullCity>({} as FullCity);
    const [ isLoadingCityInfo, setIsLoadingCityInfo ] = useState(true);

    const [ currentWeather, setCurrentWeather ] = useState<OpenWeatherResponse>({} as OpenWeatherResponse);
    const [ isLoadingWeather, setIsLoadingWeather ] = useState(true);
    const { getWeather } = useCurrentWeather();

    useEffect(() => {
        if (!city.name) return;
        setIsLoadingCityInfo(false);
    }, [ city ])

    useEffect(() => {
        if (!currentWeather.main) return;
        setIsLoadingWeather(false);
    }, [ currentWeather ])

    useEffect(() => {
        if(cities.length === 0 || !isLoadingCities) return;
        setIsLoadingCities(false);
    }, [ cities ]);

    const loadCities = async (searchTerm: string) => {
        setCities([]);

        if( !searchTerm || !onlyLettersAndSpaces(searchTerm)) return;
        setIsLoadingCities(true);

        const cities = await getCities(searchTerm);
        if(!cities || cities.length === 0) return;

        setCities(cities);
    }

    const loadDefaultCity = async (id: number = 3453102) => {
        const cityId = await AsyncStorage.getItem('cityId');
        if(cityId) id = Number(cityId);

        const city = await getCity(id);

        if(!city) {
            setIsAnError(true);
            return;
        }
        
        setCity(city.data);
    }

    const loadNewCity = async (id: number) => {
        setIsLoadingCityInfo(true);
        setIsLoadingWeather(true);

        setCities([]);

        await AsyncStorage.setItem('cityId', id.toString());

        loadDefaultCity();
    }

    const loadDefaultCityCurrentWeather = async (lat: number, lon: number) => {
        const weather = await getWeather(lat, lon);

        if(!weather) {
            setIsAnError(true);
            return;
        }
        
        setCurrentWeather(weather);
    }

    return {
        cities, 
        loadDefaultCity,
        loadDefaultCityCurrentWeather,
        loadNewCity,
        loadCities,
        isAnError,
        city,
        isLoadingCityInfo,
        currentWeather, 
        isLoadingWeather,
        isLoadingCities
    }
}

export default useWeatherApp;