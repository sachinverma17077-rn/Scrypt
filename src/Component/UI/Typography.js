import { StyleSheet, Text as RNText, View } from 'react-native'
import React from 'react'
import { Fonts } from '../../Constants/Font'
import { Colors } from '../../Constants/colors'

const Typography = ({
    size = 14,
    children,
    fontFamily ,
    color = Colors.text_Color,
    textAlign = "left",
    style = {},
    numberOfLines,
    lineHeight,
    fontWeight,
    letterSpacing,
    onPress,
    ...props
}) => {
    return (
        <RNText
        onPress={onPress}
            numberOfLines={numberOfLines}
            style={[
                styles.font,
                {
                    fontSize: size,
                    color: color,
                    textAlign,
                    // fontWeight: fontWeight,
                    lineHeight: lineHeight,
                    fontFamily: fontFamily,
                    letterSpacing: letterSpacing
                },
                style,
            ]}
            {...props}>
            {children}
        </RNText>

    )
}

export default Typography

const styles = StyleSheet.create({
    font: {
        // fontFamily: fonts[type] || undefined,
        textAlignVertical: 'center',
        includeFontPadding: false,
        // marginVertical: -10,
        // backgroundColor: 'red'
    },
});