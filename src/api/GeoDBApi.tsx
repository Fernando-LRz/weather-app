import axios from 'axios';

const GeoDBApi = axios.create({
    baseURL: 'https://wft-geo-db.p.rapidapi.com/v1/geo',
    headers: {
        'X-RapidAPI-Key': 'API_KEY_HERE',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
});

export default GeoDBApi;