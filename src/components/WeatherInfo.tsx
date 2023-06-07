import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    temp: number;
    temp_min:   number;
    temp_max:   number;
    description: string;
    icon: string;
}

const WeatherCard = ( { temp, temp_max, temp_min, description, icon }: Props ) => {

    return ( 
        <View style={ styles.container }>

            { icon ? (
                <Image 
                    source={{ uri: icon }} 
                    style={{ 
                        height: 190,
                        width: 190,
                        borderRadius: 60,
                        backgroundColor: '#bdbdbd'
                    }}
                />
                ): (
                    <TouchableOpacity
                        activeOpacity={ 0.5 }
                    >
                        <Icon name="reload-circle-outline" size={ 80 } color="black"/>
                    </TouchableOpacity>
                )
            }

            <Text style={ styles.weatherToday }>{ Math.round(temp) }°C</Text>
            <View style={ styles.separator }/>
            <Text style={ styles.weatherDescription }>{ description }</Text>
            <Text style={ styles.min_max }>
                { Math.round(temp_min) }°C <Text style={ styles.min }>min</Text> / { Math.round(temp_max) }°C <Text style={ styles.max }>max</Text>
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