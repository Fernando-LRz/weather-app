import axios from 'axios';
import { openWeatherApiKey } from '@env';

export const OpenWeatherApi = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    params: {
        appid: openWeatherApiKey
    }
});