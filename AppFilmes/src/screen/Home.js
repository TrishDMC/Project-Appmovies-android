import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MovieSlide from '../components/MovieSlide';
import SearchBar from '../components/Searchbar';
import MovieDetails from '../screen/MovieDetails';
import SeriesSlide from '../components/SeriesSlide';
import SeriesDetails from './SeriesDetails';
import MovieList from '../components/Cardfilms';
import SeriesList from '../components/Cardseries';
import Menu from '../components/Menu';
import Results from './Results';


const Home = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showMovieList, setShowMovieList] = useState(false);
  const [showSeriesList, setShowSeriesList] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false); // Variável de estado para exibir os resultados da pesquisa

  const handleGoBack = () => {
    setSelectedMovie(null);
    setSelectedSeries(null);
    setShowDetails(false);
    setShowMovieList(false);
    setShowSeriesList(false);
  };

  const handleMenuPress = (screen) => {
    if (screen === 'movielist') {
      setShowDetails(false);
      setSelectedMovie(null);
      setSelectedSeries(null);
      setShowMovieList(true);
      setShowSeriesList(false);
      setShowResults(false); // Oculta os resultados da pesquisa ao selecionar "Filmes" no menu
    } else if (screen === 'serieslist') {
      setShowDetails(false);
      setSelectedMovie(null);
      setSelectedSeries(null);
      setShowMovieList(false);
      setShowSeriesList(true);
      setShowResults(false); // Oculta os resultados da pesquisa ao selecionar "Séries" no menu
    } else {
      setShowDetails(false);
      setSelectedMovie(null);
      setSelectedSeries(null);
      setShowMovieList(false);
      setShowSeriesList(false);
      setShowResults(false); // Oculta os resultados da pesquisa ao selecionar qualquer outra opção no menu
    }
  };
  const handleSearch = (query) => {
    fetch(
      `https://api.themoviedb.org/3/search/multi?query=${query}&api_key=8a78bbc2059ae1af9b5db720e9ee991d`
    )
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.results);
        setShowResults(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <Menu handleMenuPress={handleMenuPress} />
      {!showDetails && !showMovieList && !showSeriesList && !showResults && (
        <>
          <Text style={styles.texto}>O que deseja assistir?</Text>
          <SearchBar handleSearch={handleSearch} />
          <MovieSlide setSelectedMovie={setSelectedMovie} setShowDetails={setShowDetails} />
          <SeriesSlide setSelectedSeries={setSelectedSeries} setShowDetails={setShowDetails} />
        </>
      )}
      {showDetails && (
        <>
          {selectedMovie ? (
            <MovieDetails movie={selectedMovie} handleGoBack={handleGoBack} />
          ) : (
            <SeriesDetails series={selectedSeries} handleGoBack={handleGoBack} />
          )}
        </>
      )}
      {showMovieList && !showDetails && !showResults && (
        <View style={styles.movieListContainer}>
          <MovieList setSelectedMovie={setSelectedMovie} setShowDetails={setShowDetails} />
        </View>
      )}
      {showSeriesList && !showDetails && !showResults && (
        <View style={styles.seriesListContainer}>
          <SeriesList setSelectedSeries={setSelectedSeries} setShowDetails={setShowDetails} />
        </View>
      )}
      {showResults && (
        <View style={styles.resultsContainer}>
          <Results results={searchResults} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#313131',
  },
  texto: {
    paddingTop: 10,
    marginLeft: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  movieListContainer: {
    flex: 1,
  },
  seriesListContainer: {
    flex: 1,
    resultsContainer: {
      flex: 1,
      marginTop: 20,
    },
  },
});

export default Home;
