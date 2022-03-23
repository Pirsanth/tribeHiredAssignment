/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  ActivityIndicator,
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


const Header = ({showBackButton, title, onBackButtonPress, showInnerLoading}) => {
  const COLOR = 'white';

  return (
    <View style={{
      width:'100%',
      justifyContent:'center',
      alignItems:'center',
      height:100,
      flexDirection:'row',
      backgroundColor:'steelblue'
    }}>
      {
        showBackButton && (
          <TouchableOpacity style={{
            position:'absolute',
            width:'10%',
            left:0,
            top:0,
            bottom:0,
            justifyContent:'center',
            alignItems:'center'
          }}
          onPress={onBackButtonPress}
          >
          <FontIcon name="arrow-left" size={22} color={COLOR}/>
        </TouchableOpacity>
        )
      }

      <View style={{width:'80%', justifyContent:'center', alignItems:'center', }}>
        <Text 
        // ellipsizeMode="tail"
        style={{fontWeight:'bold', color:COLOR, fontSize:24, textAlign:'center'}}>{title}</Text>
      </View>

      {
        showInnerLoading && (
          <View style={{
            position:'absolute',
            width:'8%',
            marginRight:'2%',
            right:0,
            top:0,
            bottom:0,
            justifyContent:'center',
            alignItems:'center'
          }}
          onPress={onBackButtonPress}
          >
            <ActivityIndicator size="large" color="black" />
        </View>
        )
      }

    </View>
  );
};



export default Header;
