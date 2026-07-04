import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';




  


import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckOutScreen';
import AddressScreen from './screens/AddressScreen';
import PaymentMethodsScreen from './screens/PaymentMethodsScreen';
import ProfileScreen from './screens/ProfileScreen';
import WishlistScreen from './screens/WishlistScreen';
import OrderHistoryScreen from './screens/OrderHistroyScreen';
import HelpSupportScreen from './screens/HelpSupportScreen';
import AboutScreen from './screens/AboutScreen';

import { CartProvider, useCart } from './contexts/cartContext';
import { auth } from './firebase';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CartIconWithBadge({ color, size }) {
  const { getTotalItems } = useCart();
  const count = getTotalItems();

  return (
    <View>
      <Ionicons name="cart-outline" size={size} color={color} />
      {count > 0 && (
        <View
          style={{
            position: 'absolute',
            right: -6,
            top: -4,
            backgroundColor: 'red',
            borderRadius: 10,
            paddingHorizontal: 5,
          }}
        >
          <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
            {count}
          </Text>
        </View>
      )}
    </View>
  );
}

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#764ba2',
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <CartIconWithBadge color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Tabs */}
      <Stack.Screen name="Tabs" component={BottomTabs} />

      {/* Product Flow */}
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />

      {/* Checkout Flow */}
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="Address" component={AddressScreen} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />

      {/* Other Screens */}
      <Stack.Screen name="Wishlist" component={WishlistScreen} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function RootNavigation() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((usr) => {
      setUser(usr);
      setChecking(false);
    });

    return unsubscribe;
  }, []);

  if (checking) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <Text style={{ fontSize: 18 }}>Loading...</Text>
      </View>
    );
  }

  return user ? <MainStack /> : <AuthStack />;
}

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </CartProvider>
  );
}
