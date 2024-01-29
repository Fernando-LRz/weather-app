import axios from 'axios';
import { rapidGeoAPIKey } from '@env';

const GeoDBApi = axios.create({
    baseURL: 'https://wft-geo-db.p.rapidapi.com/v1/geo',
    headers: {
        'X-RapidAPI-Key': rapidGeoAPIKey,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
});

export default GeoDBApi;