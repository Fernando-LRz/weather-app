import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';

import { useWeatherApp } from '../hooks/useWeatherApp';

import { ErrorMessage } from '../components/ErrorMessage';
import { SearchCityInput } from '../components/SearchCityInput';
import { CityOption } from '../components/CityOption';
import { Loading } from '../components/Loading';

import { BigInfoCard } from '../components/BigInfoCard';
import { SmallDataCard } from '../components/SmallDataCard';
import { BackButton } from '../components/BackButton';
import { Header } from '../components/Header';
import { Forecast } from '../components/Forecast';

export const HomeScreen = () => {

    const [ searchTerm, setSearchTerm ] = useState('');
    const [ onFocus, setOnFocus ] = useState(false);

    const { 
            city, 
            cities, 
            isLoadingCityInfo, 
            isLoadingWeather,
            isLoadingCities,
            currentWeather: weatherInfo,
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

    if(true) {
        return (
            <ErrorMessage />
        )
    }

    return (
        <View style={{ 
            flex: 1, 
            backgroundColor: "#000"
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
                        {/* Header */}
                        <Header 
                            cityName={ city.name }
                            temp={ weatherInfo.main.temp }
                            description={ weatherInfo.weather[0].description }
                            changeFocusStatus={ setOnFocus }
                        />

                        {/* Temperature */}
                        <BigInfoCard
                            title="Temperature"
                            firstLabel="Min"
                            firstData={ `${ weatherInfo.main.temp_min.toString() }°C` }
                            secondLabel="Max"
                            secondData={ `${ weatherInfo.main.temp_max.toString() }°C` }
                            icon={ weatherInfo.weather[0].icon }
                        />

                        {/* Humity & visibility */}
                        <View style={{ flexDirection: "row" }}>
                            <SmallDataCard 
                                title="Humity"
                                data={ weatherInfo.main.humidity.toString() + "%" }
                            />

                            <SmallDataCard 
                                title="Visibility"
                                data={ ( weatherInfo.visibility / 1000 ).toString() + " KM" }
                            />
                        </View>

                        {/* Pressure & cloudiness */}
                        <View style={{ flexDirection: "row" }}>
                            <SmallDataCard 
                                title="Pressure"
                                data={ weatherInfo.main.pressure.toString() + " hPa" }
                            />

                            <SmallDataCard 
                                title="Cloudiness"
                                data={ weatherInfo.clouds.all.toString() + "%" }
                            />
                        </View>
                        
                        {/* wind */}
                        <BigInfoCard
                            title="Wind"
                            firstLabel="Speed"
                            firstData={ `${ weatherInfo.wind.deg } m/s` }
                            secondLabel="Direction"
                            secondData={ `${ weatherInfo.wind.deg }°` }
                        />

                        {/* forecast */}
                        <Forecast forecastData={ weatherForecast.list } />
                    </ScrollView>
                )
            }

            {
                ( isLoadingCities ) && (
                    <View style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        justifyContent: "center"
                    }}>
                        <ActivityIndicator 
                            size={ 40 } 
                            color="#fff"
                        />
                    </View>
                )
            }

            {
                (( onFocus || cities.length > 0 ) && ( !isLoadingCities )) && (

                    <ScrollView>
                        {/* cities */}
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

                            {/* back button */}
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