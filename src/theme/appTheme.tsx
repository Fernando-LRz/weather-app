import { StyleSheet } from 'react-native';

const appTheme = StyleSheet.create({
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
        backgroundColor: '#230342',
        borderRadius: 30
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

export default appTheme;