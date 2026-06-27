import { Image, ImageBackground, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import Typography from './Typography';
import { Colors } from '../../Constants/colors';
import Font from '../../Constants/Font';
import Images from '../../Constants/Images';
import SvgIcon from '../../Constants/SvgIcon';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import icons from '../../Constants/icons';


interface HeaderProps {
  title: string;
  styleMain?: StyleProp<ViewStyle>;
  onBackPress?: () => void;
  backButton?: boolean;
  onNotificationPress?: () => void;
  notification?: boolean

}
const Header = ({
  title,
  styleMain,
  onBackPress,
  backButton = true,
  onNotificationPress,
  notification = false
}: HeaderProps) => {
  const navigation = useNavigation<NavigationProp<ReactNavigation.RootParamList>>();

  return (
    <ImageBackground
      imageStyle={{ resizeMode: 'cover' }}
      source={Images.headerImage}
      style={[styles.mainView, styleMain]}>
      {backButton && (
        <TouchableOpacity
          onPress={onBackPress ?? (() => navigation.goBack())}
          style={styles.backButton}>
          <SvgIcon name="right_arrow" />
        </TouchableOpacity>
      )}
      {notification && (
        <TouchableOpacity
          onPress={onNotificationPress}
          style={styles.backButton}>
         <Image source={icons?.bell}  style={{height:28,width:28}}/>
        </TouchableOpacity>
      )}

      <Typography
        style={{ textAlign: 'center' }}
        color={Colors.titleText}
        size={24}
        fontFamily={Font.SemiBold}>
        {title}
      </Typography>
    </ImageBackground>
  );
};
export default Header

const styles = StyleSheet.create({
  mainView: {
    height: 120,
    // backgroundColor: Colors?.white,
    // elevation: 2,
    padding: 22,
    paddingTop: 40,
    resizeMode: "contain",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
  },
  backButton:{
    position:"absolute",
    left:20,
    bottom:28,
    backgroundColor:"rgba(255, 255, 255,0.5)",
    height:45,
    width:45,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:50
    
  }
})