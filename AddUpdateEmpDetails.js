import React,{useState,useEffect,useRef,useContext} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
  } from 'react-native';
import {UserContext} from './Context';

function CRUDEmpDetails({navigation,route}){
    const nameInputEl = useRef(null);
    const salInputEl = useRef(null);
    const ageInputEl = useRef(null);
    
    const toggleBtn = route.params.AddempBtn;
    const routeEmpDetails = route.params.empData;
    const [emp,setEmp] = useState({Name:routeEmpDetails.employee_name,Salary:routeEmpDetails.employee_salary.toString(),Age:routeEmpDetails.employee_age.toString(),Id:routeEmpDetails.id});
    const gblData = useContext(UserContext);
    function changeInputText(text,name,Id){    
        setEmp({...emp,[name]:text,["Id"]:Id});
    }
    function addOrUpdateEmpDetails(){
        if(emp.Name.length === 1 || !isNaN(emp.Name) || emp.Name.replace(/\s/g, '') === ""){
            alert("Invalid Emp Name");
            nameInputEl.current.focus();
            return;
        }
        if(isNaN(emp.Salary) || emp.Salary.replace(/\s/g, '') === ""){
            alert("Invalid Emp Salary");
            salInputEl.current.focus();
            return;
        }
        if(isNaN(emp.Age) || emp.Age.replace(/\s/g, '') === ""){
            alert("Invalid Emp Age");
            ageInputEl.current.focus();
            return;
        }
        var uData = [...gblData.userData] || [];
        var Identity;
        if(emp.Id !== ""){
            //Update Existing Data
            let url = "https://fakejsonapi.com/fake-api/employee/api/v1/update/"+emp.Id;
            fetch(url,{
            method: 'PUT',
            body:{
                "employee_name":emp.Name,
                "employee_age":emp.Age,
                "employee_salary": emp.Salary
            }
            }).then((response) => response.json())
            .then((json) => {
            if(json.status === "success" || json.message === "No route found"){
                Identity = parseInt(emp.Id,10);
                uData.forEach(item =>{
                    if(item.id === Identity){
                        item["employee_name"] = emp.Name;
                        item["employee_age"] = emp.Age;
                        item["employee_salary"] = emp.Salary;
                    }
                });
                gblData.userData = uData;
                alert("Updated Successfully");
                navigation.navigate("HomeComponent")
            }else{
                console.log("Failed to Update Emp Data",json)
            }
            })
            
        }else{
            //Add New Data
            Identity = uData[uData.length-1].id;
            let url = "https://fakejsonapi.com/fake-api/employee/api/v1/create";
            fetch(url,{
            method: 'POST',
            body:{
                "id" : Identity + 1,
                "employee_name":emp.Name,
                "employee_age":emp.Age,
                "employee_salary": emp.Salary
            }
            }).then((response) => response.json())
            .then((json) => {
            if(json.status === "success"){
                uData = {};
                uData["id"] = Identity +1;
                uData["employee_name"] = emp.Name;
                uData["employee_age"] = emp.Age;
                uData["employee_salary"] = emp.Salary;
                console.log("MEGALA=========>uData:",gblData.userData.length,uData)
                gblData.userData[gblData.userData.length] = uData;
                alert("Added Successfully")
                navigation.navigate("HomeComponent")
            }else{
                console.log("Failed to Add New Data",json)
            }
            })
            
        }    
    }

    function deleteEmpDetails(){
        if(emp.Id !== ""){
            let url = "https://fakejsonapi.com/fake-api/employee/api/v1/delete/"+emp.Id;
            fetch(url,{
            method: 'DELETE'
            }).then((response) => response.json())
            .then((json) => {
            if(json.status === "success" || json.message === "No route found"){
                // json.message === "No route found" ===> Handling for Newly created Emp Record by us.
                var key=0; var index;
                let uData = [...gblData.userData];
                console.log("Delete Id : ",emp.Id)
                uData.forEach((item) =>{
                if(item.id.toString() === emp.Id.toString()){
                    index = key;
                }
                key++;
                })
                console.log("Delete index : ",index);
                uData.splice(index,1); 
                gblData.userData = uData;
                alert("Deleted Successfully");
                //navigation.goBack();
                navigation.navigate("HomeComponent")
            }
            });
        }
        else{
            console.log("Failed to Delet Emp Data !!!",json)
        }    
    }
    return(
        <SafeAreaView style={styles.safeContainer} >
            <View style={{width:100+'%',flex:1,backgroundColor:'#ddeaff'}} >
            <View style={styles.inputTextRow}>
                <Text style={styles.label}>Name</Text>
                <TextInput numberOfLines={1} ref={nameInputEl} style={styles.input} value={emp.Name} onChangeText={(text)=>changeInputText(text,"Name",emp.Id)} ></TextInput>
            </View>
            <View style={styles.inputTextRow}>
                <Text style={styles.label}>Salary</Text>
                <TextInput numberOfLines={1} ref={salInputEl} style={styles.input} value={emp.Salary} onChangeText={(text)=>changeInputText(text,"Salary",emp.Id)} ></TextInput>
            </View>
            <View style={styles.inputTextRow}>
                <Text style={styles.label}>Age</Text>
                <TextInput numberOfLines={1} ref={ageInputEl} style={styles.input} value={emp.Age} onChangeText={(text)=>changeInputText(text,"Age",emp.Id)} ></TextInput>
            </View>
            { !toggleBtn ?
            <View style={{flexDirection:'row',marginTop:10}}>
                <TouchableOpacity style={[styles.updateDeleteBtn,{marginLeft:5}]} onPress={addOrUpdateEmpDetails}>
                <Text style={styles.updateDeleteText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.updateDeleteBtn,{marginLeft:10}]} onPress={deleteEmpDetails}>
                <Text style={styles.updateDeleteText}>Delete</Text>
                </TouchableOpacity>
            </View> :
            <View style={{flexDirection:'row',marginTop:10}}>
                <TouchableOpacity style={styles.addBtn} onPress={addOrUpdateEmpDetails} >
                <Text style={styles.updateDeleteText}>Add</Text>
                </TouchableOpacity>
            </View> }
            </View>
        </SafeAreaView>)
}
const styles = StyleSheet.create({
    safeContainer:{
      flex: 1
    },
    inputTextRow:{flexDirection:'row',height:40,marginTop:10},
    label:{width:20+'%',marginLeft:5,fontSize:20,fontWeight:'bold'},
    input:{width:60+'%',lineHeight:20,borderWidth:1,borderColor:'black',fontSize:20,fontWeight:'bold'},
    updateDeleteBtn:{marginTop:20,width:25+'%',height:40,backgroundColor:'lightblue',borderWidth:2,borderColor:'blue',borderRadius:5},
    updateDeleteText:{fontSize:20,fontWeight:'bold',marginLeft:15,lineHeight:30},
    addBtn:{marginLeft:5,marginTop:20,width:20+'%',height:40,backgroundColor:'lightblue',borderWidth:2,borderColor:'blue',borderRadius:5}
  });

export default CRUDEmpDetails