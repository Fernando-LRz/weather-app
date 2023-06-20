import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Forecast as ForecastData } from '../interfaces/WeatherForecastInterfaces';
import ForecastInfoCard from './ForecastInfoCard';
import nextDayDate from '../helpers/nextDayDate';

interface Props {
    forecastData: ForecastData[];
}

const Forecast = ({ forecastData }: Props) => {

    const firstDayDate = nextDayDate(new Date());
    const secondDayDate = nextDayDate(firstDayDate);
    const thirdDayDate = nextDayDate(secondDayDate);

    let firstDayData: ForecastData[] = [];
    let secondDayData: ForecastData[] = [];
    let thirdDayData: ForecastData[] = [];

    forecastData.forEach((item) => {
        const date = new Date(item.dt_txt);

        if(date.getDay() === firstDayDate.getDay()) {
            firstDayData = [...firstDayData, item];

        } else if(date.getDay() === secondDayDate.getDay()) {
            secondDayData = [...secondDayData, item];

        } else if(date.getDay() === thirdDayDate.getDay()) {
            thirdDayData = [...thirdDayData, item];
        }
    });
    
    return (
        <View style={ styles.container }>
            <Text style={ styles.title }>Forecast</Text>

            <Text style={ styles.date }>
                { firstDayDate.getDate() + '/' + (firstDayDate.getMonth() + 1) + '/' + firstDayDate.getFullYear() }
            </Text>
            {
                firstDayData.map((item, index) => (
                    <ForecastInfoCard 
                        // date={ item.dt_txt }
                        temp={ item.main.temp }
                        icon={ item.weather[0].icon }
                        time={ item.dt_txt }
                        key={ index }
                    />
                ))
            }

            <Text style={ styles.date }>
                { secondDayDate.getDate() + '/' + (secondDayDate.getMonth() + 1) + '/' + secondDayDate.getFullYear() }
            </Text>
            {
                secondDayData.map((item, index) => (
                    <ForecastInfoCard 
                        // date={ item.dt_txt }
                        temp={ item.main.temp }
                        icon={ item.weather[0].icon }
                        time={ item.dt_txt }
                        key={ index }
                    />
                ))
            }

            <Text style={ styles.date }>
                { thirdDayDate.getDate() + '/' + (thirdDayDate.getMonth() + 1) + '/' + thirdDayDate.getFullYear() }
            </Text>
            {
                thirdDayData.map((item, index) => (
                    <ForecastInfoCard 
                        // date={ item.dt_txt }
                        temp={ item.main.temp }
                        icon={ item.weather[0].icon }
                        time={ item.dt_txt }
                        key={ index }
                    />
                ))
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 25
    },
    title: {
        fontSize: 28,
        color: 'white',
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 10
    },
    date: {
        fontSize: 22,
        color: 'white',
        opacity: 0.6,
        marginVertical: 10
    }
});

export default Forecast; 