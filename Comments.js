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
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Header from './Header';
import axios from 'axios';
import _ from 'lodash';
import RadioGroup from 'react-native-radio-buttons-group';

const RADIO_ENUM = {
  "All":"1",
  "Name":"2",
  "Email":"3",
  "Body":"4"
};

const radioButtonsData = [
{
  id: RADIO_ENUM["All"], 
  label: 'All',
  value: 'All',
  selected:true
}, 
{
  id: RADIO_ENUM["Name"],
  label: 'Name',
  value: 'Name'
},
{
  id: RADIO_ENUM["Email"], 
  label: 'Email',
  value: 'Email'
}, 
{
  id: RADIO_ENUM["Body"], 
  label: 'Body',
  value: 'Body'
}, 
]

const Comments = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [radioButtons, setRadioButtons] = useState(radioButtonsData)
  const [keyword, setKeyword] = useState('')

  function onPressRadioButton(radioButtonsArray) {
      setRadioButtons(radioButtonsArray);
  }

  useEffect(() => {
    const selectedButtonId = radioButtons.filter(x => !!x.selected)[0].id;


    if(!keyword){
      setFilteredData(data);
    } else {
      const filteredData= data.filter(item=> {
        
        if(selectedButtonId === RADIO_ENUM["Name"]){
          return item?.name.includes(keyword)
        }
        else if(selectedButtonId === RADIO_ENUM["Email"]){
          return item?.email.includes(keyword)
        }
        else if(selectedButtonId === RADIO_ENUM["Body"]){
          return item?.body.includes(keyword)
        }
        else if(selectedButtonId === RADIO_ENUM["All"]){
          return ([item.body, item.name, item.email]).some(x => x.includes(keyword))          
        }

      })
      setFilteredData(filteredData);
    }

  }, [keyword, radioButtons, data])

  useEffect(() => {
    const postId = _.get(props, "route.params.postId", 1);

    axios.get('/comments',{
      params: {
        postId
      }
    })
    .then(res => {
      setIsLoading(false);
      setData(res.data)
    })
    .catch(e => {
      console.log('catch')
      console.log(e)
      alert("An error occured while trying to retreive posts")
    })

  }, [])

  // renderItem = ({item},index) => {

  //   return (
  //   <View style={{
  //         borderColor:'black',
  //         borderWidth:1,
  //         height:120,
  //         width:'88%',
  //         alignSelf:'center',
  //         marginBottom:10,
  //         padding:20,
  //         borderRadius:12,
  //         overflow:'hidden',
  //         backgroundColor:'#d8f4ff'
  //       }}>
  //         <Text style={{fontWeight:'900',marginBottom:5, color:'#31697e'}}>{item?.name}</Text>
  //         <Text style={{marginBottom:5}}>{item?.email}</Text>
  //         <Text style={{marginBottom:5}}>{item?.body}</Text>
  //     </View>
  //   )
    
  // }


  renderItem = ({item},index) => {
    return (
      <View style={{
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
             <Text style={{fontWeight:'900',marginBottom:5, color:'#31697e'}}>{item?.name}</Text>
             <Text style={{marginBottom:5, fontWeight:'bold'}}>{item?.email}</Text>
             <Text style={{marginBottom:5}}>{item?.body}</Text>
          </View>
      </View>
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
          data={filteredData}
          style={{
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
      width:'100%',
      backgroundColor:'#b1eaff',
    }}>
      <Header 
        title="Comments"
        showBackButton
        onBackButtonPress={()=>{
          props.navigation.pop()
        }}
      />

        <Text style={{fontSize:20, margin:5}}>Filter:</Text>
        <RadioGroup 
            radioButtons={radioButtons} 
            onPress={onPressRadioButton} 
            layout='row'
        />

        <TextInput 
          autoCapitalize="none"
          value={keyword} 
          placeholder="Enter keyword to filter by" 
          style={{width:'88%',backgroundColor:'white',alignSelf:'center',padding:10,marginTop:10, borderRadius:8, borderColor:'black', borderWidth:1,}}
          onChangeText={(x)=>{ setKeyword(x)}}
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
