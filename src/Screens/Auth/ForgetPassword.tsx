import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

import AuthBackground from '../../Component/AuthBackground';
import KeyboardWrapper from '../../Component/UI/KeyboardWrapper';
import Input from '../../Component/UI/Input';
import Header from '../../Component/UI/Header';
import Typography from '../../Component/UI/Typography';

import { Colors } from '../../Constants/colors';
import Font from '../../Constants/Font';
import { FULL_HEIGHT, FULL_WIDTH } from '../../Constants/Dimensions';
import SvgIcon from '../../Constants/SvgIcon';
import Button from '../../Component/UI/Button'
import GradientText from '../../Component/UI/GradientText';
import { GradientColors } from '../../Constants/GradientColor';
import Toggle from '../../Component/UI/Toggle';

const ForgetPassword = ({ navigation }: any) => {
    return (
        <AuthBackground >
            {/* <Header title="Scypt" styleMain={{ alignItems: 'center' }} /> */}
            <ScrollView>
                <KeyboardWrapper>

                    <View style={styles.screenView}>

                        <View style={styles?.header}>
                            <View style={styles?.lockIcon}>
                                <View style={styles?.innerlockIcon}>
                                    <SvgIcon name={'shield_lock'} color='white' size={30} />
                                </View>
                            </View>


                            <Typography style={{ fontSize: 28, fontFamily: Font?.Bold, marginTop: 25 }} color='#111C2D'  >Forgot Password?</Typography>
                            <View style={{ justifyContent: "center", width: FULL_HEIGHT * 0.4, marginTop:10}}>
                                <Typography style={{ marginTop: 5, alignSelf: "center" }} size={16} fontFamily={Font?.Regular} color='#414751'>No worries, it happens. Enter your email
                                </Typography>
                                <Typography style={{ marginTop: 5, alignSelf: "center" }} size={16} fontFamily={Font?.Regular} color='#414751'>and we'll send you a link to reset your
                                </Typography>
                                <Typography style={{ marginTop: 5, alignSelf: "center" }} size={16} fontFamily={Font?.Regular} color='#414751'>password.</Typography>
                            </View>

                        </View>


                        <View style={styles.mainCard}>


                            <Input
                                iconName="mail"
                                title="EMAIL ADDRESS"
                                placeholder="Qwert@ABC.com"
                                placeholderTextColor={Colors.placeHolderColor}
                            />



                            <Button title='Unlock' style={{ marginTop: 15 }} icon={true} />



                        </View>

                        <View style={styles?.footer} >
                            <SvgIcon name={'arrow_left'} color='#005DA7' />
                            <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                                <Typography color='#005DA7' size={16} fontFamily={Font?.Bold}> Back to Login</Typography>
                            </TouchableOpacity>
                        </View>

                        <View style={{ alignSelf: "center", justifyContent: 'center', alignItems: "center" ,marginTop:10}}>
                            <Typography color='#414751' size={14} fontFamily={Font?.Regular}>Still having trouble?</Typography>
                            <TouchableOpacity style={styles?.Button}>
                                <Typography size={16} color='#111C2D' fontFamily={Font?.Regular} >Contact Support</Typography>
                            </TouchableOpacity>

                        </View>




                    </View>
                </KeyboardWrapper>
            </ScrollView>
        </AuthBackground>
    )
}

export default ForgetPassword

const styles = StyleSheet.create({
    screenView: {
        flex: 1,
        padding: 22,
        paddingTop: 60
    },

    wellcomeText: {
        // alignItems: 'center',
        marginTop: 10,
        marginBottom: 50
    },

    mainCard: {
        padding: 22,
        backgroundColor: Colors.cardbg,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: Colors.borderColor,
        marginTop: 50,
        marginBottom: 30,
        paddingBottom: 50
    },

    footer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 120,
        marginBottom: 40
    },
    lockIcon: {
        height: 80,
        width: 80,
        elevation: 1,
        backgroundColor: '#ebf5ff',
        borderRadius: '100%',
        borderWidth: 1,
        borderColor: 'rgba(0, 93, 167,0.05)',
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    innerlockIcon: {
        height: 56,
        width: 56,
        backgroundColor: "#2976C7",
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: "100%"
    },
    header: {
        justifyContent: "center",
        alignItems: "center"
    },
    rememberArea: {
        flexDirection: "row",
        gap: 10,
        // marginTop:10

    },
    authbar: {
        flexDirection: 'row',
        marginTop: 30,
        alignItems: "center",
        justifyContent: "space-between"
    },
    authButtons: {
        justifyContent: 'space-between',
        flexDirection: "row",
        marginTop: 20
    },
    Button: {
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderWidth: 1,
        borderColor: "rgba(0, 93, 167, 0.1)",
        borderRadius: 16,
        flexDirection: 'row',
        gap: 5,
        marginTop:10
    },

});