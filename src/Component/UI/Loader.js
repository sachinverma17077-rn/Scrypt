import React, {memo} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import LottieView from 'lottie-react-native';
import icons from '../../Constants/icons';

const Loader = ({isLoading = null,trans=true,loaderContainer}) => {
  if (!isLoading) return null; 

  return (
    <View style={[styles.loaderContainer,loaderContainer]}>
      <View style={styles.loaderContent}>
        <View style={styles.imageContainer}>
          <Image source={icons.ic_logo} style={styles.loaderImage} />
        </View>
        <View style={[styles.lottieContainer]}>
          <LottieView
            speed={1}
            style={styles.lottieStyle}
            source={require('../../assets/lottie/circle.json')}
            autoPlay
            loop
          />
        </View>
      </View>
    </View>
  );
};

export default memo(Loader);

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute', 
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 20, 20, 0.1)',
    zIndex: 999,
  },
  loaderContent: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    backgroundColor: '#fff',
    padding: 7,
    borderRadius: 120,
    overflow: 'hidden',
  },
  loaderImage: {
    height: 45,
    width: 45,
    borderRadius: 120,
    resizeMode: 'contain',
  },
  lottieContainer: {
    position: 'absolute',
    height:100,
    width:100
  },
  lottieStyle: {
    height: 100,
  },
});