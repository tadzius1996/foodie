import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './store'
import { Provider } from 'react-redux'
import BasketScreen from './screens/BasketScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import Dishes from './screens/Dishes';
const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Provider store={store}>
      <Stack.Navigator>   
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
          <Stack.Screen name="Basket" component={BasketScreen} 
            options={{presentation: 'modal',
            headerShown: false}}/>
          <Stack.Screen name="PreparingOrderScreen" component={PreparingOrderScreen}
            options={{presentation: 'fullScreenModal', headerShown: false}} />
          <Stack.Screen name="DeliveryScreen" component={DeliveryScreen}
            options={{presentation: 'fullScreenModal', headerShown: false}} />
          <Stack.Screen name="Dishes" component={Dishes} />
      </Stack.Navigator>
      </Provider>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}
