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
import FontIcon from 'react-native-vector-icons/FontAwesome';


const Header = ({showBackButton, title}) => {
  const COLOR = 'white';

  return (
    <View style={{
      width:'100%',
      backgroundColor:'powderblue',
      justifyContent:'center',
      alignItems:'center',
      height:100,
      flexDirection:'row',
    }}>
      {
        showBackButton && (
          <TouchableOpacity style={{
            position:'absolute',
            width:'10%',
            left:0,
            backgroundColor:'red',
            top:0,
            bottom:0,
            justifyContent:'center',
            alignItems:'center'
          }}>
          <FontIcon name="arrow-left" size={22} color={COLOR}/>
        </TouchableOpacity>
        )
      }

      <View style={{width:'80%', justifyContent:'center', alignItems:'center', backgroundColor:'pink'}}>
        <Text 
        // ellipsizeMode="tail"
        style={{fontWeight:'bold', color:COLOR, fontSize:24, textAlign:'center'}}>{title}</Text>
      </View>
    </View>
  );
};


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
