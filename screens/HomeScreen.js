import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Card from '../components/Card';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.cardContent}>
            <AntDesign name="enviromento" size={34} color="black" />
            <Text style={{ textAlign: 'center', width: '90%' }}>See the most interesting Destinations around you</Text>
          </View>
        </TouchableOpacity>
      </Card>
      <Card style={styles.card}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('States');
          }}
        >
          <View style={styles.cardContent}>
            <AntDesign name="find" size={34} color="black" />
            <Text style={{ textAlign: 'center', width: '90%' }}>Find the most interesting tourist Desitination across Nigeria</Text>
          </View>
        </TouchableOpacity>
      </Card>
      <Card style={styles.card}>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.cardContent}>
            <View style={{ marginRight: '6%' }}>
              <MaterialCommunityIcons name="weather-lightning" size={34} color="black" />
            </View>
            <Text style={{ textAlign: 'center', width: '80%' }}>View the current Weather of your location</Text>
          </View>
        </TouchableOpacity>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: '5%',
  },
  card: {
    marginVertical: '8%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '5%',
    height: '20%',
    width: '98%',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: '5%',
  },
});

export default HomeScreen;
