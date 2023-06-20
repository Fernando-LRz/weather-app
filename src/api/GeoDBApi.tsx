import axios from 'axios';

const GeoDBApi = axios.create({
    baseURL: 'https://wft-geo-db.p.rapidapi.com/v1/geo',
    headers: {
        'X-RapidAPI-Key': '098acf6c32msh6eba01cc073d67cp1247aejsn8fc160048fbf',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
});

export default GeoDBApi;