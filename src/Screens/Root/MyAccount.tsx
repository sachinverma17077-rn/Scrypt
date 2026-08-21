import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AuthBackground from '../../Component/AuthBackground'
import { FULL_HEIGHT } from '../../Constants/Dimensions'
import Button from '../../Component/UI/Button'
import { useDispatch } from 'react-redux';
import { setLogout } from '../../Redux/authSlice'
import Header from '../../Component/UI/Header'
import Images from '../../Constants/Images'
import Typography from '../../Component/UI/Typography'
import Font from '../../Constants/Font'
import Svg from 'react-native-svg'
import SvgIcon from '../../Constants/SvgIcon'



const MyAccount = ({navigation}:any) => {
  //*****************CONSTANTS*********************/
  const dispatch = useDispatch();
  const isPrimiumUser = true;
  //*****************FIELD DATA*********************/

  const fieldData = [
    { id: 1, title: 'Edit Profile', iconName: 'mail', iconbg: '#D4E3FF', navigation: 'EditProfile' },
    { id: 2, title: 'Privacy', iconName: 'mail', iconbg: '#D4E3FF', navigation: 'Privacy' },
    { id: 3, title: 'Notifications', iconName: 'mail', iconbg: '#D4E3FF', navigation: 'NotificationSettings' },
    { id: 4, title: 'Security', iconName: 'mail', iconbg: '#D4E3FF', navigation: 'Security' },
    { id: 5, title: 'Appearance', iconName: 'mail', iconbg: '#D4E3FF', navigation: 'Appearance' },
    { id: 6, title: 'Help & Support', iconName: 'mail', iconbg: '#D4E3FF', navigation: 'HelpSupport' },

  ]
  //*****************FLATLIST UI*********************/
  const renderItem = ({ item, index }: any) => {
    return (
      <View>
        {index !== 0 && (
          <View style={styles?.divider} />
        )}
        <TouchableOpacity style={styles?.mainCard} onPress={()=>{navigation.navigate(item?.navigation)}} >
          <View style={styles?.titleIcon}>
            <View style={[styles?.imagebg, { backgroundColor: item.iconbg }]} >
              <SvgIcon color='#005DA7' name={item.iconName} size={24} />
            </View>
            <Typography color='black' fontFamily={Font?.SemiBold} size={18}  >{item.title}</Typography>

          </View>
          <SvgIcon color='#005DA7' name='arrow_right' size={24} />


        </TouchableOpacity>


      </View>
    );
  }
  //*****************MAIN UI*********************/
  return (
    <View style={styles.mainContainer}>
      <Header title='My Account'backButton={false} />
      <ScrollView nestedScrollEnabled contentContainerStyle={{ paddingBottom: 150 }} style={styles?.fieldCard}>
        <View style={styles?.profileCard}>
          <View style={styles?.profileImageBG} >
            <Image source={Images?.profile} style={styles?.profileImage} />
          </View>
          <Typography style={{ marginTop: 10 }} size={28} color='Black' fontFamily={Font?.Bold}>Kratos</Typography>
          <Typography style={{ marginTop: 5 }} size={16} fontFamily={Font?.SemiBold}>Product Designer & Developer</Typography>
          {isPrimiumUser ? (<View style={styles?.primiumBadge}>
            <SvgIcon color='#3B82F6' name='verified_badge' size={20} />
            <Typography color='#3B82F6' size={14} fontFamily={Font?.SemiBold}>PREMIUM MEMBER</Typography>
          </View>) : (<View style={styles?.primiumBadge}>
            <SvgIcon color='#3B82F6' name='verified_badge' size={20} />
            <Typography color='#3B82F6' size={14} fontFamily={Font?.SemiBold}>BECOME PREMIUM MEMBER</Typography>
          </View>)}

        </View>

        <Typography style={{ marginTop: 40 }} color='#64748B' fontFamily={Font?.SemiBold} size={14}>PREFERENCES & ACCOUNT</Typography>

        <View style={styles?.fieldCardItems}>
          <FlatList
            nestedScrollEnabled
            data={fieldData}
            keyExtractor={item => item?.id.toString()}
            renderItem={renderItem}
            scrollEnabled={false}
          />

        </View>
        <Button style={styles?.logoutButton} title='Logout' onPress={() =>{ dispatch(setLogout());globalThis.ToastMessage?.('Logged out successfully', 'success');}} />
      </ScrollView>
    </View>
  )
}

export default MyAccount

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    // justifyContent:'center',
    //  alignItems:"center"
  },
  fieldCard: {
    padding: 22,

  },
  logoutButton: {
    position: 'absolute',
    top: 60,
    width: '90%',
    alignSelf: 'center',


  },
  profileCard: {
    alignSelf: 'center',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileImageBG: {
    height: 120,
    width: 120,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    elevation: 2,
    justifyContent: "center",
    alignItems: 'center'
  },
  profileImage: {
    height: '92%',
    width: '92%',
    borderRadius: 28,
    backgroundColor: "#ebcece"
  },
  primiumBadge: {
    padding: 8,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: 'rgba(0, 93, 167,0.1)',
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    elevation: 2
  },
  fieldCardItems: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 93, 167,0.1)',
    borderRadius: 20,
  },
  mainCard: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imagebg: {
    padding: 15,
    height: 40,
    width: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleIcon: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center'
  },
  divider: {
    borderWidth: 0.5,
    borderColor: 'rgba(0, 93, 167,0.1)',
    marginHorizontal: 16,
    width: '100%',
    marginLeft: 0
  },
})