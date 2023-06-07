import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const CityOption = () => {
    return (
        <TouchableOpacity 
            style={ styles.card }
            activeOpacity={ 0.8 }
        >
            <View>
                <Text style={ styles.weatherToday }>23°C</Text>
                <Text style={ styles.cityName }>Guadalajara</Text>
            </View>

            <Icon name="thunderstorm-outline" size={ 62 } color="white"/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginHorizontal: 20,
        height: 100,
        // backgroundColor: '#b907e6',
        backgroundColor: '#0da3a3',
        borderRadius: 20,
        marginTop: 22
    },
    weatherToday: {
        color: 'white',
        fontSize: 35,
        fontWeight: '400'
    },
    cityName: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default CityOption;