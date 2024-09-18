import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import ThemeContext from '../context/ThemeContext';

const CategoriesScreen = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };

    fetchCategories();
  }, []);

  // Lọc danh mục dựa trên từ khóa tìm kiếm
  const filteredCategories = categories.filter(category =>
    category.strCategory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryItem, isDarkMode ? styles.darkCategoryItem : styles.lightCategoryItem]}
      onPress={() => navigation.navigate('Meals', { 
        categoryId: item.idCategory, 
        categoryName: item.strCategory
      })}
    >
      <Image source={{ uri: item.strCategoryThumb }} style={styles.categoryImage} />
      <Text style={[styles.categoryTitle, isDarkMode ? styles.darkText : styles.lightText]}>{item.strCategory}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      {/* Thanh tìm kiếm */}
      <TextInput
        style={[styles.searchInput, isDarkMode ? styles.darkInput : styles.lightInput]}
        placeholder="Search for categories..."
        placeholderTextColor={isDarkMode ? '#888' : '#ccc'}
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      {/* Danh sách danh mục hoặc thông báo không có kết quả */}
      {filteredCategories.length === 0 ? (
        <Text style={[styles.noResultsText, isDarkMode ? styles.darkText : styles.lightText]}>
          Không có kết quả phù hợp
        </Text>
      ) : (
        <FlatList
          data={filteredCategories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.idCategory}
          numColumns={2}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  lightContainer: {
    backgroundColor: '#FFF9E3',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  searchInput: {
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
  },
  darkInput: {
    backgroundColor: '#444',
    color: '#fff',
    borderColor: '#555',
  },
  lightInput: {
    backgroundColor: '#fff',
    color: '#000',
    borderColor: '#ccc',
  },
  categoryItem: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  lightCategoryItem: {
    backgroundColor: '#f8f8f8',
  },
  darkCategoryItem: {
    backgroundColor: '#444',
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  categoryTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  noResultsText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
});

export default CategoriesScreen;
