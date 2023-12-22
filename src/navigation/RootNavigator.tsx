import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImageLibraryScreen from '../screens/ImageLibraryScreen';
import ResizeScreen from '../screens/ResizeScreen';
 const stack=createNativeStackNavigator()
const RootNavigator = () => {
  return (
  <NavigationContainer>
 <stack.Navigator>
    <stack.Screen name='ImageLibraryScreen' component={ImageLibraryScreen} />
    <stack.Screen name='ResizeScreen' component={ResizeScreen} />
 </stack.Navigator>
  </NavigationContainer>
  )
}

export default RootNavigator