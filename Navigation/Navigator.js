import React, { useState } from 'react';
import { Button, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MainStackNav from '../screens/MainStackNav';
import FavoriteNav from '../screens/FavoriteNav';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Authenticate from '../user/authenticate';
import WelcomeScreen from '../components/WelcomeScreen';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions/authActions';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = (props) => {
  const token = useSelector((state) => state.authReducer.token);
  const dispatch = useDispatch();
  // if (token == null) {
  //   return <Authentication />;
  // }

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <View style={{ flex: 1, padding: 50 }}>
            <TouchableOpacity activeOpacity={0.6} onPress={() => dispatch(logout())}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </DrawerContentScrollView>
      )}
      screenOptions={({ route }) => ({
        drawerIcon: () => {
          let iconName;

          if (route.name === 'Places') {
            iconName = 'ios-pin';
          } else if (route.name === 'Home') {
            iconName = 'md-home';
          }
          return <Ionicons name={iconName} size={25} color="#277c41" />;
        },
      })}
    >
      <Drawer.Screen name="Home" component={WelcomeScreen} />
      <Drawer.Screen name="Places" component={TabNavigator} />
    </Drawer.Navigator>
  );
};

const TabNavigator = (props) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <AntDesign name="home" size={24} color={color} />;
          } else if (route.name === 'Favorite') {
            return <Ionicons name={'ios-heart'} size={25} color={color} />;
          }
        },
      })}
      shifting={true}
      // activeColor='#f0edf6'
      // inactiveColor='#3e2465'
      barStyle={{ backgroundColor: '#082032' }}
    >
      <Tab.Screen name="Home" component={MainStackNav} />
      <Tab.Screen name="Favorite" component={FavoriteNav} />
    </Tab.Navigator>
  );
};

const Authentication = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="Welcome" component={Authenticate} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#277c41',
    padding: 2,
    borderRadius: 14,
  },
  buttonText: {
    color: 'white',
    // fontFamily: 'open-sans',
    fontSize: 18,
  },
});

export default DrawerNavigator;
