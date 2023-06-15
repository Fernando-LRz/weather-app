import React, { useEffect, useState } from 'react';
import { View, Image, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import useWeatherApp from '../hooks/useWeatherApp';

import ErrorMessage from '../components/ErrorMessage';
import SearchCityInput from '../components/SearchCityInput';
import CityOption from '../components/CityOption';
import Loading from '../components/Loading';

import homeTheme from '../theme/homeTheme';
import BigDataCard from '../components/BigDataCard';
import SmallDataCard from '../components/SmallDataCard';
import BackButton from '../components/BackButton';

const HomeScreen = () => {

    const [ searchTerm, setSearchTerm ] = useState('');
    const [ onFocus, setOnFocus ] = useState(false);

    const { 
            city, 
            cities, 
            loadDefaultCity, 
            loadDefaultCityCurrentWeather,
            isLoadingCityInfo, 
            isLoadingWeather,
            isLoadingCities,
            currentWeather, 
            isAnError, 
            loadNewCity,
            loadCities
    } = useWeatherApp();
    

    useEffect(() => {
        loadDefaultCity();
    }, []);

    useEffect(() => {
        if (!city.name) return;
        loadDefaultCityCurrentWeather(city.latitude, city.longitude);
    }, [ city ])

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
            backgroundColor: '#271c4f'
        }}>
            {   
                (onFocus || cities.length > 0) && (
                    <SearchCityInput 
                        onDebounce={ setSearchTerm }
                        onFocus={ setOnFocus }
                    />
                )
            }

            {
                ( !onFocus && cities.length === 0 ) && (
                    <>
                        {/* HEADER */}
                        <View style={ homeTheme.header }>
                            <Text style={ homeTheme.headerCityName }>{ city.name }</Text>
                            <Text style={ homeTheme.headerTemp }>{ currentWeather.main.temp }°C | { currentWeather.weather[0].description }</Text>
                            <TouchableOpacity
                                activeOpacity={ 0.8 }
                                style={{ 
                                    position: 'absolute',
                                    right: 10,
                                    top: 10
                                }}
                                onPress={ () => setOnFocus(true) }
                            >
                                <Icon 
                                    name="search-outline"
                                    color="#a4a1ab"
                                    size={ 30 }
                                />
                            </TouchableOpacity>
                        </View>

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
                                data={ currentWeather.main.humidity.toString() + ' %' }
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
                                data={ currentWeather.main.pressure.toString() + 'hPa' }
                            />

                            <SmallDataCard 
                                title="Cloudiness"
                                data={ currentWeather.clouds.all.toString() + ' %' }
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

                    </>
                )
            }

            {
                isLoadingCities && (
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

            <ScrollView>
                {/* CITIES */}
                <View style={{ marginTop: 10 }}>
                    {
                        (( onFocus || cities.length > 0 ) && ( !isLoadingCities )) && (
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
                            }
                        ))
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
        </View>
    );
};

export default HomeScreen;