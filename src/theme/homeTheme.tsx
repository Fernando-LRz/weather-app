import { StyleSheet } from 'react-native';

const homeTheme = StyleSheet.create({
    header: {
        backgroundColor: '#12083b'
    },
    headerCityName: {
        textAlign: 'center',
        fontSize: 38,
        color: 'white',
        fontWeight: '500',
        marginTop: 20
    },
    headerTemp: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
        color: 'white',
        opacity: 0.5,
        marginBottom: 25
    },
    infoBoxTitle: {
        fontSize: 18,
        color: '#b7b5ba'
    },
    infoBoxLabel: {
        fontSize: 19,
        color: '#b7b5ba',
        fontWeight: '700'
    },
    infoBoxData: {
        fontSize: 25,
        color: '#b7b5ba',
        fontWeight: '500',
    },
    infoBox: {
        marginTop: 20,
        marginHorizontal: 20,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#20053d',
        borderRadius: 30,
        borderColor: 'grey',
        borderWidth: 1
    },
    backButtonText: {
        fontSize: 22,
        fontWeight: '600',
        color: 'white'
    },
    backButton: {
        backgroundColor: '#20053d',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'grey'
    }
});

export default homeTheme;