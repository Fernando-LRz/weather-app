import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import appTheme from '../theme/appTheme';

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
                style={ appTheme.backButton }
                onPress={ () => resetSearchTerm('') }
            >
                <Text style={ appTheme.backButtonText }>Back</Text>
            </TouchableOpacity>
        </View>
    );
};

export default BackButton;