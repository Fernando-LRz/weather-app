import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';

import ErrorMessage from '../components/ErrorMessage';
import SearchCityInput from '../components/SearchCityInput';
import WeatherInfo from '../components/WeatherInfo';
import CityOption from '../components/CityOption';
import Loading from '../components/Loading';

import useWeatherApp from '../hooks/useWeatherApp';

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
        <View style={{ flex: 1, backgroundColor: '#ebebeb' }}>
            <SearchCityInput 
                onDebounce={ setSearchTerm }
                onFocus={ setOnFocus }
            />

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
                                    style={ styles.button }
                                    activeOpacity={ 0.8 }
                                    onPress={ () => setSearchTerm('') }
                                >
                                    <Text style={ styles.textButton }>Back</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                </View>

                {/* weather info */}
                { ( !onFocus && cities.length === 0 ) && (
                    <View>
                        <View style={ styles.header }>
                            <Text style={ styles.country_region }>{ city.countryCode } - { city.region }</Text>
                            <Text style={ styles.city }>{ city.name }</Text>
                        </View>

                        <WeatherInfo 
                            temp={ currentWeather.temp } 
                            temp_max={ currentWeather.temp_max }
                            temp_min={ currentWeather.temp_min }
                            description={ currentWeather.description }
                            icon={ currentWeather.icon }
                        />
                    </View>
                )}

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        marginTop: 25,
        alignItems: 'center'
    },
    country_region: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black'
    },
    city: {
        fontSize: 25,
        fontWeight: '500',
        color: '#555',
        marginTop: 5,
        marginBottom: 25
    },
    textButton: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    button: {
        backgroundColor: '#5856D6', 
        height: 50, 
        width: '40%',
        borderRadius: 20 ,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default HomeScreen;