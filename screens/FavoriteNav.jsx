import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const RenderedDestinations = ({ navigation, destination }) => {
  // ratings will loop for every ratings and return a list of Icons
  const ratings = () => {
    const starList = [];
    for (let i = 0; i < destination.ratings; i++) {
      starList.push(<Ionicons name='md-star' size={25} color='orange' />);
    }
    return starList;
  };

  // stars holds the list of Icons
  const icons = ratings();

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={{ height: '90%', width: '100%' }}
        onPress={() =>
          navigation.navigate('Destinations', {
            titleName: destination.title,
            destination: destination,
            FavId: destination.id
          })
        }
      >
        <Image
          source={destination.image}
          style={{
            height: '100%',
            width: '100%',
            borderRadius: 10
          }}
        />
      </TouchableOpacity>

      <View style={styles.textview}>
        <Text style={{ marginVertical: 10, fontSize: 20 }}>
          {destination.title}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          {icons.map((icon, index) => (
            <View key={index}>{icon}</View>
          ))}
        </View>
      </View>
    </View>
  );
};

const Favorites = ({ navigation }) => {
  const places = useSelector(state => state.placesreducer.places);

  const favDest = () => {
    let list = [];
    for (let i = 0; i < places.length; i++) {
      list.push(...places[i].destinations);
    }
    return list;
  };

  const lists = favDest();
  const favoriteDestinations = lists.filter(list => list.favorite == true);
console.log(favoriteDestinations)
  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteDestinations}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <RenderedDestinations navigation={navigation} destination={item} />
        )}
      />
    </View>
  );
};

const FavoriteNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
    >
      <Stack.Screen name='Favorites' component={Favorites} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    height: 400,
    width: 350
  },
  textview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 30
  }
});

export default FavoriteNav;
