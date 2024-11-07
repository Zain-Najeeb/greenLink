import { Stack } from 'expo-router';
import React from 'react';
import { primaryColour } from '@/constants/Colors';
const RootLayout = () => {
    return (
        <Stack>
            <Stack.Screen name = "index"
                      options={{ 
                        headerTitle: 'Home',
                        headerTintColor: primaryColour
                    }}
            /> 
            <Stack.Screen name = "signup/signup"
            options={{ 
                headerTitle: 'Create Account',
                headerTintColor: primaryColour
            }}
            /> 
        </Stack>
    );
}

export default RootLayout;
