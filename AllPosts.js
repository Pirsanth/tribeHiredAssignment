/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect,useState} from 'react';
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
import ParseLink from 'parse-links';
const AMOUNT_TO_TAKE_PER_FETCH = 10;


const AllPosts = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [resTotal, setResTotal] = useState(0);
  const [showInnerLoading, setShowInnerLoading] = useState(false);
  const AMOUNT_TO_TAKE_PER_FETCH = 20;
  let fetchRequestNo = 0;


  const getNextPage = () => {
    return Math.ceil(data.length/AMOUNT_TO_TAKE_PER_FETCH) + 1;
}


const onEndReached = () => {
  //if it has fetched all of the data already, return
  if(data.length === resTotal){
      return;
  }
  setShowInnerLoading(true);

  let params = {
      _limit:AMOUNT_TO_TAKE_PER_FETCH,
      _page:getNextPage()
  }

  const innerFetchNo = fetchRequestNo + 1;
  fetchRequestNo = innerFetchNo;

  axios.get('/posts', {
      params: params
  })
  .then(res => {      
      if(fetchRequestNo !== innerFetchNo){
          return;
      }
      const additionalData = res.data;
      const newData = [...data, ...additionalData];
      setData(newData);
      setShowInnerLoading(false);
  })
  .catch(x => {
      console.log('caught')
      console.log(x)
  })

}


  useEffect(() => {
    axios.get('/posts', {
      params:{
        _limit:AMOUNT_TO_TAKE_PER_FETCH,
        _page:1
      }
    })
    .then(res => {
      const lastUrl = ParseLink(res.headers["link"]).last;
      const lastPage = (new URL(lastUrl)).searchParams.get("_page");
      const resTotal = lastPage*AMOUNT_TO_TAKE_PER_FETCH;
      setResTotal(resTotal);
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
          padding:20,
          borderWidth:1,
          borderColor:'black',
          backgroundColor:'#d8f4ff',
          width:'88%',
          marginBottom:10,
          alignSelf:'center',
          borderRadius:12,
        }}
        onPress={()=>{
          props.navigation.navigate("Comments",{
            postId: item?.id
          })
        }}
        >
        <View style={{
              height:120,
              overflow:'hidden',
            }}
            >
              <Text style={{fontWeight:'900',marginBottom:5, color:'#31697e'}}>{item?.title}</Text>
              {/* <View style={{overflow:'hidden'}}> */}
                <Text style={{marginBottom:5}}>{item?.body}</Text>
              {/* </View> */}
          </View>
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
          onEndReached={onEndReached}
        />
      )
    }


  }

  return (
    <SafeAreaView style={{
      flex:1,
      width:'100%',
      backgroundColor:'#b1eaff',
      // backgroundColor:'powderblue'
    }}>
      <Header 
        title="All Posts"
        showInnerLoading={showInnerLoading}
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


export default AllPosts;
