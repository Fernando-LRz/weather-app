import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export const ErrorMessage = () => {
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
        backgroundColor: '#2b0354'
    },
    message: {
        fontSize: 24,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center'
    }
});