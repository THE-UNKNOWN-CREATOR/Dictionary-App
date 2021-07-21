import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screnz/HomeScreenz';

export default class App extends React.Component {
  render()
  {
    return (
      <View>
        <HomeScreen />
      </View>
    );
  }
}