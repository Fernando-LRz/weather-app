import React, { useEffect, useState } from 'react';
import { View, Image, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import useWeatherApp from '../hooks/useWeatherApp';

import ErrorMessage from '../components/ErrorMessage';
import SearchCityInput from '../components/SearchCityInput';
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
                        <View style={ homeTheme.infoBox }>
                            <Text style={ homeTheme.infoBoxTitle }>TEMPERATURE</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ flex: 1, marginRight: 25 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3 }}>
                                        <Text style={ homeTheme.infoBoxLabel }>- Min</Text>
                                        <Text style={ homeTheme.infoBoxData }>{ currentWeather.main.temp_min }°C</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3 }}>
                                        <Text style={ homeTheme.infoBoxLabel }>- Max</Text>
                                        <Text style={ homeTheme.infoBoxData }>{ currentWeather.main.temp_max }°C</Text>
                                    </View>
                                </View>

                                <Image 
                                    source={{ uri: `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png` }} 
                                    style={{ 
                                        height: 85,
                                        width: 65
                                    }}
                                />
                            </View>
                        </View>

                        {/* HUMITY & VISIBILITY */}
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ ...homeTheme.infoBox, flex: 1, paddingVertical: 30 }}>
                                <Text style={ homeTheme.infoBoxTitle }>HUMIDITY</Text>
                                <View style={{ flexDirection: 'row', marginTop: 3 }}>
                                    <Text style={ homeTheme.infoBoxData }>{ currentWeather.main.humidity }%</Text>
                                </View>
                            </View>

                            <View style={{ ...homeTheme.infoBox, flex: 1, paddingVertical: 30 }}>
                                <Text style={ homeTheme.infoBoxTitle }>VISIBILITY</Text>
                                <View style={{ flexDirection: 'row', marginTop: 3 }}>
                                    <Text style={ homeTheme.infoBoxData }>{ (currentWeather.visibility) / 1000 } KM</Text>
                                </View>
                            </View>
                        </View>

                        {/* PRESSURE  & CLOUDINESS */}
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ ...homeTheme.infoBox, flex: 1, paddingVertical: 30 }}>
                                <Text style={ homeTheme.infoBoxTitle }>PRESSURE</Text>
                                <View style={{ flexDirection: 'row', marginTop: 3 }}>
                                    <Text style={ homeTheme.infoBoxData }>{ currentWeather.main.pressure } hPa</Text>
                                </View>
                            </View>

                            <View style={{ ...homeTheme.infoBox, flex: 1, paddingVertical: 30 }}>
                                <Text style={ homeTheme.infoBoxTitle }>CLOUDINESS</Text>
                                <View style={{ flexDirection: 'row', marginTop: 3 }}>
                                    <Text style={ homeTheme.infoBoxData }>{ currentWeather.clouds.all }%</Text>
                                </View>
                            </View>
                        </View>
                        
                        {/* COORDINATES */}
                        <View style={ homeTheme.infoBox }>
                            <Text style={ homeTheme.infoBoxTitle }>COORDINATES</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3 }}>
                                <Text style={ homeTheme.infoBoxLabel }>- Latitude</Text>
                                <Text style={ homeTheme.infoBoxData }>{ currentWeather.coord.lat }</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3 }}>
                                <Text style={ homeTheme.infoBoxLabel }>- Longitude</Text>
                                <Text style={ homeTheme.infoBoxData }>{ currentWeather.coord.lon }</Text>
                            </View>
                        </View>

                    </>
                )
            }


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
                            <View 
                                style={{ 
                                    alignItems: 'center', 
                                    marginTop: 50, 
                                    marginBottom: 40 
                                }}
                            >
                                <TouchableOpacity 
                                    activeOpacity={ 0.8 }
                                    style={ homeTheme.backButton }
                                    onPress={ () => setSearchTerm('') }
                                >
                                    <Text style={ homeTheme.backButtonText }>Back</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                </View>
            </ScrollView>     
        </View>
    );
};

export default HomeScreen;