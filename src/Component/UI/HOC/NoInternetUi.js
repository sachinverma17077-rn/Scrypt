import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Lottie from 'lottie-react-native'
import lottie from '../../../assets/lottie'
import { FocusAwareStatusBar } from '../FocusAwareStatusBar'
const NoInternetUi = () => {
    const ref = useRef(null)
    useEffect(() => {
        if (ref.current) {
            ref.current?.play()
        }
    }, [ref.current])
    return (
        <View style={styles.container}>
            <FocusAwareStatusBar />
            <Lottie
                source={lottie.noInternet}
                loop={true}
                ref={ref}
            />
        </View>
    )
}

export default NoInternetUi

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
})