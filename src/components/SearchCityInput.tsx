import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import useDebouncedValue from '../hooks/useDebouncedValue';

import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    onDebounce: (value: string) => void;
    onFocus: (value: boolean) => void;
};

const SearchCityInput = ({ onDebounce, onFocus }: Props) => {

    const [ search, setSearch ] = useState('');
    const { debouncedValue } = useDebouncedValue( search );

    useEffect(() => {
        onDebounce(debouncedValue);
    }, [ debouncedValue ]);

    return (
        <View style={ styles.container }>
            <View style={ styles.backgroundText }>
                <TextInput 
                    placeholder="Search City..."
                    autoCapitalize="none"
                    autoCorrect={ false }
                    style={ styles.inputText }
                    value={ search }
                    onChangeText={ setSearch }
                    onFocus={ () => onFocus(true) }
                    onBlur={ () => onFocus(false) }
                />
                <Icon 
                    name="search-outline"
                    color="grey"
                    size={ 30 }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 20
    },
    backgroundText: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        paddingHorizontal: 20,
        borderRadius: 50, 
        backgroundColor: '#F3F1F3',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    inputText: {
        fontSize: 18,
        flex: 1
    }
});

export default SearchCityInput;