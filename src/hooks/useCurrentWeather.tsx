import OpenWeatherApi from '../api/OpenWeatherApi';
import { OpenWeatherResponse } from '../interfaces/WeatherInterfaces';

const useCurrentWeather = () => {

    const getWeather = async ( lat: number, lon: number ) => {

        try {
            const response = await OpenWeatherApi.get<OpenWeatherResponse>(`/weather?lat=${lat}&lon=${lon}&units=metric`);
            return response.data;

        } catch (error) {
            console.error({ error });
        }
    };

    return {
        getWeather
    }
};

export default useCurrentWeather;