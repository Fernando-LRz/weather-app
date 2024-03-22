import { StyleSheet } from 'react-native';

export const appTheme = StyleSheet.create({
    infoBoxTitle: {
        fontSize: 18,
        color: '#fff'
    },
    infoBoxLabel: {
        fontSize: 19,
        color: '#fff',
        fontWeight: '700',
    },
    infoBoxData: {
        fontSize: 25,
        color: '#fff',
        fontWeight: '500',
    },
    infoBox: {
        marginTop: 20,
        marginHorizontal: 20,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#c78006',
        borderRadius: 30
    },
    backButtonText: {
        fontSize: 22,
        fontWeight: '600',
        color: '#fff'
    },
    backButton: {
        backgroundColor: '#2c14de',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 20,
    }
});