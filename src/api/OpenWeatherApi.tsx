import axios from 'axios';
import { openWeatherApiKey } from '@env';

const OpenWeatherApi = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    params: {
        appid: openWeatherApiKey
    }
});

export default OpenWeatherApi;