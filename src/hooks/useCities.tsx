import { GeoDBApi } from '../api/GeoDBApi';
import { CitiesGeoDBResponse, CityGeoDBResponse } from '../interfaces/CityInterfaces';

export const useCities = () => {

    const getCities = async ( search: string ) => {
        try {
            const cities = await GeoDBApi.get<CitiesGeoDBResponse>(`/cities?namePrefix=${search}&limit=10`);
            return [ ...cities.data.data ];

        } catch (error) {
            console.error({ error });
        }
    };

    const getCity = async ( id: number ) => {
        try {
            const response = await GeoDBApi.get<CityGeoDBResponse>(`/cities/${id}`);
            return response.data;

        } catch (error) {
            console.error({ error });
        }
    }

    return {
        getCities,
        getCity
    }
};