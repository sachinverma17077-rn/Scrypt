import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../../Component/UI/Header'
import ComingSoon from '../../../Component/UI/ComingSoon'

const Privacy = () => {
  return (
   <View style={{flex:1}}>
      <Header title='Privacy' />
     <ComingSoon/>
    </View>
  )
}

export default Privacy

const styles = StyleSheet.create({})