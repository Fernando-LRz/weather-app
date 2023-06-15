import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import homeTheme from '../theme/homeTheme';

interface Props {
    resetSearchTerm: (searchTerm: string) => void;
}

const BackButton = ({ resetSearchTerm }: Props) => {
    return (
        <View style={{ 
            alignItems: 'center', 
            marginTop: 50, 
            marginBottom: 40 
        }}>
            <TouchableOpacity 
                activeOpacity={ 0.8 }
                style={ homeTheme.backButton }
                onPress={ () => resetSearchTerm('') }
            >
                <Text style={ homeTheme.backButtonText }>Back</Text>
            </TouchableOpacity>
        </View>
    );
};

export default BackButton;