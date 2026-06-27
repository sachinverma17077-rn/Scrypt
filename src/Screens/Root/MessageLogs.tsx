import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Header from '../../Component/UI/Header'
import Images from '../../Constants/Images';
import Typography from '../../Component/UI/Typography';
import Font from '../../Constants/Font';
import { FULL_WIDTH } from '../../Constants/Dimensions';
import Input from '../../Component/UI/Input';
import ToggleSelector from '../../Component/UI/ToggleSelector';


const MessageLogs = ({ navigation }: any) => {
  //*******************Dummy Data*************************
  const messageData = [
    { id: 1, sender: 'John Doe', message: 'Hello, how are you?', time: '10:30 AM', unreadMessages: 2 },
    { id: 2, sender: 'Jane Smith', message: 'See you tomorrow!', time: '11:45 AM', unreadMessages: 0 },
    { id: 3, sender: 'John Doe', message: 'Hello, how are you?', time: 'today', unreadMessages: 2 },
    { id: 4, sender: 'Jane Smith', message: 'See you tomorrow!', time: 'Yesterday', unreadMessages: 8 },
    { id: 5, sender: 'John Doe', message: 'Hello, how are you?', time: '10:30 AM', unreadMessages: 10 },
    { id: 6, sender: 'Jane Smith', message: 'See you tomorrow!', time: '11:45 AM', unreadMessages: 15 },
    { id: 7, sender: 'John Doe', message: 'Hello, how are you?', time: '10:30 AM', unreadMessages: 2 },
    { id: 8, sender: 'Jane Smith', message: 'See you tomorrow!', time: '11:45 AM', unreadMessages: 0 },
    { id: 9, sender: 'John Doe', message: 'Hello, how are you?', time: 'today', unreadMessages: 2 },
    { id: 10, sender: 'Jane Smith', message: 'See you tomorrow!', time: 'Yesterday', unreadMessages: 8 },
    { id: 11, sender: 'John Doe', message: 'Hello, how are you?', time: '10:30 AM', unreadMessages: 10 },
    { id: 12, sender: 'Jane Smith', message: 'See you tomorrow!', time: '11:45 AM', unreadMessages: 15 },
  ];
  //*******************Flatlist UI*********************
  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles?.messageCard} >
        <View style={styles?.profileImage}>
          <Image
            source={Images.profile}
            style={{ width: 50, height: 50, borderRadius: 12, }}
          />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

          <View style={styles?.messagetext}>
            <Typography color='Black' size={18} fontFamily={Font?.SemiBold} >{item.sender}</Typography>
            <Typography color='#414751' size={14} fontFamily={item.unreadMessages > 0 ? Font?.SemiBold : Font?.Regular} >
              {item.message}
            </Typography>
          </View>
          <View style={styles?.timeUnread}>
            <Typography color='#414751' size={12} fontFamily={Font?.Regular}>
              {item.time}
            </Typography>
            {item.unreadMessages > 0 && (
              <View style={styles?.unreadBadge}>
                <Typography color='#414751' size={12} fontFamily={Font?.SemiBold}>
                  {item.unreadMessages}
                </Typography>
              </View>
            )}
          </View>
        </View>

      </TouchableOpacity>
    )
  }

  //*******************main UI*************************
  return (
    <View style={{ flex: 1 }}>
      <Header
        title={`Message's`}
        backButton={false}
        notification
        onNotificationPress={()=>{navigation.navigate('Notification')}}
      />
      <View style={styles?.screen}>
        <Input iconName='search' placeholder='Search Message...' />

        <ToggleSelector firstText='All'secondText='Unread'/>
        <FlatList
          data={messageData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 250 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

export default MessageLogs

const styles = StyleSheet.create({
  screen: {

    margin: 22,
  },
  messageCard: {
    backgroundColor: 'white',
    padding: 8,
    marginBottom: 12,
    borderRadius: 16,
    flexDirection: 'row',
    gap: 10,
    alignItems: "center",
    elevation: 1,
    marginHorizontal:1
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 16,
    // backgroundColor: 'rgba(0, 180, 216, 0.6)',

  },
  messagetext: {},
  timeUnread: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    gap: 6,

  },
  unreadBadge: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: '#A4C9FF',
    alignItems: 'center',
    justifyContent: 'center',

  },
})