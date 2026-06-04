import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

import AuthBackground from '../../Component/AuthBackground';
import KeyboardWrapper from '../../Component/UI/KeyboardWrapper';
import Input from '../../Component/UI/Input';
import Header from '../../Component/UI/Header';
import Typography from '../../Component/UI/Typography';

import { Colors } from '../../Constants/colors';
import Font from '../../Constants/Font';
import { FULL_WIDTH } from '../../Constants/Dimensions';
import SvgIcon from '../../Constants/SvgIcon';
import Button from '../../Component/UI/Button'

const Signup = ({navigation}:any) => {
    //**********************STATES***********************/  
    const [checked, setChecked] = useState(false)
    return (
        <AuthBackground>
            <Header title="Scypt" styleMain={{ alignItems: 'center' }} />
            <ScrollView>
                <KeyboardWrapper>

                    <View style={styles.screenView}>
                        <View style={styles.wellcomeText}>
                            <Typography
                                size={36}
                                color={Colors.titleBlack}
                                fontFamily={Font.ExtraBold}
                            >
                                Secure your future
                            </Typography>

                            <Typography
                                style={{ marginTop: 10 }}
                                size={16}
                                color={Colors.placeHolderColor}
                                fontFamily={Font.Medium}
                            >
                                Join Scrypt to experience the next
generation of private communication.
                            </Typography>
                        </View>

                        <View style={styles.mainCard}>
                            <Input
                                iconName="profile_Tab"
                                title="FULL NAME"
                                placeholder="Sachin Verma"
                                placeholderTextColor={Colors.placeHolderColor}
                            />

                            <Input
                                iconName="mail"
                                title="EMAIL ADDRESS"
                                placeholder="Qwert@ABC.com"
                                placeholderTextColor={Colors.placeHolderColor}
                            />

                            <Input
                                iconName="device"
                                title="PHONE NUMBER"
                                placeholder="895648596"
                                placeholderTextColor={Colors.placeHolderColor}
                            />

                            <Input
                                secure
                                iconName="lock"
                                title="PASSWORD"
                                placeholder="Abcde@1234"
                                placeholderTextColor={Colors.placeHolderColor}
                            />
                            <Typography size={12} fontFamily={Font?.Regular} color={Colors?.placeHolderColor} style={{ marginBottom: 5, width: FULL_WIDTH * 0.7 }}>Must be at least 8 characters with letters and
                                numbers.</Typography>
                            <Input
                                secure
                                iconName="lock"
                                title="CONFIRM PASSWORD"
                                placeholder="Abcde@1234"
                                placeholderTextColor={Colors.placeHolderColor}
                            />

                            <View style={styles?.termsView}>
                                <TouchableOpacity onPress={() => { setChecked(!checked) }} style={styles?.check} >

                                    {checked && (<SvgIcon name={'check'} color='#005DA7' size={16} />)}
                                </TouchableOpacity>
                                <View style={{ flexDirection: "row", width: FULL_WIDTH * 0.5 }} >

                                    <Typography size={14} fontFamily={Font?.Regular} color='#64748B'>I agree to the</Typography>
                                    <TouchableOpacity><Typography size={14} fontFamily={Font?.Regular} color='#005DA7'> Terms</Typography></TouchableOpacity>
                                    <Typography size={14} fontFamily={Font?.Regular} color='#64748B'> and</Typography>
                                    <TouchableOpacity><Typography size={13} fontFamily={Font?.SemiBold} color='#005DA7'> Privacy Policy</Typography></TouchableOpacity>

                                </View>
                            </View>
                            <Button title='Create Account' style={{ marginTop: 30 }} icon={true} />
                        </View>

                        <View style={styles?.footer} >
                            <Typography color='#64748B' size={16} fontFamily={Font?.Medium}>Already have an account? </Typography>
                            <TouchableOpacity onPress={()=>{navigation.navigate('Login')}}>
                                <Typography color='#005DA7' size={16} fontFamily={Font?.Bold}> Login</Typography>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardWrapper>
            </ScrollView>
        </AuthBackground>
    );
};

export default Signup;

const styles = StyleSheet.create({
    screenView: {
        flex: 1,
        padding: 22,
    },

    wellcomeText: {
        alignItems: 'center',
        marginTop: 10,
    },

    mainCard: {
        padding: 22,
        backgroundColor: Colors.cardbg,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: Colors.borderColor,
        marginTop: 20,
        marginBottom: 30,
    },
    termsView: {
        marginTop: 10,
        flexDirection: "row",
        gap: 12
    },
    check: {
        height: 20,
        width: 20,
        borderWidth: 1,
        borderColor: 'rgba(0, 93, 167, 0.2)',
        borderRadius: 8,
        justifyContent: "center",
        alignItems: 'center'
    },
    footer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 50
    },
});