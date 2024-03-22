import { OpenWeatherApi } from '../api/OpenWeatherApi';

import { OpenWeatherResponse } from '../interfaces/CurrentWeatherInterfaces';
import { OpenWeatherForecastResponse } from '../interfaces/WeatherForecastInterfaces';

export const useWeather = () => {

    const getCurrentWeather = async ( lat: number, lon: number ) => {
        try {
            const response = await OpenWeatherApi.get<OpenWeatherResponse>(`/weather?lat=${lat}&lon=${lon}&units=metric`);
            return response.data;

        } catch (error) {
            console.error({ error });
        }
    };

    const getWeatherForecast = async ( lat: number, lon: number ) => {
        try {
            const response = await OpenWeatherApi.get<OpenWeatherForecastResponse>(`/forecast?lat=${lat}&lon=${lon}&units=metric`);
            return response.data;

        } catch (error) {
            console.error({ error });
        }
    };

    return {
        getCurrentWeather,
        getWeatherForecast
    }
};