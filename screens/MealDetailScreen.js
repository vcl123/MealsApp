// MealDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MealDetailScreen = ({ route }) => {
  const { meal } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{meal.strMeal}</Text>
      <Text style={styles.price}>Price: ${meal.price.toFixed(2)}</Text>
      <Text style={styles.description}>{meal.strMealDescription}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: 'green',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
  },
});

export default MealDetailScreen;
