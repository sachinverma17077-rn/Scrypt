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
import { validators } from '../../Backend/validators';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../Redux/authSlice';
import apiService from '../../api/apiService';
import { CheckUserRequest, CheckUserResponse } from '../../types/auth';
import { ENDPOINTS } from '../../api/endpoints';
import axios from 'axios';

type SignupErrors = {
    name?: string;
    userName?: string;
    email?: string;
    number?: string;
    password?: string;
    confirmpassword?: string;
    terms?: string;
};

const Signup = ({ navigation }: any) => {
    const dispatch = useDispatch()
    //**********************STATES***********************/  
    const [checked, setChecked] = useState(false)
    const [name, setName] = useState('');
    const [UserName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<SignupErrors>({});
    const [userData, serUserData] = useState({});
    const [loading,setLoading] = useState(false)
    console.log('userData', userData);


    //**********************METHODS***********************/  
    const handleSignup = async () => {
        setLoading(true)
        const tempError: SignupErrors = {};

        const nameError = validators.checkAlphabet(
            'Full Name',
            name,
            2,
            50,
        );

        if (nameError) {
            tempError.name = nameError;
        }
        const userNameError = validators.checkAlphabet(
            'Unique Name',
            UserName,
            2,
            50,
        );

        if (userNameError) {
            tempError.userName = userNameError;
        }

        const emailError = validators.checkEmail(
            'Email',
            email,
        );

        if (emailError) {
            tempError.email = emailError;
        }

        const numberError = validators.checkRequire(
            'Phone Number',
            number,
        );

        if (numberError) {
            tempError.number = numberError;
        }

        const passwordError =
            validators.checkRequire('Password', password) ||
            validators.checkPassword('Password', password);

        if (passwordError) {
            tempError.password = passwordError;
        }

        if (!confirmpassword) {
            tempError.confirmpassword =
                'Confirm Password is required';
        } else if (password !== confirmpassword) {
            tempError.confirmpassword =
                'Passwords do not match';
        }

        if (!checked) {
            tempError.terms =
                'You must agree to the Terms & Conditions';
        }

        setError(tempError);

        if (Object.keys(tempError).length === 0) {
            const data = {
                name: name,
                email: email,
                number: number,
                password: password,
                checked: checked,
                userName: UserName,
            }
            serUserData(data)

            // dispatch(setLogin());
            // navigation.navigate('OTPScreen')
            const body: CheckUserRequest = {
                email: email,
                userName: UserName,
                phoneNumber: number,

            }

            try {
                const response = await apiService?.post<CheckUserResponse>(
                    ENDPOINTS?.CHECK_USER_DATA,
                    body
                )
                setLoading(false)
                console.log('response', response);
                if (response?.success == true) {
                    navigation.navigate('OTPScreen', { data: userData })
                }

            } catch (error) {
                setLoading(false)
                if (axios.isAxiosError(error)) {
                    console.log(error.response?.status);
                    console.log(error.response?.data);
                } else {
                    console.log(error);
                }
            }

        }
    };

    //**********************MAIN UI***********************/  
    return (
        <AuthBackground>
            <Header title="Scypt" styleMain={{ alignItems: 'center' }} />
          
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
                                value={name}
                                onChange={(text: string) => {
                                    setName(text);

                                    if (error.name) {
                                        setError(prev => ({
                                            ...prev,
                                            name: undefined,
                                        }));
                                    }
                                }}
                                error={error?.name}
                                placeholder="Sachin Verma"
                                placeholderTextColor={Colors.placeHolderColor}
                            />

                            <Input
                                iconName="profile_Tab"
                                title="UNIQUE NAME"
                                value={UserName}
                                onChange={(text: string) => {
                                    setUserName(text);

                                    if (error.userName) {
                                        setError(prev => ({
                                            ...prev,
                                            userName: undefined,
                                        }));
                                    }
                                }}
                                error={error?.userName}
                                placeholder="Mind_Hunter"
                                placeholderTextColor={Colors.placeHolderColor}
                            />
                            <Typography size={12} fontFamily={Font?.Regular} color={Colors?.placeHolderColor} style={{ marginBottom: 5, width: FULL_WIDTH * 0.7 }}>Let's create your unique identity. Choose a username that represents you.</Typography>

                            <Input
                                iconName="mail"
                                title="EMAIL ADDRESS"
                                value={email}
                                onChange={(text: string) => {
                                    setEmail(text);

                                    if (error.email) {
                                        setError(prev => ({
                                            ...prev,
                                            email: undefined,
                                        }));
                                    }
                                }}
                                placeholder="Qwert@ABC.com"
                                placeholderTextColor={Colors.placeHolderColor}
                                error={error?.email}
                                keyboardType='email-address'
                            />

                            <Input
                                iconName="device"
                                title="PHONE NUMBER"
                                value={number}
                                onChange={(text: string) => {
                                    setNumber(text);

                                    if (error.number) {
                                        setError(prev => ({
                                            ...prev,
                                            number: undefined,
                                        }));
                                    }
                                }}
                                placeholder="895648596"
                                placeholderTextColor={Colors.placeHolderColor}
                                error={error?.number}
                                keyboardType='number-pad'
                            />

                            <Input
                                secure
                                iconName="lock"
                                title="PASSWORD"
                                value={password}
                                onChange={(text: string) => {
                                    setPassword(text);

                                    if (error.password) {
                                        setError(prev => ({
                                            ...prev,
                                            password: undefined,
                                        }));
                                    }
                                }}
                                placeholder="Abcde@1234"
                                placeholderTextColor={Colors.placeHolderColor}
                                error={error?.password}
                                
                            />
                            <Typography size={12} fontFamily={Font?.Regular} color={Colors?.placeHolderColor} style={{ marginBottom: 5, width: FULL_WIDTH * 0.7 }}>Must be at least 8 characters with letters and
                                numbers.</Typography>
                            <Input
                                secure
                                iconName="lock"
                                title="CONFIRM PASSWORD"
                                value={confirmpassword}
                                onChange={(text: string) => {
                                    setConfirmPassword(text);

                                    if (error.confirmpassword) {
                                        setError(prev => ({
                                            ...prev,
                                            confirmpassword: undefined,
                                        }));
                                    }
                                }}

                                placeholder="Abcde@1234"
                                placeholderTextColor={Colors.placeHolderColor}
                                error={error?.confirmpassword}
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
                            {error.terms && (
                                <Typography
                                    size={12}
                                    color={Colors.errorText}
                                    fontFamily={Font.Regular}
                                    style={{ marginTop: 5, textAlign: "right" }}
                                >
                                    {error.terms}
                                </Typography>
                            )}
                            <Button title='Create Account' style={{ marginTop: 30 }} icon={true} loading={loading} onPress={() => { handleSignup() }} />
                        </View>

                        <View style={styles?.footer} >
                            <Typography color='#64748B' size={16} fontFamily={Font?.Medium}>Already have an account? </Typography>
                            <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
                                <Typography color='#005DA7' size={16} fontFamily={Font?.Bold}> Login</Typography>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardWrapper>
          
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