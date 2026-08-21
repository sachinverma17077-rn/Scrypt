import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

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
import OTPInput from '../../Component/UI/OTPInput';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { RegisterRequest, RegisterResponse, SendOTPRequest, SendOTPResponse, VerifyOTPRequest, VerifyOTPResponse } from '../../types/auth';
import apiService from '../../api/apiService';
import { ENDPOINTS } from '../../api/endpoints';
import axios from 'axios';
import { useSafeAreaFrame } from 'react-native-safe-area-context';

interface IconItem {
  id: string;
  icon: React.ReactNode;
}

const OTPScreen = ({ navigation }: any) => {
  //**********************CONSTANCE***********************/  
  const route = useRoute();



  const { data } = route.params as {
    data: {
      name: string;
      email: string;
      number: string;
      password: string;
      checked: boolean;
      userName: string;
    };
  };

  console.log('dataaaaaaaa',data);



  const dispatch = useDispatch();
  const isFocused = useIsFocused();


  //**********************STATE***********************/ y 
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [loading,setLoading] = useState(false)
  //**********************HOOKES***********************/ y 
  useEffect(() => {
    if (isFocused) {
      handleSendOtp()
    }
  }, [isFocused])

  //**********************API***********************/ 

  const handleSendOtp = async () => {
    
    const body: SendOTPRequest = {
      phoneNumber: data?.number
    }
    console.log('body', body);

    try {
      const response = await apiService?.post<SendOTPResponse>(
        ENDPOINTS?.SEND_OTP,
        body
      )
      console.log('response', response);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error status', error.response?.status);
        console.log('error data', error.response?.data);
      } else {
        console.log('error ', error);
      }
    }
  }


  const handleVerifyOTP = async () => {
    setLoading(true)
    if (!otp.trim()) {
      setOtpError('OTP is required');
      return;
    }

    if (otp.length !== 6) {
      setOtpError('Please enter a valid 6-digit OTP');
      return;
    } else {

      const body: VerifyOTPRequest = {
        otp: otp
      }
      console.log('body', body);

      try {

        const response = await apiService?.post<VerifyOTPResponse>(
          ENDPOINTS?.VERIFY_OTP,
          body
        );
        setLoading(false)
        console.log('response', response);
        if(response?.success==true){
          handleRegisterUser()
        }

      } catch (error) {
        setLoading(false)
        if (axios.isAxiosError(error)) {
          console.log('error status', error.response?.status);
          console.log('error data', error.response?.data);
        } else {
          console.log('error ', error);
        }
      }
    }





  };

  const handleRegisterUser = async () => {
    const body: RegisterRequest = {
      name: data?.name,
      email: data?.email,
      phoneNumber: data?.number,
      password: data?.password,
      checked: data?.checked,
      userName: data?.userName
    }

    try{
      const response = await apiService?.post<RegisterResponse>(
        ENDPOINTS?.REGISTER_USER,
        body
      ) 
        if(response?.success==true){
          dispatch(setLogin(response?.data));
        }
      
      console.log('register user',response);
      
    } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('error status', error.response?.status);
          console.log('error data', error.response?.data);
        } else {
          console.log('error ', error);
        }
      }
  }


  //**********************MAINUI***********************/ 
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
                <SvgIcon name={'device_check'} color='#005DA7' size={42} />
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
                  Verify Your Email
                </Typography>

                <Typography
                  style={{ marginTop: 10, textAlign: "center" }}
                  size={14}
                  color={Colors.placeHolderColor}
                  fontFamily={Font.Medium}

                >
                  We've sent a 6-digit verification code{''}to name@example.com. Please enter it
                  {' '}below
                </Typography>
              </View>

              <OTPInput
                onTextChange={(text) => {
                  setOtp(text);
                  setOtpError('');
                }}
              />
              {otpError && (
                <Typography textAlign='right' color="red" size={12} fontFamily={Font?.Regular} style={{ marginTop: 5 }} >
                  {otpError}
                </Typography>
              )}
              <Button title='Verify & Proceed' style={{ marginTop: 30 }} loading={loading} icon={true} onPress={() => {
                // dispatch(setLogin());
                handleVerifyOTP();
              }} />
              <View style={styles?.textarea}>
                <Typography color='#64748B' size={16} fontFamily={Font?.Regular}>Didn't receive the code?</Typography>
                <TouchableOpacity>
                  <Typography color='#3B82F6' size={16} fontFamily={Font?.Regular}>Resend Code</Typography>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles?.backtologin}>
                  <SvgIcon size={18} name={'arrow_left'} />
                  <Typography>Back to login</Typography>
                </TouchableOpacity>
              </View>



            </View>


            <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', gap: 2, }}>
              <SvgIcon name={'shield_check'} />
              <Typography style={{ alignSelf: "center" }} size={12} fontFamily={Font?.Regular} color='#94A3B8'>END-TO-END ENCRYPTED PROTOCOL.</Typography>

            </View>

          </View>
        </KeyboardWrapper>
      </ScrollView>
    </AuthBackground>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
    padding: 22,
    paddingTop: 60
  },

  wellcomeText: {
    alignItems: 'center',
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
  textarea: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: 'center',
    gap: 5
  },
  backtologin: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
    // gap:5
  }
});