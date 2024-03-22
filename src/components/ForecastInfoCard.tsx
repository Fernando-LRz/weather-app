import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface Props {
    temp: number;
    time: string;
    icon: string;
    date?: string;
}

export const ForecastInfoCard = ({ temp, time, icon, date }: Props) => {

    const iconUri = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    return (
        <View style={ styles.container }>
            {
                date &&    
                    <View>
                        <Text style={ styles.label }>Date</Text>
                        <Text style={ styles.data }>{ date?.split(' ')[0] }</Text>
                    </View>
            }
            
            <View>
                <Text style={ styles.label }>Time</Text>
                <Text style={ styles.data }>{ time.split(' ')[1].substring(0, 5) }</Text>
            </View>
            <View>
                <Text style={ styles.label }>Temp</Text>
                <Text style={ styles.data }>{ temp }°C</Text>
            </View>

            <Image
                source={{ uri: iconUri }} 
                style={{ 
                    height: 60,
                    width: 50
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#2c14de',
        paddingVertical: 25,
        marginVertical: 10,
        borderRadius: 20
    },
    label: {
        fontSize: 15,
        color: '#fff',
        fontWeight: '700' 
    },
    data: {
        fontSize: 22,
        color: '#fff',
        opacity: 0.8,
        fontWeight: '600'
    }
});