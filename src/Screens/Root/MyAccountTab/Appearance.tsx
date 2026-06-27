import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ComingSoon from '../../../Component/UI/ComingSoon'
import Header from '../../../Component/UI/Header'

const Appearance = () => {
  return (
    <View style={{flex:1}}>
      <Header title='Appearance' />
     <ComingSoon/>
    </View>
  )
}

export default Appearance

const styles = StyleSheet.create({})