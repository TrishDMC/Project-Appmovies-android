import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Menu = ({ handleMenuPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleMenuPress('home')}>
        <Text style={styles.menuItem}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleMenuPress('movielist')}>
        <Text style={styles.menuItem}>Filmes</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleMenuPress('serieslist')}>
        <Text style={styles.menuItem}>Series</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#313131',
    paddingVertical: 20,
  },
  menuItem: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Menu;
