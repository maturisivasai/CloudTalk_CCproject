import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from "./screens/loginScreen";
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from "./screens/registerScreen";
import HomeScreen from "./screens/homeScreen";
import InsertNewChatScreen from './screens/insertChatScreen';
import ChatScreen from './screens/chatScreen';


const Stack = createStackNavigator();
const globalScreenOptions = {
  headerStyle: { backgroundColor: "#808000" },
  headerTitleStyle: { color: "white" }
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={globalScreenOptions}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="InsertNewChat" component={InsertNewChatScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
