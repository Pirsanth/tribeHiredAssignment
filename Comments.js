/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect,useState} from 'react';
import type {Node} from 'react';
import {
  ActivityIndicator,
  FlatList,
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
import axios from 'axios';
import _ from 'lodash';


const Comments = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const postId = _.get(props, "route.params.postId", 1);

    console.log(postId)
    axios.get('/comments',{
      params: {
        postId
      }
    })
    .then(res => {
      console.log('res success')
      console.log(res.data)
      setIsLoading(false);
      setData(res.data)
    })
    .catch(e => {
      console.log('catch')
      console.log(e)
      alert("An error occured while trying to retreive posts")
    })

  }, [])

  renderItem = ({item},index) => {

    return (
    <TouchableOpacity style={{
          backgroundColor:'red',
          height:120,
          width:'88%',
          alignSelf:'center',
          marginBottom:10,
          padding:20,
          borderRadius:12,
          overflow:'hidden'
        }}>
          <Text style={{fontWeight:'bold',marginBottom:5}}>{item?.name}</Text>
          <Text style={{marginBottom:5}}>{item?.email}</Text>
          <Text style={{marginBottom:5}}>{item?.body}</Text>
      </TouchableOpacity>
    )
    
  }

  const renderContent = () => {

    if(isLoading){
      return (
        <ActivityIndicator size="large" color="black"/>
      )
    }

    if(_.isEmpty(data)){
      // if(true){
      return (
        <Text style={{
          color:'black',
          fontSize:18,
          textAlign:'center'
        }}>There is no data to display</Text>
      )
    }
    else {
      return (
        <FlatList 
          renderItem={renderItem}
          data={data}
          style={{
            // width:'90%',
            width:'100%',
            flex:1
          }}
        />
      )
    }


  }

  return (
    <SafeAreaView style={{
      flex:1,
      backgroundColor:'orange',
      width:'100%'
    }}>
      <Header 
        title="Comments"
        showBackButton
        onBackButtonPress={()=>{
          props.navigation.pop()
        }}
        // title="All Posts All Posts All Posts All Posts All Posts All Posts All Posts All Posts All Posts All Posts"
      />
      <View style={{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        paddingTop:20,
      }}>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
};


export default Comments;
