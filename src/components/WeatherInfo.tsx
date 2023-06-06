import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const WeatherCard = () => {
    return (
        <View style={ styles.container }>
            <Icon name="thunderstorm-outline" size={ 100 } color="#444"/>

            <Text style={ styles.weatherToday }>23°C</Text>
            <View style={ styles.separator }/>
            <Text style={ styles.weatherDescription }>Thunderstorm</Text>
            <Text style={ styles.min_max }>
                19°C <Text style={ styles.min }>min</Text> / 23°C <Text style={ styles.max }>max</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    weatherToday: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#5856D6',
        textAlign: 'center',
        marginTop: 10,
    },
    weatherDescription: {
        fontSize: 25,
        fontWeight: '600',
        color: '#444',
        marginTop: 10
    },
    separator: {
        width: '35%',
        borderColor: '#999',
        borderWidth: 1
    },
    min_max: {
        fontSize: 20,
        fontWeight: '600',
        color: 'black',
        marginTop: 40,
    },
    min: {
        color: '#0EC5D0'
    },
    max: {
        color: 'red'
    }
});

export default WeatherCard;