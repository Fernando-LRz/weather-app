import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import useCities from '../hooks/useCities';
import SearchCityInput from '../components/SearchCityInput';
import WeatherInfo from '../components/WeatherInfo';
import CityOption from '../components/CityOption';
import onlyLettersAndSpaces from '../helpers/onlyLettersAndSpaces';

import { City } from '../interfaces/CityInterfaces';

const HomeScreen = () => {

    const [ searchTerm, setSearchTerm ] = useState('');
    const [ onFocus, setOnFocus ] = useState(false);
    const [ cities, setCities ] = useState<City[]>([]);
    const { getCities } = useCities();

    const [ city, setCity ] = useState<City>({} as City);

    const loadCities = async () => {
        const cities = await getCities(searchTerm);

        if(!cities || cities.length === 0) {
            setCities([]);
            return;
        }
    
        setCities(cities);
    }

    const loadDefaultCity = async () => {
        const cities = await getCities('Chicago');

        if(!cities || cities.length === 0) {
            setCities([]);
            return;
        }
    
        setCity(cities[0]);
    }

    useEffect(() => {
        loadDefaultCity();
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

    return (
        <View style={{ flex: 1, backgroundColor: '#ebebeb'}}>
            
            <SearchCityInput 
                onDebounce={ setSearchTerm }
                onFocus={ setOnFocus }
            />

            <ScrollView>
                {/* cities */}
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

                {/* weather info */}
                { !onFocus && (
                    <View>
                        <View style={ styles.header }>
                            <Text style={ styles.title }>New York</Text>
                            <Text style={ styles.subtitle }>Today</Text>
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
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'black'
    },
    subtitle: {
        fontSize: 25,
        color: '#555',
        marginTop: 5,
        marginBottom: 20
    }
});

export default HomeScreen;