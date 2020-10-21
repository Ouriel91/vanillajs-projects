import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Categories from './screens/Categoreis'
import Content from './screens/Content'
import PreviewAndPublication from './screens/PreviewAndPublication'

const Tabs = createBottomTabNavigator()
const NavigationStack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tabs.Navigator>
        <NavigationStack.Screen name='תוכן' component={Content}/>
        <NavigationStack.Screen name='קטגוריות' component={Categories}/>
        <NavigationStack.Screen name='תצוגה מקדימה ופרסום' component={PreviewAndPublication}/>
      </Tabs.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});