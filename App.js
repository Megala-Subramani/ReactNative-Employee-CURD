/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React,{useState,useEffect,useContext} from 'react';
 import 'react-native-gesture-handler';
 import {NavigationContainer} from '@react-navigation/native';
 import {createStackNavigator} from '@react-navigation/stack';
 import CRUDEmpDetails from './AddUpdateEmpDetails';
 import ViewEmpDetails from './ViewEmpDetails';
 import HomeComponent from './HomeScreen';
 import { UserProvider } from './Context';
 import { StyleSheet,TouchableOpacity,Text } from 'react-native';

 const Stack = createStackNavigator();
 function App ({navigation}) {
  
  function addNewEmpDetails(navigation){
    var empData={employee_name:'',employee_salary:'',employee_age:'',id:''};
    navigation.navigate("AddUpdateEmpDetails",{type:"Add",empData :empData,AddempBtn:true});
  }
  const userData=[];

  console.log("==================>From APP renderer")
  return (
    <UserProvider value={{userData : userData,fetchOnce:true}}>
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="HomeComponent" component={HomeComponent} options={({ navigation })=>({
            title:"Employee Records",
            headerRight: () => (
            <TouchableOpacity
              onPress={()=>addNewEmpDetails(navigation)}
              style={styles.AddBtn}
            ><Text style={styles.AddText} >+</Text></TouchableOpacity>) })} />
          <Stack.Screen name="AddUpdateEmpDetails" component={CRUDEmpDetails} options={{headerShown:false}} />
          <Stack.Screen name="ViewEmpDetails" component={ViewEmpDetails} options={{title:"Employee Details"}} />
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
 };
 const styles = StyleSheet.create({
  AddBtn:{
    width:50,
    height:50,
    backgroundColor:'#4d96ff',
    borderRadius:25,
    marginRight:5,
    borderWidth:2,
    borderColor:'blue'
  },
  AddText:{
    textAlign:'center',
    fontSize:32,
    fontWeight:'bold',
    color:'white'
  }
});
 
 export default App;
 