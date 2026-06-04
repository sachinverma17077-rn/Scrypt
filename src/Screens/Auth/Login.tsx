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

const Login = () => {
  //**********************STATES***********************/  
  const [checked, setChecked] = useState(false)
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

           
            <GradientText colors={GradientColors?.text} style={{fontSize:32,fontFamily:Font?.ExtraBold,marginTop:5}} text='Scrypt'/>

            <Typography style={{marginTop:5}} size={18} fontFamily={Font?.Medium} color='#64748B'>Secure communication, simplified.</Typography>
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
                placeholder="Qwert@ABC.com"
                placeholderTextColor={Colors.placeHolderColor}
              />


              <Input
                secure
                iconName="key"
                title="PASSWORD"
                placeholder="Abcde@1234"
                placeholderTextColor={Colors.placeHolderColor}
                forgot={true}
              />



              <Button title='Create Account' style={{ marginTop: 30 }} icon={true} />
            </View>

            <View style={styles?.footer} >
              <Typography color='#64748B' size={16} fontFamily={Font?.Medium}>New to Scrypt? </Typography>
              <TouchableOpacity>
                <Typography color='#005DA7' size={16} fontFamily={Font?.Bold}> Create Account</Typography>
              </TouchableOpacity>
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
    paddingTop:60
  },

  wellcomeText: {
    // alignItems: 'center',
    marginTop: 10,
    marginBottom:50
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
    marginTop: 50
  },
  lockIcon:{
    height:74,
    width:80,
    elevation:1,
    backgroundColor:'#ebf5ff',
    borderRadius:24,
    borderWidth:1,
    borderColor:'rgba(0, 93, 167,0.05)',
    alignSelf:"center",
    justifyContent:"center",
    alignItems:"center"
  },
  header:{
    justifyContent:"center",
    alignItems:"center"
  }
});