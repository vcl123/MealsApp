import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CategoriesScreen from './screens/Categories';
import FavoritesScreen from './screens/Favorites';
import SettingsScreen from './screens/Setting';
import MealsScreen from './screens/MealsScreen';
import { Ionicons } from '@expo/vector-icons';
import { FavoritesProvider } from './context/FavoritesContext';
import { ThemeProvider } from './context/ThemeContext'; // Make sure ThemeContext is correct

// Create the stack, drawer, and bottom tab navigators
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// A simple blank screen component for "Go to Tabs"
const BlankScreen = () => <View><Text></Text></View>;

// Bottom Tab Navigator
function BottomTabs({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Categories') {
            iconName = 'fast-food';
          } else if (route.name === 'Favorites') {
            iconName = 'heart';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#fff' }, // Default to light theme
        headerStyle: { backgroundColor: '#fff' }, // Default to light theme
        headerTintColor: '#000', // Default to light text color
      })}
    >
      <Tab.Screen 
        name="Categories" 
        component={CategoriesScreen} 
        options={{
          title: 'Categories',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.replace('Drawer')}>
              <Ionicons name="refresh-circle" size={28} color="tomato" style={{ marginRight: 10 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

// Drawer Navigator
function DrawerNavigator({ navigation }) {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: 'tomato',
        drawerInactiveTintColor: 'gray',
        drawerStyle: { backgroundColor: '#fff' },  // Default to light theme
        headerStyle: { backgroundColor: '#fff' },  // Default to light theme
        headerTintColor: '#000',  // Default to light text color
      }}
    >
      <Drawer.Screen 
        name="Categories" 
        component={CategoriesScreen} 
        options={{
          title: 'Categories',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.replace('BottomTabs')}>
              <Ionicons name="refresh-circle" size={28} color="tomato" style={{ marginRight: 10 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <Drawer.Screen name="Favorites" component={FavoritesScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen
        name="Go to Tabs"
        component={BlankScreen}
        options={{
          drawerLabel: 'Go to Tabs',
        }}
        listeners={{
          drawerItemPress: () => navigation.replace('BottomTabs'), 
        }}
      />
    </Drawer.Navigator>
  );
}

// Main App component
export default function App() {
  const MyLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#FFF9E3', // Màu nền vàng nhạt
    text: '#000000', // Màu văn bản đen
    border: '#FFD700', // Màu vàng cho các đường viền
    primary: '#FFD700', // Màu vàng cho các yếu tố chính
    },
  };

  const MyDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: '#121212',
      text: '#ffffff',
    },
  };

  return (
    <ThemeProvider> 
      <FavoritesProvider>
        <NavigationContainer theme={MyLightTheme}>
          <Stack.Navigator>
            <Stack.Screen 
              name="BottomTabs" 
              component={BottomTabs} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="Drawer" 
              component={DrawerNavigator} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="Meals" 
              component={MealsScreen} 
              options={({ route }) => ({ title: route.params.categoryName })} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    </ThemeProvider>
  );
}
