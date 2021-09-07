import React,{useState,useEffect,useContext} from 'react';
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
  } from 'react-native';
  import { UserContext } from './Context';

function HomeComponent({navigation,route}){
  const [userData,setUserData] = useState([]);
  const gblData = useContext(UserContext);
  
  useEffect(() => {
    const listerner = navigation.addListener('focus', () => {
      console.log("=====addListener Called from Home Screen",gblData.fetchOnce);
      if(gblData.fetchOnce){  
          fetch('https://fakejsonapi.com/fake-api/employee/api/v1/employees')
            .then((response) => response.json())
            .then((json) => {
              if(json.status === "success"){
                gblData.userData = json.data;
                setUserData([...gblData.userData]);
                console.log("Fetch Success!!!",gblData.userData.length)
                gblData.fetchOnce=false;
              }else{
                alert("Failed to fetch data from Server");
              }}) 
        }else{
          console.log("Update EmpData in useState");
          setUserData([...gblData.userData]);
        }
    });
    return listerner;
  }, [navigation]);

  function updateempDetails(id){
    var empData={};
    console.log("updateempDetails: ",id);
    gblData.userData.forEach(item =>{
      if(item.id === id){
        empData = item;
        return; 
      }
    })
    navigation.navigate("AddUpdateEmpDetails",{type:"Update/Delete",empData :empData,AddempBtn:false});
  }
  function navigateToViewEmpDetails(id){
    var empData={};
    gblData.userData.forEach(item =>{
      if(item.id === id){
        empData = item;
        return; 
      }
    })
    console.log("ViewempDetails: ",empData);
    navigation.navigate("ViewEmpDetails",{type:"View",empData :empData});
  }
    function renderEmployeeData({item}){
      //console.log("MEGALA=>",item["employee_name"])
      return(
        <View>
          <TouchableOpacity onPress={()=>updateempDetails(item["id"])} style={styles.faltListRow}>
            <Text numberOfLines={1} style={styles.textEmpName}>{item["employee_name"]}</Text>
            <Text style={styles.textEmpAge}>{item["employee_age"]}</Text>
            <Text style={styles.textEmpSal}>{item["employee_salary"]}</Text>
            <Text style={styles.textEmpView} onPress={()=>navigateToViewEmpDetails(item["id"])} >View</Text>
          </TouchableOpacity>
        </View>
      )
    }
    console.log("=========================================renderer called!!!",userData.length)
    return(<SafeAreaView style={styles.safeContainer} >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <FlatList contentContainerStyle={{flexGrow: 1}} style={{backgroundColor:'#f5e9fd'}}  data={userData} renderItem={renderEmployeeData} keyExtractor={(item,index)=>index} />
      </ScrollView>
    </SafeAreaView>)
}
const styles = StyleSheet.create({
    safeContainer:{
      flex: 1
    },
    textEmpName:{width:40+'%',height:40,lineHeight:40,marginLeft:5},
    textEmpSal:{width:25+'%',height:40,lineHeight:40},
    textEmpAge:{width:15+'%',height:40,lineHeight:40},
    textEmpView:{width:20+'%',height:40,lineHeight:40,fontWeight:'bold'},
    faltListRow:{height:40,flexDirection:'row',borderWidth:1,borderColor:'silver'}
  });
export default HomeComponent