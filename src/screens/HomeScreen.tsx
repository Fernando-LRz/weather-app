import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';

import useWeatherApp from '../hooks/useWeatherApp';

import ErrorMessage from '../components/ErrorMessage';
import SearchCityInput from '../components/SearchCityInput';
import WeatherInfo from '../components/WeatherInfo';
import CityOption from '../components/CityOption';
import Loading from '../components/Loading';

import homeTheme from '../theme/homeTheme';

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
        <View style={{ flex: 1, backgroundColor: '#271c4f' }}>

            <View style={ homeTheme.header }>
                <SearchCityInput 
                    onDebounce={ setSearchTerm }
                    onFocus={ setOnFocus }
                />
                <Text style={ homeTheme.headerCityName }>{ city.name }</Text>
                <Text style={ homeTheme.headerTemp }>{ currentWeather.main.temp }°C | { currentWeather.main.description }</Text>
            </View>

            <View style={ homeTheme.infoBox }>
                <Text style={ homeTheme.infoBoxTitle }>WIND INFORMATION</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3 }}>
                    <Text style={ homeTheme.infoBoxLabel }>- Speed</Text>
                    <Text style={ homeTheme.infoBoxLabel }>{ currentWeather.wind.speed } meter/sec</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3 }}>
                    <Text style={ homeTheme.infoBoxLabel }>- Direction</Text>
                    <Text style={ homeTheme.infoBoxLabel }>{ currentWeather.wind.deg }°</Text>
                </View>
            </View>

            {/* loading cities */}
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
                {/* cities */}
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
                    {
                        (( cities.length > 0 ) && ( !isLoadingCities )) && (
                            <View 
                                style={{ 
                                    alignItems: 'center', 
                                    marginTop: 50, 
                                    marginBottom: 40 
                                }}
                            >
                                <TouchableOpacity 
                                    activeOpacity={ 0.8 }
                                    onPress={ () => setSearchTerm('') }
                                >
                                    <Text>Back</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                </View>

                {/* weather info */}
                { ( !onFocus && cities.length === 0 ) && (
                    <View>
                        <View>
                            <Text>{ city.countryCode } - { city.region }</Text>
                            <Text>{ city.name }</Text>
                        </View>

                        <WeatherInfo 
                            temp={ currentWeather.main.temp } 
                            temp_max={ currentWeather.main.temp_max }
                            temp_min={ currentWeather.main.temp_min }
                            description={ currentWeather.main.description }
                            icon={ currentWeather.main.icon }
                        />
                    </View>
                )}

            </ScrollView>
        </View>
    );
};

export default HomeScreen;