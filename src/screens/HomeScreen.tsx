import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';

import useWeatherApp from '../hooks/useWeatherApp';

import ErrorMessage from '../components/ErrorMessage';
import SearchCityInput from '../components/SearchCityInput';
import CityOption from '../components/CityOption';
import Loading from '../components/Loading';

import BigDataCard from '../components/BigDataCard';
import SmallDataCard from '../components/SmallDataCard';
import BackButton from '../components/BackButton';
import Header from '../components/Header';
import Forecast from '../components/Forecast';

const HomeScreen = () => {

    const [ searchTerm, setSearchTerm ] = useState('');
    const [ onFocus, setOnFocus ] = useState(false);

    const { 
            city, 
            cities, 
            isLoadingCityInfo, 
            isLoadingWeather,
            isLoadingCities,
            currentWeather,
            weatherForecast, 
            isAnError, 
            loadNewCity,
            loadCities
    } = useWeatherApp();

    useEffect(() => {
        loadCities(searchTerm);
    }, [ searchTerm ]);

    if(isLoadingCityInfo && !isAnError || isLoadingWeather && !isAnError ) {
        return (
            <Loading />
        )
    }

    if(isAnError) {
        return (
            <ErrorMessage />
        )
    }

    return (
        <View style={{ 
            flex: 1, 
            // backgroundColor: '#230e47'
            backgroundColor: '#2b0354'
        }}>
            {   
                ( onFocus || cities.length > 0 ) && (
                    <SearchCityInput 
                        onDebounce={ setSearchTerm }
                        onFocus={ setOnFocus }
                    />
                )
            }

            {
                ( !onFocus && cities.length === 0 ) && (
                    <ScrollView>
                        {/* HEADER */}
                        <Header 
                            cityName={ city.name }
                            temp={ currentWeather.main.temp }
                            description={ currentWeather.weather[0].description }
                            changeFocusStatus={ setOnFocus }
                        />

                        {/* TEMPERATURE */}
                        <BigDataCard
                            title="Temperature"
                            firstLabel="Min"
                            firstData={ currentWeather.main.temp_min }
                            secondLabel="Max"
                            secondData={ currentWeather.main.temp_max }
                            icon={ currentWeather.weather[0].icon }
                        />

                        {/* HUMITY & VISIBILITY */}
                        <View style={{ flexDirection: 'row' }}>
                            <SmallDataCard 
                                title="Humity"
                                data={ currentWeather.main.humidity.toString() + '%' }
                            />

                            <SmallDataCard 
                                title="Visibility"
                                data={ (currentWeather.visibility / 1000).toString() + ' KM' }
                            />
                        </View>

                        {/* PRESSURE & CLOUDINESS */}
                        <View style={{ flexDirection: 'row' }}>
                            <SmallDataCard 
                                title="Pressure"
                                data={ currentWeather.main.pressure.toString() + ' hPa' }
                            />

                            <SmallDataCard 
                                title="Cloudiness"
                                data={ currentWeather.clouds.all.toString() + '%' }
                            />
                        </View>
                        
                        {/* COORDINATES */}
                        <BigDataCard
                            title="Coordinates"
                            firstLabel="Latitude"
                            firstData={ currentWeather.coord.lat }
                            secondLabel="Longitude"
                            secondData={ currentWeather.coord.lon }
                        />

                        {/* FORECAST */}
                        <Forecast forecastData={ weatherForecast.list } />
                    </ScrollView>
                )
            }

            {
                ( isLoadingCities ) && (
                    <View style={{
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                        justifyContent: 'center'
                    }}>
                        <ActivityIndicator 
                            size={ 40 } 
                            color="#5856D6"
                        />
                    </View>
                )
            }

            {
                (( onFocus || cities.length > 0 ) && ( !isLoadingCities )) && (

                    <ScrollView>
                        {/* CITIES */}
                        <View style={{ marginTop: 10 }}>
                            {
                                cities.map((city, index) => {
                                    return (
                                        <CityOption 
                                            id={ city.id }
                                            name={ city.name } 
                                            country={ city.countryCode } 
                                            region={ city.region }
                                            lat={ city.latitude }
                                            lon={ city.longitude }
                                            setCity={ loadNewCity }
                                            key={ city.id + index }
                                        />
                                    )
                                })
                            }

                            {/* BACK BUTTON */}
                            {
                                (( cities.length > 0 ) && ( !isLoadingCities )) && (
                                    <BackButton 
                                        resetSearchTerm={ setSearchTerm }
                                    />
                                )
                            }
                        </View>
                    </ScrollView>     
                )
            }

        </View>
    );
};

export default HomeScreen;