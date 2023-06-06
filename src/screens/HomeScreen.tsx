import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import SearchCityInput from '../components/SearchCityInput';
import WeatherInfo from '../components/WeatherInfo';
import onlyLettersAndSpaces from '../helpers/onlyLettersAndSpaces';

const HomeScreen = () => {

    const [ searchTerm, setSearchTerm ] = useState('');

    useEffect(() => {

        if( searchTerm.length === 0 ) {
            // console.log('Término de búsqueda vacío...')
        } else if( !onlyLettersAndSpaces(searchTerm) ) {
            // console.log('El término de búsqueda no es válido');
        } else {
            // console.log('Buscando: ', searchTerm, '...');
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