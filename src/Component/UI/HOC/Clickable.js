import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import Ripple from 'react-native-material-ripple'

const Clickable = ({
    children,
    style,
    onPress = () => { },
    rippleColor = '#f0f0f0',
    borderRadius,
    disabled = false,
    ...props
}) => {
    return (
        <Ripple disabled={disabled} style={style} onPress={onPress} rippleContainerBorderRadius={borderRadius} rippleColor={rippleColor} {...props}>
            {children}
        </Ripple>
    )
}

export default Clickable

const styles = StyleSheet.create({})