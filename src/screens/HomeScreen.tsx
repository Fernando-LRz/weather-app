import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import useCities from '../hooks/useCities';
import SearchCityInput from '../components/SearchCityInput';
import WeatherInfo from '../components/WeatherInfo';
import CityOption from '../components/CityOption';
import Loading from '../components/Loading';
import onlyLettersAndSpaces from '../helpers/onlyLettersAndSpaces';

import { SimpleCity } from '../interfaces/CityInterfaces';
import useCurrentWeather from '../hooks/useCurrentWeather';
import ErrorMessage from '../components/ErrorMessage';

const HomeScreen = () => {

    const [ searchTerm, setSearchTerm ] = useState('');
    const [ onFocus, setOnFocus ] = useState(false);
    const [ cities, setCities ] = useState<SimpleCity[]>([]);
    const { getCities, getCity } = useCities();

    const [ city, setCity ] = useState<SimpleCity>({} as SimpleCity);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isAnError, setIsAnError ] = useState(false);

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
        setIsLoading(false);

        if(!city) {
            setIsAnError(true);
            return;
        }
        
        setCity(city.data);
    }

    useEffect(() => {
        loadCity();
    }, []);

    useEffect(() => {

        if( searchTerm.length === 0 ) {
            setCities([]);

        } else if( !onlyLettersAndSpaces(searchTerm) ) {
            setCities([]);

        } else {
            loadCities();
        }

    }, [ searchTerm ]);

    if(isLoading && !isAnError) {
        return (
            <Loading />
        )
    }

    if(isAnError && !isLoading) {
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

                        <WeatherInfo />
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