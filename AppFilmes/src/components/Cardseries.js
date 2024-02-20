import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

const SeriesItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item)}>
    <View style={{ flexDirection: 'row', padding: 8, alignItems: 'center' }}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={{ width: 100, height: 150, borderRadius: 10 }}
      />
    </View>
  </TouchableOpacity>
);

const SeriesList = ({ setSelectedSeries, setShowDetails }) => {
  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);

  useEffect(() => {
    fetchSeries();
  }, []);

  const fetchSeries = async () => {
    const apiKey = '8a78bbc2059ae1af9b5db720e9ee991d';

    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&page=${page}`
      );
      const newSeries = response.data.results;
      if (newSeries.length > 0) {
        setSeries((prevSeries) => [...prevSeries, ...newSeries]);
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
    <SeriesItem item={item} onPress={() => {
      setSelectedSeries(item);
      setShowDetails(true);
    }} />
  );

  const renderFooter = () => {
    if (isEndReached) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
          <Text style={{ marginTop: 10 }}>Não há mais séries para carregar.</Text>
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
      fetchSeries();
    }
  };

  return (
    <FlatList
      data={series}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={3}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
};

export default SeriesList;
