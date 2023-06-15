import React from 'react';
import { View, Text, Image } from 'react-native';
import appTheme from '../theme/appTheme';

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
        <View style={ appTheme.infoBox }>
            <Text style={ appTheme.infoBoxTitle }>{ title.toUpperCase() }</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, marginRight: 25 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3 }}>
                        <Text style={ appTheme.infoBoxLabel }>- { firstLabel }</Text>
                        <Text style={ appTheme.infoBoxData }>{ firstData }°C</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3 }}>
                        <Text style={ appTheme.infoBoxLabel }>- { secondLabel }</Text>
                        <Text style={ appTheme.infoBoxData }>{ secondData }°C</Text>
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