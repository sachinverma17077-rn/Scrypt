import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MessageLogs from '../Screens/Root/MessageLogs';
import CallLogs from '../Screens/Root/CallLogs';
import { Image } from 'react-native';
import icons from '../Constants/icons'
import MyAccount from '../Screens/Root/MyAccount';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="MessageLogs"
                component={MessageLogs}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons?.chat}
                            style={{
                                width: 24,
                                height: 24,
                                // tintColor: focused ? '#2CA58D' : 'gray'
                            }}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="CallLogs"
                component={CallLogs}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons?.call}
                            style={{
                                width: 24,
                                height: 24,
                                // tintColor: focused ? '#2CA58D' : 'gray'
                            }}
                        />
                    ),
                }}
            />
              <Tab.Screen
                name="MyAccount"
                component={MyAccount}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons?.user_account}
                            style={{
                                width: 24,
                                height: 24,
                                // tintColor: focused ? '#2CA58D' : 'gray'
                            }}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigation
