import { Animated, Easing, StyleSheet, View } from 'react-native';
import React, { useRef, useState } from 'react';
import Typography from '../Component/UI/Typography';

const GlobalToast = () => {
    const animated = useRef(new Animated.Value(0)).current;
    const [toastMessage, setMessage] = useState('');
    const [show, setShow] = useState(false);
    const [toastType, setToastType] = useState('success'); // Default type

    global.ToastMessage = (message = '', type = 'success') => {
        try {
            message && setMessage(message);
            type && setToastType(type);
            setShow(true);
        } catch (error) { }

        Animated.timing(animated, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.ease,
        }).start();

        setTimeout(() => {
            setMessage('');
            Animated.timing(animated, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
                easing: Easing.ease,
            }).start();
            setShow(false);
        }, 4000);
    };

    return (
        <>
            {show && (
                <Animated.View style={styles.container(animated)}>
                    <View>
                        <Typography color={toastType === 'error' ? 'red' : 'green'} size={14}>
                            {toastMessage}
                        </Typography>
                    </View>
                </Animated.View>
            )}
        </>
    );
};

export default GlobalToast;

const styles = StyleSheet.create({
    container: (animated) => ({
        top: animated.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 45],
        }),
        opacity: animated.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        }),
        backgroundColor: 'white', // Always white background
        elevation: 1,
        marginHorizontal: 20,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 25,
        shadowColor: '#9A9A9A',
        borderRadius: 8,
        paddingVertical: 15,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        position: 'absolute',
        top: '85%',
    }),
});