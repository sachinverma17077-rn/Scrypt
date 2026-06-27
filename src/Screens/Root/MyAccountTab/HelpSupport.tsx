import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../../Component/UI/Header'
import ComingSoon from '../../../Component/UI/ComingSoon'

const HelpSupport = () => {
  return (
  <View style={{flex:1}}>
      <Header title='Help Support' />
     <ComingSoon/>
    </View>
  )
}

export default HelpSupport

const styles = StyleSheet.create({})