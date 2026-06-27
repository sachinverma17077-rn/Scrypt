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
import GradientText from '../../Component/UI/GradientText';
import { GradientColors } from '../../Constants/GradientColor';
import Toggle from '../../Component/UI/Toggle';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../Redux/authSlice';
import { validators } from '../../Backend/validators';
import apiService from '../../api/apiService';
import { LoginRequest, LoginResponse } from '../../types/auth';
import { ENDPOINTS } from '../../api/endpoints';
import { BASE_URL } from '../../api/env';
import axios, { AxiosError } from "axios";

interface IconItem {
  id: string;
  icon: React.ReactNode;
}

const Login = ({ navigation }: any) => {
  //**********************STATES***********************/  
  const [checked, setChecked] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  type LoginErrors = {
    email?: string;
    password?: string;
  };

  const [error, setError] = useState<LoginErrors>({});

  //**********************DATA***********************/ 

  const dispatch = useDispatch();
  const icons: IconItem[] = [
    {
      id: '1',
      icon: <SvgIcon color='#005DA7' name="shield" />,
    },
    {
      id: '2',
      icon: <SvgIcon color='#005DA7' name="shield_check" />,
    },
    {
      id: '3',
      icon: <SvgIcon color='#005DA7' name="shield_lock" />,
    },
  ];
  //**********************METHOD***********************/ 
  const handleLogin = async () => {
    const tempError: LoginErrors = {};

    const emailError = validators.checkEmail(
      'Email',
      email,
    );

    if (emailError) {
      tempError.email = emailError;
    }

    const passwordError = validators.checkRequire(
      'Password',
      password,
    );

    if (passwordError) {
      tempError.password = passwordError;
    }

    setError(tempError);

    if (Object.keys(tempError).length === 0) {

      const body: LoginRequest = {
        email,
        password
      }
      console.log('body', body);
      console.log('url', `${BASE_URL}${ENDPOINTS?.LOGIN}`);


      try {
        const response = await apiService?.post<LoginResponse>(
          ENDPOINTS?.LOGIN,
          body

        );
        console.log('response', response);
        dispatch(
          setLogin({
            email,
          }),
        );
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.status);
          console.log(error.response?.data);
        } else {
          console.log(error);
        }
      }
      // dispatch(
      //   setLogin({
      //     email,
      //   }),
      // );
    }
  };
  return (
    <AuthBackground >
      {/* <Header title="Scypt" styleMain={{ alignItems: 'center' }} /> */}
      <ScrollView>
        <KeyboardWrapper>

          <View style={styles.screenView}>
            {/* <View style={styles.wellcomeText}>
              <Typography
                size={36}
                color={Colors.titleBlack}
                fontFamily={Font.ExtraBold}
              >
                Welcome Back!
              </Typography>

              <Typography
                style={{ marginTop: 10 }}
                size={16}
                color={Colors.placeHolderColor}
                fontFamily={Font.Medium}
              >
                Your friends and messages are waiting.
              </Typography>
            </View> */}

            <View style={styles?.header}>
              <View style={styles?.lockIcon}>
                <SvgIcon name={'lock'} color='#005DA7' size={40} />
              </View>


              <GradientText colors={GradientColors?.text} style={{ fontSize: 32, fontFamily: Font?.ExtraBold, marginTop: 5 }} text='Scrypt' />

              <Typography style={{ marginTop: 5 }} size={18} fontFamily={Font?.Medium} color='#64748B'>Secure communication, simplified.</Typography>
            </View>


            <View style={styles.mainCard}>

              <View style={styles.wellcomeText}>
                <Typography
                  size={24}
                  color={Colors.titleBlack}
                  fontFamily={Font.ExtraBold}
                >
                  Welcome Back!
                </Typography>

                <Typography
                  style={{ marginTop: 10 }}
                  size={14}
                  color={Colors.placeHolderColor}
                  fontFamily={Font.Medium}
                >
                  Unlock your vault to continue.
                </Typography>
              </View>
              <Input
                iconName="mail"
                title="EMAIL ADDRESS"
                value={email}
                error={error.email}
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
                keyboardType="email-address"
              />


              <Input
                secure
                iconName="key"
                title="PASSWORD"
                value={password}
                error={error.password}
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
                forgot={true}
                onForgotPress={() => {
                  navigation.navigate('ForgetPassword');
                }}
              />

              <View style={styles?.rememberArea}>
                <Toggle />
                <Typography size={14} fontFamily={Font?.Regular} color='#414751'>Remember this device</Typography>
              </View>
              <Button title='Unlock' style={{ marginTop: 30 }} icon={true} onPress={() => {
                handleLogin()
              }} />


              <View style={styles?.authbar} >
                <View style={{ borderWidth: 0.5, borderColor: "rgba(100, 116, 139,0.2)", width: '35%' }} />
                <Typography size={11} fontFamily={Font?.Bold} color='#94A3B8'>SECURE AUTH</Typography>
                <View style={{ borderWidth: 0.5, borderColor: "rgba(100, 116, 139,0.2)", width: '35%' }} />
              </View>

              <View style={styles?.authButtons} >
                <TouchableOpacity style={styles?.Button}>

                  <SvgIcon name={'google'} />
                  <Typography size={14} color='#111C2D' fontFamily={Font?.Regular}>Google</Typography>
                </TouchableOpacity>
                <TouchableOpacity style={styles?.Button}>

                  <SvgIcon name={'apple'} />
                  <Typography size={14} color='#111C2D' fontFamily={Font?.Regular}>Apple</Typography>
                </TouchableOpacity>
                <TouchableOpacity style={styles?.Button}>

                  <SvgIcon name={'facebook'} />
                  <Typography size={14} color='#111C2D' fontFamily={Font?.Regular}>FaceBook</Typography>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles?.footer} >
              <Typography color='#64748B' size={16} fontFamily={Font?.Medium}>New to Scrypt? </Typography>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Typography color='#005DA7' size={16} fontFamily={Font?.Bold}> Create Account</Typography>
              </TouchableOpacity>
            </View>


            <View>
              <View style={{ flexDirection: 'row', gap: 18, alignSelf: "center", marginTop: 30 }}>
                {icons.map((item) => (
                  <View
                    key={item.id}
                    style={{
                      height: 40,
                      width: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 20,
                      backgroundColor: 'white',
                      elevation: 2,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.1,
                      shadowRadius: 2,
                      borderWidth: 1,
                      borderColor: "#E2E8F0"
                    }}
                  >
                    {item.icon}
                  </View>
                ))}
              </View>
              <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', gap: 2, marginTop: 15 }}>
                <SvgIcon name={'shield_check'} />
                <Typography style={{ alignSelf: "center" }} size={12} fontFamily={Font?.Regular} color='#94A3B8'>END-TO-END ENCRYPTED PROTOCOL.</Typography>

              </View>

            </View>
          </View>
        </KeyboardWrapper>
      </ScrollView>
    </AuthBackground>
  );
};

export default Login;

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
    marginTop: 20,
    marginBottom: 30,
  },

  footer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 40
  },
  lockIcon: {
    height: 74,
    width: 80,
    elevation: 1,
    backgroundColor: '#ebf5ff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 93, 167,0.05)',
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
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
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 93, 167, 0.1)",
    borderRadius: 16,
    flexDirection: 'row',
    gap: 5
  },
});