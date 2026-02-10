import { Platform, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Switch } from 'react-native-switch';
const ToggleSwitch = ({
    value,
    onValueChange = () => { },
    title = '',
    style = {},
    size = 18,
    mainStyle,
}) => {
    return (
        <View style={[styles.main, mainStyle]}>
            <View style={[styles.border, style, {
                flexDirection: 'row',
            }]}>
                {/* {!!title && (
                    <Typography
                        type={fonts?.medium}
                        size={size}
                        textAlign={'left'}
                        color={colors?.notify_btn_black}
                        style={{
                            // width: '80%',
                            fontWeight: Platform.OS == 'ios' ? '500' : null,
                        }}>
                        {title}
                    </Typography>
                )} */}
                <View style={{ alignItems: 'flex-end', borderColor: 'transparent', borderWidth: 1, borderRadius: 35 }}>
                    <Switch
                        barHeight={30}
                        // containerStyle={{ margin: 1 }}
                        onValueChange={onValueChange}
                        value={value}
                        activeTextStyle={styles.TextStyle1}
                        inactiveTextStyle={styles.TextStyle}
                        switchWidthMultiplier={2.4}
                        circleBorderWidth={0.3}
                        backgroundActive={"#5BDB3B"}
                        
                        backgroundInactive={"#CFCFCF"}
                        circleSize={23}
                        circleActiveColor={'white'}
                        circleBorderActiveColor={"white"}
                        // circleBorderInactiveColor={colors?.white}
                        switchBorderRadius={35} // Border radius for the switch
                        // switchBorderColor={'red'} // Border color for the switch  
                        circleInActiveColor={"#ffffff"}

                        switchRightPx={3}
                        switchLeftPx={3}
                        activeText={''}
                        inActiveText={''}
                    />
                </View>
            </View>
        </View>
    );
};
export default ToggleSwitch;
const styles = StyleSheet.create({
    main: {
        // paddingTop: 40,
    },
    border: {
        justifyContent: 'space-between',
        width: '100%',
    },
    TextStyle1: {
        color: '#000',
    },
    TextStyle: {
        color: '#000',
    },
});