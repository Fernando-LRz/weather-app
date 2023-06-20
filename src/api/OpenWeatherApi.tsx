import axios from 'axios';

const OpenWeatherApi = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    params: {
        appid: '394d380d13100ca249790f5342d7e519'
    }
});

export default OpenWeatherApi;