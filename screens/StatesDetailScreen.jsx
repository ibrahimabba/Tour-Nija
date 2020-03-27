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
            titleName: `${destination.title}`,
            destination: destination
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

const StatesDetailScreen = ({ route, navigation }) => {
  const { itemId } = route.params;
  const state = useSelector(state =>
    state.placesreducer.places.find(place => place.id == itemId)
  );

  const destinations = state.destinations;
  return (
    <View style={styles.container}>
      <FlatList
        data={destinations}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <RenderedDestinations navigation={navigation} destination={item} />
        )}
      />
    </View>
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

export default StatesDetailScreen;
