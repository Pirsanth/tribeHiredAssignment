/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect,useState} from 'react';

import AllPosts from './AllPosts';
import Comments from './Comments';
import axios from 'axios';
import _ from 'lodash';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';

const {Navigator, Screen} = createStackNavigator<LoginParamList>()
const App = () => {
  

  return (
    <NavigationContainer>
      <Navigator screenOptions={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}>
           <Screen 
            name="AllPosts" 
            component={AllPosts} 
            options={{headerShown: false}}
          />
          <Screen 
            name="Comments" 
            component={Comments} 
            options={{headerShown: false}}
          />
          
      </Navigator>
    </NavigationContainer>
  );
};


export default App;
