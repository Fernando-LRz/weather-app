import axios from 'axios';

const OpenWeatherApi = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    params: {
        appid: 'API_KEY_HERE'
    }
});

export default OpenWeatherApi;