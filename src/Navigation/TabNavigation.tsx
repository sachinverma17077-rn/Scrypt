import React, { useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';

import MessageLogs from '../Screens/Root/MessageLogs';
import CallLogs from '../Screens/Root/CallLogs';
import MyAccount from '../Screens/Root/MyAccount';
import SvgIcon from '../Constants/SvgIcon';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

const CustomTabBar = ({
  state,
  navigation,
}: BottomTabBarProps) => {
  const tabWidth = width / state.routes.length;

  const translateX = useSharedValue(
    state.index * tabWidth
  );

  useEffect(() => {
    translateX.value = withSpring(
      state.index * tabWidth,
      {
        damping: 15,
        stiffness: 120,
      }
    );
  }, [state.index]);

  const navigateToTab = (index: number) => {
    if (
      index >= 0 &&
      index < state.routes.length
    ) {
      navigation.navigate(
        state.routes[index].name
      );
    }
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      const maxX =
        tabWidth * (state.routes.length - 1);

      let newX =
        state.index * tabWidth +
        event.translationX;

      if (newX < 0) newX = 0;
      if (newX > maxX) newX = maxX;

      translateX.value = newX;
    })
    .onEnd(() => {
      const nearestIndex = Math.round(
        translateX.value / tabWidth
      );

      translateX.value = withSpring(
        nearestIndex * tabWidth
      );

      runOnJS(navigateToTab)(nearestIndex);
    });

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  return (
    <View style={styles.tabBarContainer}>
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            styles.indicator,
            {
              width: tabWidth - 20,
            },
            indicatorStyle,
          ]}
        />
      </GestureDetector>

      {state.routes.map((route, index) => {
        const focused =
          state.index === index;

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabButton}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate(
                route.name
              )
            }
          >
            {route.name ===
              'MessageLogs' && (
              <SvgIcon
                name={
                  focused
                    ? 'active_Chat_Tab'
                    : 'chat_Tab'
                }
              />
            )}

            {route.name ===
              'CallLogs' && (
              <SvgIcon
                name={ focused?"call_Tab_Active":"call_Tab"}
              />
            )}

            {route.name ===
              'MyAccount' && (
              <SvgIcon
                name={focused?"profile_Tab_Active": "profile_Tab"}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TabNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => (
        <CustomTabBar {...props} />
      )}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="MessageLogs"
        component={MessageLogs}
      />

      <Tab.Screen
        name="CallLogs"
        component={CallLogs}
      />

      <Tab.Screen
        name="MyAccount"
        component={MyAccount}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    position: 'relative',
  },

  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },

  indicator: {
    position: 'absolute',
    left: 10,
    top: 10,
    height: 50,
    borderRadius: 25,
    backgroundColor:
      'rgba(0,122,255,0.15)',
    zIndex: 1,
  },
});