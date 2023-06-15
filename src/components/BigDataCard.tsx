import React from 'react';
import { View, Text, Image } from 'react-native';
import homeTheme from '../theme/homeTheme';

interface Props {
    title: string;
    firstLabel: string;
    secondLabel: string;
    firstData: number;
    secondData: number;
    icon?: string;
}

const BigInfoCard = ({ title, firstLabel, firstData, secondLabel, secondData, icon }: Props) => {
    return (
        <View style={ homeTheme.infoBox }>
            <Text style={ homeTheme.infoBoxTitle }>{ title.toUpperCase() }</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, marginRight: 25 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3 }}>
                        <Text style={ homeTheme.infoBoxLabel }>- { firstLabel }</Text>
                        <Text style={ homeTheme.infoBoxData }>{ firstData }°C</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3 }}>
                        <Text style={ homeTheme.infoBoxLabel }>- { secondLabel }</Text>
                        <Text style={ homeTheme.infoBoxData }>{ secondData }°C</Text>
                    </View>
                </View>

                {
                    icon &&
                        <Image 
                            source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }} 
                            style={{ 
                                height: 85,
                                width: 65
                            }}
                        />
                }
            </View>
        </View>
    );
};

export default BigInfoCard;