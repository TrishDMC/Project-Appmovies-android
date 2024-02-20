import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import axios from 'axios';

const MovieSlide = ({ setSelectedMovie, setShowDetails }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const apiKey = '8a78bbc2059ae1af9b5db720e9ee991d';
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMoviePress = (movie) => {
    setSelectedMovie(movie);
    setShowDetails(true);
  };

  return (
    <>
    <Text style={styles.titleCard}>Filmes Populares</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {movies.map((movie) => (
        <TouchableOpacity
          key={movie.id}
          style={styles.movieCard}
          onPress={() => handleMoviePress(movie)}
        >
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
            style={styles.moviePoster}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 10,
  },
  movieCard: {
    marginRight: 10,
    width: 120,
    height: 200,
  },
  moviePoster: {
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

export default MovieSlide;
