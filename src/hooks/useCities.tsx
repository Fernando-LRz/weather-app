import GeoDBApi from "../api/GeoDBApi";

const useCities = () => {

    const getCities = async ( search: string ) => {
        try {
            const response = await GeoDBApi.get(`/cities?namePrefix=${search}&limit=3`);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return {
        getCities
    }
};

export default useCities;