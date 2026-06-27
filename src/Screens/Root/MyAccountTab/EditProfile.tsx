import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../../Component/UI/Header'
import ComingSoon from '../../../Component/UI/ComingSoon'

const EditProfile = () => {
  return (
     <View style={{flex:1}}>
      <Header title='Edit Profile' backButton={true} />
     <ComingSoon/>
    </View>
  )
}

export default EditProfile

const styles = StyleSheet.create({})