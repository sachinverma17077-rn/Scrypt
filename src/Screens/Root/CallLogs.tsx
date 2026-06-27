import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Images from '../../Constants/Images';
import Typography from '../../Component/UI/Typography';
import Header from '../../Component/UI/Header';
import Input from '../../Component/UI/Input';
import ToggleSelector from '../../Component/UI/ToggleSelector';
import Font from '../../Constants/Font';
import SvgIcon from '../../Constants/SvgIcon';

const CallLogs = ({ navigation }: any) => {
  //*******************Dummy Data*************************
  const messageData = [
    { id: 1, sender: 'John Doe', message: 'Hello, how are you?', time: '10:30 AM', unreadMessages: 2, callStatus: 'Incoming', callicon: 'call_incoming', onlineStatus: true, callType: 'video' },
    { id: 2, sender: 'Jane Smith', message: 'See you tomorrow!', time: '11:45 AM', unreadMessages: 0, callStatus: 'Outgoing', callicon: 'call_outgoing', onlineStatus: false, callType: 'audio' },
    { id: 3, sender: 'John Doe', message: 'Hello, how are you?', time: 'today', unreadMessages: 2, callStatus: 'Missed', callicon: 'call_missed', onlineStatus: false, callType: 'video' },
    { id: 4, sender: 'Jane Smith', message: 'See you tomorrow!', time: 'Yesterday', unreadMessages: 8, callStatus: 'Incoming', callicon: 'call_incoming', onlineStatus: true, callType: 'audio' },
    { id: 5, sender: 'John Doe', message: 'Hello, how are you?', time: '10:30 AM', unreadMessages: 10, callStatus: 'Outgoing', callicon: 'call_outgoing', onlineStatus: false, callType: 'video' },
    { id: 6, sender: 'Jane Smith', message: 'See you tomorrow!', time: '11:45 AM', unreadMessages: 15, callStatus: 'Missed', callicon: 'call_missed', onlineStatus: false, callType: 'audio' },
    { id: 7, sender: 'John Doe', message: 'Hello, how are you?', time: '10:30 AM', unreadMessages: 2, callStatus: 'Incoming', callicon: 'call_incoming', onlineStatus: true, callType: 'video' },
    { id: 8, sender: 'Jane Smith', message: 'See you tomorrow!', time: '11:45 AM', unreadMessages: 0, callStatus: 'Outgoing', callicon: 'call_outgoing', onlineStatus: false, callType: 'audio' },
    { id: 9, sender: 'John Doe', message: 'Hello, how are you?', time: 'today', unreadMessages: 2, callStatus: 'Missed', callicon: 'call_missed', onlineStatus: false, callType: 'video' },
    { id: 10, sender: 'Jane Smith', message: 'See you tomorrow!', time: 'Yesterday', unreadMessages: 8, callStatus: 'Incoming', callicon: 'call_incoming', onlineStatus: true, callType: 'audio' },
    { id: 11, sender: 'John Doe', message: 'Hello, how are you?', time: '10:30 AM', unreadMessages: 10, callStatus: 'Outgoing', callicon: 'call_outgoing', onlineStatus: false, callType: 'video' },
    { id: 12, sender: 'Jane Smith', message: 'See you tomorrow!', time: '11:45 AM', unreadMessages: 15, callStatus: 'Missed', callicon: 'call_missed', onlineStatus: false, callType: 'audio' },
  ];
  //*******************Flatlist UI*********************
  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.messageCard}>
        <View style={styles.profileImage}>
          <Image
            source={Images.profile}
            style={styles.profile}
            resizeMode="cover"
          />

        </View>
        {item.onlineStatus && (
          <View
            style={{

              position: 'absolute',
              bottom: 5,
              left: 48,
              width: 14,
              height: 14,
              borderRadius: 16,
              backgroundColor: '#4CAF50', // Green color for online status
              borderWidth: 2,
              borderColor: '#fff', // White border to separate from profile image

            }}
          />
        )}

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={styles.messagetext}>
            <Typography
              color={item?.callStatus=='Missed'?"red":"black"}
              size={18}
              fontFamily={Font?.Bold}>
              {item.sender}
            </Typography>

            <View style={styles?.calldetails}>
              <SvgIcon name={item?.callicon} size={15} />
              <Typography
                color="#64748B"
                size={12}
                fontFamily={

                  Font?.SemiBold
                }>
                {item.callStatus}
              </Typography>
              <View style={{ borderWidth: 2, borderRadius: 5, borderColor: "#64748B" }} />
              <Typography
                color="#64748B"
                size={12}
                fontFamily={

                  Font?.SemiBold
                }>
                {item.time}
              </Typography>
            </View>
          </View>

          <TouchableOpacity style={styles.Callbg}>
            <SvgIcon name={item.callType === 'video' ? 'video_call' : 'call_Tab'} size={30} color='#005DA7' />

          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <Header
        title={`Call's`}
        backButton={false}
      />
      <View style={styles?.screen}>
        <Input iconName='search' placeholder='Search Call...' />

        <ToggleSelector firstText='All' secondText='Missed' />
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

export default CallLogs

const styles = StyleSheet.create({
  screen: {
    margin: 22,
  },

  messageCard: {
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: 12,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    elevation: 1,
    marginHorizontal: 2,
  },

  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#B3C9F4',
  },

  profile: {
    width: '100%',
    height: '100%',
  },

  messagetext: {
    flex: 1,
  },

  timeUnread: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 6,
  },

  unreadBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#A4C9FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calldetails: {
    flexDirection: 'row',

    alignItems: 'center',
    gap: 4,
  },
  Callbg: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'rgba(107, 203, 255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  }
});