import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import axios from 'axios';

const SeriesSlide = ({ setSelectedSeries, setShowDetails }) => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    fetchSeries();
  }, []);

  const fetchSeries = async () => {
    const apiKey = '8a78bbc2059ae1af9b5db720e9ee991d';
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`
      );
      setSeries(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSeriesPress = (series) => {
    setSelectedSeries(series);
    setShowDetails(true);
  };

  return (
    <>
    <Text style={styles.titleCard}>Series Populares</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {series.map((series) => (
        <TouchableOpacity
          key={series.id}
          style={styles.seriesCard}
          onPress={() => handleSeriesPress(series)}
        >
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500/${series.poster_path}` }}
            style={styles.seriesPoster}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
  },
  seriesCard: {
    marginRight: 10,
    width: 120,
    height: 200,
  },
  seriesPoster: {
    width: '100%',
    height: '80%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  titleCard: {
    color: 'white',
    fontSize: 24,
  },
});

export default SeriesSlide;
