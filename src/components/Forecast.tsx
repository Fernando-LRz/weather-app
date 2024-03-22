import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { ForecastInfoCard } from './ForecastInfoCard';
import { Forecast as ForecastData } from '../interfaces/WeatherForecastInterfaces';

import { nextDayDate } from '../helpers/nextDayDate';

interface Props {
    forecastData: ForecastData[];
}

export const Forecast = ({ forecastData }: Props) => {

    const [ page, setPage ] = useState<number>(1);

    const firstDayDate = nextDayDate(new Date());
    const secondDayDate = nextDayDate(firstDayDate);
    const thirdDayDate = nextDayDate(secondDayDate);
    const fourthDayDate = nextDayDate(thirdDayDate);
    const fifthDayDate = nextDayDate(fourthDayDate);

    let firstDayData: ForecastData[] = [];
    let secondDayData: ForecastData[] = [];
    let thirdDayData: ForecastData[] = [];
    let fourthDayData: ForecastData[] = [];
    let fifthDayData: ForecastData[] = [];

    forecastData.forEach((item) => {
        const date = new Date(item.dt_txt);

        if(date.getDay() === firstDayDate.getDay()) {
            firstDayData = [...firstDayData, item];

        } else if(date.getDay() === secondDayDate.getDay()) {
            secondDayData = [...secondDayData, item];

        } else if(date.getDay() === thirdDayDate.getDay()) {
            thirdDayData = [...thirdDayData, item];

        } else if(date.getDay() === fourthDayDate.getDay()) {
            fourthDayData = [...fourthDayData, item];

        } else if(date.getDay() === fifthDayDate.getDay()) {
            fifthDayData = [...fifthDayData, item];
        }
    });
    
    return (
        <View style={ styles.container }>
 
            <Text style={ styles.title }>Forecast</Text>      
            <View style={ styles.header }>
                { 
                    page === 1 &&
                        <Text style={ styles.date }>
                            { firstDayDate.getDate() + '/' + (firstDayDate.getMonth() + 1) + '/' + firstDayDate.getFullYear() }
                        </Text>
                }

                { 
                    page === 2 &&
                        <Text style={ styles.date }>
                            { secondDayDate.getDate() + '/' + (secondDayDate.getMonth() + 1) + '/' + secondDayDate.getFullYear() }
                        </Text>
                }

                { 
                    page === 3 &&
                        <Text style={ styles.date }>
                            { thirdDayDate.getDate() + '/' + (thirdDayDate.getMonth() + 1) + '/' + thirdDayDate.getFullYear() }
                        </Text>
                }

                { 
                    page === 4 &&
                        <Text style={ styles.date }>
                            { fourthDayDate.getDate() + '/' + (fourthDayDate.getMonth() + 1) + '/' + fourthDayDate.getFullYear() }
                        </Text>
                }

                { 
                    page === 5 &&
                        <Text style={ styles.date }>
                            { fifthDayDate.getDate() + '/' + (fifthDayDate.getMonth() + 1) + '/' + fifthDayDate.getFullYear() }
                        </Text>
                }

                <View style={ styles.buttonContainer }>
                    <TouchableOpacity
                        activeOpacity={ 0.7 }
                        onPress={() => setPage(page - 1)}
                        disabled={ page === 1 }
                    >
                        <Icon name="caret-back-outline" size={ 32 } color={ page !== 1 ? '#fff' : 'grey' }/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={ 0.7 }
                        onPress={ () => setPage(page + 1) }
                        disabled={ page === 5 }
                    >
                        <Icon name="caret-forward-outline" size={ 32 } color={ page !== 5 ? '#fff' : 'grey' }/>
                    </TouchableOpacity>
                </View>

            </View>        

            { page === 1 && (
                firstDayData.map((item, index) => (
                    <ForecastInfoCard 
                        // date={ item.dt_txt }
                        temp={ item.main.temp }
                        icon={ item.weather[0].icon }
                        time={ item.dt_txt }
                        key={ index }
                    />
                )))
            }

            { page === 2 && (
                secondDayData.map((item, index) => (
                    <ForecastInfoCard 
                        // date={ item.dt_txt }
                        temp={ item.main.temp }
                        icon={ item.weather[0].icon }
                        time={ item.dt_txt }
                        key={ index }
                    />
                )))
            }

            { page === 3 && (
                thirdDayData.map((item, index) => (
                    <ForecastInfoCard 
                        // date={ item.dt_txt }
                        temp={ item.main.temp }
                        icon={ item.weather[0].icon }
                        time={ item.dt_txt }
                        key={ index }
                    />
                )))
            }

            { page === 4 && (
                fourthDayData.map((item, index) => (
                    <ForecastInfoCard 
                        // date={ item.dt_txt }
                        temp={ item.main.temp }
                        icon={ item.weather[0].icon }
                        time={ item.dt_txt }
                        key={ index }
                    />
                )))
            }

            { page === 5 && (
                fifthDayData.map((item, index) => (
                    <ForecastInfoCard 
                        // date={ item.dt_txt }
                        temp={ item.main.temp }
                        icon={ item.weather[0].icon }
                        time={ item.dt_txt }
                        key={ index }
                    />
                )))
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
        color: '#fff',
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 10
    },
    date: {
        fontSize: 22,
        color: '#fff',
        marginVertical: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }, 
    buttonContainer: {
        flexDirection: 'row',
    }
});