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
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Header from './Header';



const App = () => {

  return (
    <SafeAreaView style={{
      flex:1,
      backgroundColor:'orange'
    }}>
      <Header 
        title="All Posts"
        
        // title="All Posts All Posts All Posts All Posts All Posts All Posts All Posts All Posts All Posts All Posts"
      />
    </SafeAreaView>
  );
};


export default App;
