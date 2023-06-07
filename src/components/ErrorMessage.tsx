import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const ErrorMessage = () => {
    return (
        <View style={ styles.container }>
            <Text style={ styles.message }>An error has occurred, please try again later.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ebebeb'
    },
    message: {
        fontSize: 24,
        fontWeight: '600',
        color: 'black',
        textAlign: 'center'
    }
});

export default ErrorMessage;