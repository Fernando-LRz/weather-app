import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import useCities from '../hooks/useCities';
import SearchCityInput from '../components/SearchCityInput';
import WeatherInfo from '../components/WeatherInfo';
import CityOption from '../components/CityOption';
import Loading from '../components/Loading';
import onlyLettersAndSpaces from '../helpers/onlyLettersAndSpaces';

import { FullCity, SimpleCity } from '../interfaces/CityInterfaces';
import useCurrentWeather from '../hooks/useCurrentWeather';
import ErrorMessage from '../components/ErrorMessage';
import { CurrentWeather } from '../interfaces/WeatherInterfaces';

const HomeScreen = () => {

    const [ searchTerm, setSearchTerm ] = useState('');
    const [ onFocus, setOnFocus ] = useState(false);

    const [ cities, setCities ] = useState<SimpleCity[]>([]);
    const { getCities, getCity } = useCities();

    const [ isAnError, setIsAnError ] = useState(false);

    const [ city, setCity ] = useState<FullCity>({} as FullCity);
    const [ isLoadingCityInfo, setIsLoadingCityInfo ] = useState(true);

    const [ currentWeather, setCurrentWeather ] = useState<CurrentWeather>({} as CurrentWeather);
    const [ isLoadingWeather, setIsLoadingWeather ] = useState(true);
    const { getWeather } = useCurrentWeather();

    const loadCities = async () => {
        const cities = await getCities(searchTerm);

        if(!cities || cities.length === 0) {
            setCities([]);
            return;
        }
    
        setCities(cities);
    }

    const loadCity = async () => {
        const city = await getCity(45418);
        setIsLoadingCityInfo(false);

        if(!city) {
            setIsAnError(true);
            return;
        }
        
        setCity(city.data);
    }

    const loadCurrentWeather = async (lat: number, lon: number) => {
        const weather = await getWeather(lat, lon);
        setIsLoadingWeather(false);

        if(!weather) {
            setIsAnError(true);
            return;
        }

        weather.main.description = weather.weather[0].description;
        setCurrentWeather(weather.main);
    }

    useEffect(() => {
        loadCity();
    }, []);

    useEffect(() => {
        if (!city.name) return;
        loadCurrentWeather(city.latitude, city.longitude);
    }, [ city ])

    useEffect(() => {

        if( searchTerm.length === 0 ) {
            setCities([]);

        } else if( !onlyLettersAndSpaces(searchTerm) ) {
            setCities([]);

        } else {
            loadCities();
        }

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

            <ScrollView>
                {/* cities */}
                <View style={{ marginTop: 10 }}>
                    { (onFocus && cities.length > 0) && (
                        
                        cities.map((city) => {
                            return (
                                <CityOption 
                                    name={ city.name } 
                                    country={ city.countryCode } 
                                    region={ city.region }
                                    key={ city.id }
                                />
                            )
                        }) 
                    )}
                </View>

                {/* weather info */}
                { !onFocus && (
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
    }
});

export default HomeScreen;