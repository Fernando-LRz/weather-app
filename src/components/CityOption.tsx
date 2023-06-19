import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';

import useCurrentWeather from '../hooks/useCurrentWeather';

interface Props {
    id: number;
    name: string;
    country: string;
    region: string;
    lat: number;
    lon: number;
    setCity: (id: number) => void;
}

const CityOption = ({ id, name, country, region, lat, lon, setCity }: Props) => {

    const { getWeather } = useCurrentWeather();
    const [ temp, setTemp ] = useState<number>();
    const [ icon, setIcon ] = useState<string>();
    const [ isAnError, setIsAnError ] = useState<boolean>(false);

    const loadTemperature = async () => {
        const weather = await getWeather(lat, lon);

        if(!weather) {
            setIsAnError(true);
            return;
        }

        const icon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
        
        setTemp(weather.main.temp);
        setIcon(icon);
    }

    useEffect(() => {
        loadTemperature();
    }, []);

    return (
        <TouchableOpacity 
            style={ styles.card }
            activeOpacity={ 0.7 } 
            onPress={ () => setCity(id) }
        >
            <View style={{ width: '55%' }}>
                {  
                    isAnError 
                    ? <Text style={ styles.weatherToday }>Error</Text>
                    : <Text style={ styles.weatherToday }>{ (temp) ? Math.round(temp) + '°C': 'Loading...' }</Text>
                }
                <Text numberOfLines={ 1 } style={ styles.country_region }>{ country } - { region }</Text>
                <Text numberOfLines={ 1 } style={ styles.city }>{ name }</Text>
            </View>

            { icon ? (
                <Image 
                    source={{ uri: icon }} 
                    style={{ 
                        height: 105,
                        width: 105
                    }}
                />
                ): (
                    <ActivityIndicator
                        size={ 50 } 
                        color="white"
                        style={{
                            height: 105,
                            width: 105
                        }}
                    />
                )
            }
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
        backgroundColor: '#3f0270',
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