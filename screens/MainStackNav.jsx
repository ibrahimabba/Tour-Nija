import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StatesDetailScreen from './StatesDetailScreen';
import StatesScreen from './StatesScreen';
import DestinationScreen from './DestinationScreen';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
import Map from './Map';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#277c41',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="States"
        component={StatesScreen}
        options={({ route, navigation }) => ({
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title='Menu'
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
          title: 'Welcome to Tour9ja',
        })}
      />
      <Stack.Screen
        name="StatesDetails"
        component={StatesDetailScreen}
        options={({ route }) => {
          const { titleName } = route.params;
          return { title: titleName };
        }}
      />
      <Stack.Screen
        name="Destinations"
        component={DestinationScreen}
        options={({ route }) => {
          const { titleName } = route.params;
          return {
            title: titleName,
          };
        }}
      />
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
  );
};

export default HomeScreen;
