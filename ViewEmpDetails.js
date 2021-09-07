import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
  } from 'react-native';

function ViewEmpDetails({navigation,route}){
    const routeEmpDetails = route.params.empData;
    function getEmpDetails(){
        return Object.keys(routeEmpDetails).map((obj, i) => {
            return (
                <Text numberOfLines={1} style={{fontSize:20,fontWeight:'bold'}}>
                    {obj} = { routeEmpDetails[obj] == "" ? "NA" : routeEmpDetails[obj]} 
                </Text>
            )
        })
    }

    return(
        <SafeAreaView >
        <View style={{width:90+'%',height:300,marginLeft:10}}>{getEmpDetails()}
        <TouchableOpacity style={{width:110,height:40,marginTop:20,marginLeft:5,borderWidth:1,backgroundColor:'black'}} onPress={()=>navigation.goBack()}>
            <Text style={{textAlign:'center',fontSize:24,color:'white',fontWeight:'bold'}}>Go Back</Text>
        </TouchableOpacity>
        </View>
        </SafeAreaView>
        )

}

export default ViewEmpDetails