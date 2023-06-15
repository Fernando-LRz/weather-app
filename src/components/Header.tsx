import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import homeTheme from '../theme/homeTheme';

interface Props {
    cityName: string;
    temp: number;
    description: string;
    changeFocusStatus: (value: boolean) => void;
}

const Header = ({ cityName, temp, description, changeFocusStatus }: Props) => {
    return (
        <View style={ homeTheme.header }>
            <Text style={ homeTheme.headerCityName }>{ cityName }</Text>
            <Text style={ homeTheme.headerTemp }>{ temp }°C | { description }</Text>
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

export default Header;