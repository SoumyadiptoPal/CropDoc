import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import ProfileScreen from './screens/ProfileScreen'
import DiseaseDetection from './screens/DiseaseDetection'
import CropRecommendation from './screens/CropRecommendation'
import NewsScreen from './screens/NewsScreen'
import DashBoard from './screens/DashBoard'
const Stack=createStackNavigator();

const screenOptions={
    headerShown: false
}

export const SignedInStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='HomeScreen'
    screenOptions={screenOptions}>
        <Stack.Screen name='HomeScreen' component={HomeScreen}/> 
        <Stack.Screen name='ProfileScreen' component={ProfileScreen}/>
        <Stack.Screen name='DiseaseDetection' component={DiseaseDetection}/>
        <Stack.Screen name='CropRecommendation' component={CropRecommendation}/>
        <Stack.Screen name='NewsScreen' component={NewsScreen}/>
        <Stack.Screen name='DashBoard' component={DashBoard}/>

        </Stack.Navigator>
    </NavigationContainer>
    
  )
}

export const SignedOutStack=()=>(
  <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginScreen'
    screenOptions={screenOptions}>
        <Stack.Screen name='LoginScreen' component={LoginScreen}/>
        <Stack.Screen name='SignupScreen' component={SignUpScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
)