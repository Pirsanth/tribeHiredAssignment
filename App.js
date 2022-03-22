/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


const Header = ({showBackButton, title}) => {

  return (
    <View style={{
      width:'100%',
      backgroundColor:'powderblue',
      justifyContent:'center',
      alignItems:'center',
      height:100
    }}>
      <Text style={{fontWeight:'bold', color:'white', fontSize:24, textAlign:'center'}}>{title}</Text>
    </View>
  );
};


const App = () => {

  return (
    <SafeAreaView style={{
      flex:1,
      backgroundColor:'orange'
    }}>
      <Header title="All Posts"/>
    </SafeAreaView>
  );
};


export default App;
