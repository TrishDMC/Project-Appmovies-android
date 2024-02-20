import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Results = ({ results }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Resultados da pesquisa:</Text>
      <View style={styles.imageContainer}>
        {results.map((result, index) => (
          <Image
            key={result.id}
            source={{ uri: `https://image.tmdb.org/t/p/w500${result.poster_path}` }}
            style={styles.image}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white'
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'left',
  },
  image: {
    width: 86,
    aspectRatio: 2 / 3,
    margin: 5,
    borderRadius: 8,
  },
});

export default Results;
