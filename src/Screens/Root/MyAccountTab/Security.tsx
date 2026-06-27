import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../../Component/UI/Header'
import ComingSoon from '../../../Component/UI/ComingSoon'

const Security = () => {
  return (
  <View style={{flex:1}}>
      <Header title='Security' />
     <ComingSoon/>
    </View>
  )
}

export default Security

const styles = StyleSheet.create({})