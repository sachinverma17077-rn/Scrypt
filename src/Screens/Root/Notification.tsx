import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../Component/UI/Header'
import ComingSoon from '../../Component/UI/ComingSoon'

const Notification = () => {
  return (
 <View style={{flex:1}}>
      <Header title='Notification' />
     <ComingSoon/>
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({})