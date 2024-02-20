import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Modal, ActivityIndicator } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const MovieDetails = ({ movie, handleGoBack }) => {
  const [movieImages, setMovieImages] = useState([]);
  const [posterPath, setPosterPath] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMovieImages();
  }, []);

  const fetchMovieImages = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=8a78bbc2059ae1af9b5db720e9ee991d`
      );
      const data = await response.json();
      setMovieImages(data.backdrops);
      setPosterPath(data.posters[0].file_path);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching movie images:', error);
      setIsLoading(false);
    }
  };

  const openImageModal = (image) => {
    setSelectedImage([{ url: `https://image.tmdb.org/t/p/original${image.file_path}` }]);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        {posterPath && (
          <View>
            <Text style={styles.movieTitle}>{movie.title}</Text>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${posterPath}` }} style={styles.poster} />
          </View>
        )}
        <View style={styles.textContainer}>
          {!isLoading ? (
            <Text style={styles.overview}>{movie.overview}</Text>
          ) : (
            <ActivityIndicator size="large" color="white" />
          )}
        </View>
        {movieImages.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Imagens do filme</Text>
            {!isLoading ? (
              <ScrollView horizontal>
                {movieImages.map((image, index) => (
                  <TouchableOpacity key={index} onPress={() => openImageModal(image)} style={styles.imageContainer}>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w500${image.file_path}` }} style={styles.image} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <ActivityIndicator size="large" color="white" />
            )}
          </View>
        )}
        <Modal visible={selectedImage !== null} animationType="fade" transparent>
          <View style={styles.modalContainer}>
            <ImageViewer
              imageUrls={selectedImage}
              enableSwipeDown
              renderIndicator={() => null}
              onCancel={closeImageModal}
              style={styles.imageViewer}
            />
            <TouchableOpacity style={styles.modalCloseButton} onPress={closeImageModal}>
              <Text style={styles.modalCloseButtonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#313131',
    padding: 20,
  },
  backButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  backButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  poster: {
    width: 200,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 200,
    height: 100,
    borderRadius: 10,
  },
  textContainer: {
    marginBottom: 20,
  },
  overview: {
    fontSize: 16,
    color: 'white',
    lineHeight: 22,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageViewer: {
    flex: 1,
    alignSelf: 'stretch',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default MovieDetails;
