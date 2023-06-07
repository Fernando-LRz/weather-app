import axios from 'axios';

const GeoDBApi = axios.create({
    baseURL: 'https://wft-geo-db.p.rapidapi.com/v1/geo',
    headers: {
        'X-RapidAPI-Key': 'af63cf28fcmsh7629bcaedbd16f4p1d50c1jsn230be6ef1d2b',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    },
    params: {
        limit: 10
    }
});

export default GeoDBApi;