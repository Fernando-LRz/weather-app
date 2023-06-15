import React from 'react';
import { View, Text } from 'react-native';
import homeTheme from '../theme/homeTheme';

interface Props {
    title: string;
    data: string;
}

const SmallDataCard = ({ title, data }: Props) => {
    return (
        <View style={{ ...homeTheme.infoBox, flex: 1, paddingVertical: 30 }}>
            <Text style={ homeTheme.infoBoxTitle }>{ title.toUpperCase() }</Text>
            <View style={{ flexDirection: 'row', marginTop: 3 }}>
                <Text style={ homeTheme.infoBoxData }>{ data }</Text>
            </View>
        </View>
    );
};

export default SmallDataCard;