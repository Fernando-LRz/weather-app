import { CitiesGeoDBResponse } from '../interfaces/CityInterfaces';
import GeoDBApi from '../api/GeoDBApi';

const useCities = () => {

    const getCities = async ( search: string ) => {

        try {
            const response = await GeoDBApi.get<CitiesGeoDBResponse>(`/cities?namePrefix=${search}&limit=2`);
            return [...response.data.data]

        } catch (error) {
            console.error({error});
        }
    };

    return {
        getCities
    }
};

export default useCities;