import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AuthBackground from '../../Component/AuthBackground'
import { FULL_HEIGHT } from '../../Constants/Dimensions'
import Button from '../../Component/UI/Button'
import { useDispatch } from 'react-redux';
import { setLogout } from '../../Redux/authSlice'



const MyAccount = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.mainContainer}>
   <View style={styles?.fieldCard}>
    <Button title='Logout' onPress={() => dispatch(setLogout())}/>

   </View>
    </View>
  )
}

export default MyAccount

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor:'white',
    justifyContent:'center',
     alignItems:"center"
  },
  fieldCard:{

   
  
  }
})