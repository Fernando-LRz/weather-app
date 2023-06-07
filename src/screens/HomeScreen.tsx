import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import useCities from '../hooks/useCities';
import SearchCityInput from '../components/SearchCityInput';
import WeatherInfo from '../components/WeatherInfo';
import onlyLettersAndSpaces from '../helpers/onlyLettersAndSpaces';

import { City } from '../interfaces/CityInterfaces';

const HomeScreen = () => {

    const [ searchTerm, setSearchTerm ] = useState('');
    const [ cities, setCities ] = useState<City[]>([]);
    const { getCities } = useCities();

    const loadCities = async () => {
        const cities = await getCities(searchTerm);

        if(!cities || cities.length === 0) {
            setCities([]);
            return;
        }
    
        setCities(cities);
    }

    useEffect(() => {

        if( searchTerm.length === 0 ) {
            console.log('El término de búsqueda está vacío');

        } else if( !onlyLettersAndSpaces(searchTerm) ) {
            console.log('El término de búsqueda no es válido');

        } else {
            loadCities()
        }

    }, [ searchTerm ]);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SearchCityInput onDebounce={ (value) => setSearchTerm( value ) }/>

            <View style={ styles.header }>
                <Text style={ styles.title }>New York</Text>
                <Text style={ styles.subtitle }>Today</Text>
            </View>

            <WeatherInfo />
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