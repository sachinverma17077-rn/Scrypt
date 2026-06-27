import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../../Component/UI/Header'
import ComingSoon from '../../../Component/UI/ComingSoon'

const NotificationSettings = () => {
  return (
    <View style={{flex:1}}>
      <Header title='Notification Settings' />
     <ComingSoon/>
    </View>
  )
}

export default NotificationSettings

const styles = StyleSheet.create({})