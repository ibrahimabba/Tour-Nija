import React, { useState, useLayoutEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import DestinationScreen from './DestinationScreen';
import Map from './Map';
import StarRating from 'react-native-star-rating';

import {
  createRatings,
  modifyRatings,
  getRatings,
} from '../store/actions/ratings';

const Stack = createStackNavigator();

const RenderedDestinations = ({ navigation, destination }) => {
  const [count, setCount] = useState();
  const ratingArray = useSelector((state) => state.ratingReducer.ratingsArray);
  const ratedDestination = ratingArray.find(
    (dest) => dest.destination == destination.title
  );

  let rate;
  rate = ratedDestination ? ratedDestination.rate : 0;

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(getRatings());
  }, [dispatch, count]);

  return (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={{ height: '90%', width: '100%' }}
        onPress={() =>
          navigation.navigate('Destinations', {
            titleName: destination.title,
            destination: destination,
            stateId: destination.stateId,
            destinationId: destination.id,
          })
        }
      >
        <Image
          source={destination.image}
          style={{
            height: '100%',
            width: '100%',
            borderRadius: 10,
          }}
        />
      </TouchableOpacity>

      <View style={styles.textview}>
        <Text style={{ marginVertical: 10, fontSize: 20 }}>
          {destination.title}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <StarRating
            disabled={false}
            emptyStar={'ios-star-outline'}
            fullStar={'ios-star'}
            // halfStar={'ios-star-half'}
            iconSet={'Ionicons'}
            starSize={25}
            maxStars={5}
            rating={rate}
            selectedStar={(rating) => {
              setCount(rating);
              ratedDestination
                ? dispatch(modifyRatings(ratedDestination.id, rating))
                : dispatch(createRatings(destination.title, rating));
            }}
            fullStarColor={'orange'}
          />
        </View>
      </View>
    </View>
  );
};

const Favorites = ({ navigation }) => {
  const places = useSelector((state) => state.placesreducer.places);

  const favDest = () => {
    let list = [];
    for (let i = 0; i < places.length; i++) {
      list.push(...places[i].destinations);
    }
    return list;
  };

  const lists = favDest();
  const favoriteDestinations = lists.filter((list) => list.favorite == true);

  if (favoriteDestinations.length == 0) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontFamily: 'open-sans-bold', fontSize: 15 }}>
          You Don't have any favorite yet
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteDestinations}
        keyExtractor={(item, index) => index.toString()}
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
          backgroundColor: '#082032',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name='Favorites'
        component={Favorites}
        options={() => ({
          headerStyle: {
            backgroundColor: '#082032',
          },
        })}
      />
      <Stack.Screen
        name='Destinations'
        component={DestinationScreen}
        options={({ route }) => {
          const { titleName } = route.params;
          return { title: titleName };
        }}
      />
      <Stack.Screen name='Map' component={Map} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: 350,
  },
  textview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 30,
  },
});

export default FavoriteNav;
