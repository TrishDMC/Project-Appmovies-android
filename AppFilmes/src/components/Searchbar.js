import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (text) => {
    setSearchQuery(text);
  };

  const handleSearchPress = () => {
    handleSearch(searchQuery);
  };

  return (
    <View
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: 10,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 16,
        height: 45,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}
    >
      <TextInput
        style={{
          backgroundColor: 'transparent',
          color: 'white',
          width: '80%',
          paddingLeft: 15,
        }}
        placeholder="Pesquisar"
        placeholderTextColor="gray"
        value={searchQuery}
        onChangeText={handleInputChange}
      />
      <TouchableOpacity onPress={handleSearchPress}>
        <Ionicons name="search" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
