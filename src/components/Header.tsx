import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    cityName: string;
    temp: number;
    description: string;
    changeFocusStatus: (value: boolean) => void;
}

const Header = ({ cityName, temp, description, changeFocusStatus }: Props) => {
    return (
        <View>
            <Text style={ styles.headerCityName }>{ cityName }</Text>
            <Text style={ styles.headerTemp }>{ temp }°C | { description }</Text>
            
            <TouchableOpacity
                activeOpacity={ 0.8 }
                style={{ 
                    position: 'absolute',
                    right: 10,
                    top: 10
                }}
                onPress={ () => changeFocusStatus(true) }
            >
                <Icon 
                    name="search-outline"
                    color="#a4a1ab"
                    size={ 30 }
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    headerCityName: {
        textAlign: 'center',
        fontSize: 38,
        color: 'white',
        fontWeight: '500',
        marginTop: 20
    },
    headerTemp: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
        color: 'white',
        opacity: 0.5,
        marginBottom: 25
    },
});

export default Header;