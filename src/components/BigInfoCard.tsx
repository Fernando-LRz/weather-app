import React from 'react';
import { View, Text, Image } from 'react-native';

import { appTheme } from '../theme/appTheme';

interface Props {
    title: string;
    firstLabel: string;
    secondLabel: string;
    firstData: string;
    secondData: string;
    icon?: string;
};

export const BigInfoCard = ({ title, firstLabel, firstData, secondLabel, secondData, icon }: Props) => {
    return (
        <View style={ appTheme.infoBox }>
            <Text style={ appTheme.infoBoxTitle }>{ title.toUpperCase() }</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, marginRight: 25 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3 }}>
                        <Text style={ appTheme.infoBoxLabel }>- { firstLabel }</Text>
                        <Text style={ appTheme.infoBoxData }>{ firstData }</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3 }}>
                        <Text style={ appTheme.infoBoxLabel }>- { secondLabel }</Text>
                        <Text style={ appTheme.infoBoxData }>{ secondData }</Text>
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