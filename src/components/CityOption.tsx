import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    id: number;
    name: string;
    country: string;
    region: string;
    temp: number;
    setCity: (id: number) => void;
}

const CityOption = ({ id, name, country, region, setCity }: Props) => {
    return (
        <TouchableOpacity 
            style={ styles.card }
            activeOpacity={ 0.7 } 
            onPress={ () => setCity(id) }
        >
            <View style={{ width: '65%' }}>
                <Text style={ styles.weatherToday }>30°C</Text>
                <Text style={ styles.country_region }>{ country } - { region }</Text>
                <Text style={ styles.city }>{ name }</Text>
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
        height: 120,
        backgroundColor: '#0da3a3',
        borderRadius: 20,
        marginVertical: 10
    },
    weatherToday: {
        color: 'white',
        fontSize: 35,
        fontWeight: '400'
    },
    country_region: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    city: {
        color: 'white',
        fontSize: 17,
        fontWeight: '500'
    }
});

export default CityOption;