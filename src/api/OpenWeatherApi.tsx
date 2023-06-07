import axios from 'axios';

const OpenWeatherApi = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    params: {
        appid: 'e3a58c632d0f94bf3c0dd01940621fc1'
    }
});

export default OpenWeatherApi;