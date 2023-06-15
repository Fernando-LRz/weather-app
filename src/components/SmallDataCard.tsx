import React from 'react';
import { View, Text } from 'react-native';
import appTheme from '../theme/appTheme';

interface Props {
    title: string;
    data: string;
}

const SmallDataCard = ({ title, data }: Props) => {
    return (
        <View style={{ ...appTheme.infoBox, flex: 1, paddingVertical: 30 }}>
            <Text style={ appTheme.infoBoxTitle }>{ title.toUpperCase() }</Text>
            <View style={{ flexDirection: 'row', marginTop: 3 }}>
                <Text style={ appTheme.infoBoxData }>{ data }</Text>
            </View>
        </View>
    );
};

export default SmallDataCard;