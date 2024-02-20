import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

const MovieItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item)}>
    <View style={{ flexDirection: 'row', padding: 8, alignItems: 'center' }}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={{ width: 100, height: 150, borderRadius: 10 }}
      />
    </View>
  </TouchableOpacity>
);

const MovieList = ({ setSelectedMovie, setShowDetails }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const apiKey = '8a78bbc2059ae1af9b5db720e9ee991d';

    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`
      );
      const newMovies = response.data.results;
      if (newMovies.length > 0) {
        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setIsEndReached(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <MovieItem item={item} onPress={() => {
      setSelectedMovie(item);
      setShowDetails(true);
    }} />
  );

  const renderFooter = () => {
    if (isEndReached) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
          <Text style={{ marginTop: 10 }}>Não há mais filmes para carregar.</Text>
        </View>
      );
    }
    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
          <ActivityIndicator size="small" color="#000000" />
        </View>
      );
    }
    return null;
  };

  const handleLoadMore = () => {
    if (!isLoading && !isEndReached) {
      fetchMovies();
    }
  };

  return (
    <FlatList
      data={movies}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={3}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
};

export default MovieList;
