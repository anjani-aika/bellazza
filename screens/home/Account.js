import React,{useEffect,useReducer,useState} from 'react';
import {View,Text, StyleSheet, TouchableOpacity,Image,ActivityIndicator, TextInput} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

// import Toast from 'react-native-toast-message';

const data = [
    { label: 'male', value: 'male' },
    { label: 'female', value: 'female' },

  ];
const Account=({navigation})=>{
    const [loading,setIsLoading] = useState(true);
    const [user,setUser]=useState({name:'',email_mobile:'',gender:'',age:'',profile:'',address:''})
    const [edit,setEdit] = useState(false);
    const getAccountInfo=async()=>{
        const userInfo=await AsyncStorage.getItem('userInfo');
        if(userInfo){
            const {email_mobile}=JSON.parse(userInfo);
            const accRes=await axios.post('http://saloon.magnifyingevents.com/api/api-v2.php',{
    
                access_key:6808,
                view_profile:1,
                email_mobile:email_mobile
            },{
                headers:{
                    authorization:`Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTgxNDcyNzcsImlzcyI6ImF1cmEiLCJleHAiOjE2NTgyNTUyNzcsInN1YiI6ImF1cmEgaXQgc29sdXRpb25zIn0.lA4aF5jJ_Itx0RJZ546n_tzoBcnlquUf289CyOjtSLE`
                }
            });
            console.log(accRes);
            if(accRes.data.error==false){
                // let userd={name:accRes.data.data.name,email_mobile:accRes.data.data.email_mobile,gender:accRes.data.data.gender,age:accRes.data.data.age,profile:accRes.data.data.profile,address:''};
                // setUser({...userd});
            }
        }
       

    }
    const updateProfile=async()=>{
        setEdit(false);
        const userInfo=await AsyncStorage.getItem('userInfo');
        if(userInfo){
            const {email_mobile}=JSON.parse(userInfo);
            const accURes=await axios.post('http://saloon.magnifyingevents.com/api/api-v2.php',{
                edit_profile:1,
                access_key:6808,
                age:user.age,
                name:user.name,
                email_mobile:email_mobile,
                gender:user.gender,
                address:user.address,
                profile:user.profile
            },{
                headers:{
                    authorization:`Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTgxNDcyNzcsImlzcyI6ImF1cmEiLCJleHAiOjE2NTgyNTUyNzcsInN1YiI6ImF1cmEgaXQgc29sdXRpb25zIn0.lA4aF5jJ_Itx0RJZ546n_tzoBcnlquUf289CyOjtSLE`
                }
            });
            console.log(accURes);
            if(accURes.data.error==false){
                let userd={name:accURes.data.data.name,email_mobile:accURes.data.data.email_mobile,gender:accURes.data.data.gender,age:accURes.data.data.age,profile:accURes.data.data.profile,address:accURes.data.data.address};
                setUser({...userd});
            }
        }
    }
      useEffect(() => {
        getAccountInfo();
      },[]);
      
    return(
        <KeyboardAwareScrollView contentContainerStyle={{backgroundColor:'white',height:720}}>
        <View style={{backgroundColor:'white',paddingHorizontal:25}}>
            <View style={headerStyles.container}>
            <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                <Image source={require('../../statics/menu.png')}/>
            </TouchableOpacity>
            <Text style={{color:'black',fontWeight:'600',fontSize:18,fontFamily:'Poppins-Medium',textAlign:'center',justifyContent:'center', lineHeight:26}}>{edit==false?'My Profile':'Edit Profile'}</Text>
           {edit==false?(<MaterialCommunityIcons
            onPress={()=>setEdit(true)}
                    name="pencil"
                    size={25}
                    color={'#FF3737'}
                    />):(<Text>''</Text>)} 
            
            </View>
            <View style={{justifyContent:'space-evenly',marginTop:10,paddingHorizontal:20}}>
                <>
                {edit==false?(
                    <View style={{width:'100%',height:80,alignSelf:'center',marginTop:10,flexDirection:'row',borderBottomColor:'#D9D9D9',borderBottomWidth:1}}>
                        <View style={{flex:1,justifyContent:'center'}}>
                            <Text style={{color:'#FF3737',fontSize:24,fontFamily:'Poppins-Medium', fontWeight:'600',lineHeight:36,marginBottom:5}}>Hey {user.name} !</Text>
                            <Text style={{fontFamily:'Poppins-Medium',fontWeight:'500',fontSize:13,color:'#B4B4B4',marginRight:19}}>{user.email_mobile}</Text>
                        </View>
                        <View style={{flex:1,justifyContent:'flex-start',alignItems:'flex-end'}}>
                            <Image source={{uri:user.profile}} style={{width:65,height:65,borderRadius:100}}/>
                        </View>
                    </View>
                ):(<View style={{alignSelf:'center',width:120,height:120,borderColor:'black',borderWidth:1,borderRadius:100,alignItems:'center',justifyContent:'center',marginBottom:-20}}>
                       <Image source={{uri:user.profile}} style={{width:100,height:100,borderRadius:100}}/>
                </View>)}
                </>
                <View style={{borderBottomColor:'#D9D9D9',borderBottomWidth:(edit==false?1:0),height:80,justifyContent:'space-evenly',marginVertical:5}}>
                    <Text style={{color:'#FF3737',fontFamily:'Poppins-Medium',fontSize:13,fontWeight:'600'}}>Name</Text>
                    {edit==false?(<Text style={{color:'black',fontFamily:'Poppins-Regular',fontSize:13,fontWeight:'400'}}>{user.name}</Text>):(
                        <TextInput
                        style={{width:'100%',borderBottomColor:'#FF3737',borderBottomWidth:1,color: 'black'}}
                        editable={true}
                        placeholderTextColor = "gray"
                        onChangeText={(text)=>{setUser({...user,name:text})}}
                        value={user.name}
                        ></TextInput> 
                    )}
                </View>
                {edit==false?(<>
                    <View style={{borderBottomColor:'#D9D9D9',borderBottomWidth:(edit==false?1:0),height:80,justifyContent:'space-evenly',marginVertical:5}}>
                        <Text style={{color:'#FF3737',fontFamily:'Poppins-Medium',fontSize:13,fontWeight:'600'}}>email_mobile Number/Email Address</Text>
                        <Text style={{color:'black',fontFamily:'Poppins-Regular',fontSize:13,fontWeight:'400'}}>{user.email_mobile}</Text>
                    </View></>
                    ):null}
           
                
                <View style={{borderBottomColor:'#D9D9D9',borderBottomWidth:(edit==false?1:0),height:80,justifyContent:'space-evenly',marginVertical:5}}>
                    <Text style={{color:'#FF3737',fontFamily:'Poppins-Medium',fontSize:13,fontWeight:'600'}}>Gender</Text>
                    {edit==false?(<Text style={{color:'black',fontFamily:'Poppins-Regular',fontSize:13,fontWeight:'400'}}>{user.gender}</Text>):(
                        <Dropdown
                        //   style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        selectedTextStyle={{fontSize:13,color:'black'}}
                        //   inputSearchStyle={styles.inputSearchStyle}
                        //   iconStyle={styles.iconStyle}
                        data={data}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        searchPlaceholder="Search..."
                        value={user.gender}
                        onChange={(item) => {
                            setUser({...user,gender:item.label})
                        }}
                       
                        />
                    )}
                </View>
                
                <View style={{borderBottomColor:'#D9D9D9',borderBottomWidth:(edit==false?1:0),height:80,justifyContent:'space-evenly',marginVertical:5}}>
                    <Text style={{color:'#FF3737',fontFamily:'Poppins-Medium',fontSize:13,fontWeight:'600'}}>Age</Text>
                    {edit==false?(<Text style={{color:'black',fontFamily:'Poppins-Regular',fontSize:13,fontWeight:'400'}}>{user.age}</Text>):(
                        <TextInput
                        style={{width:'100%',borderBottomColor:'#FF3737',borderBottomWidth:1,color: 'black'}}
                        editable={true}
                        placeholderTextColor = "gray"
                        placeholder=" Address Line 1"
                        onChangeText={(text)=>{setUser({...user,age:text})}}
                        value={user.age}
                        ></TextInput> 
                    )}
                </View>
                
                <View style={{borderBottomColor:'#D9D9D9',borderBottomWidth:(edit==false?1:0),height:80,justifyContent:'space-evenly',marginVertical:5}}>
                    <Text style={{color:'#FF3737',fontFamily:'Poppins-Medium',fontSize:13,fontWeight:'600'}}>Address</Text>
                    {edit==false?(<Text style={{color:'black',fontFamily:'Poppins-Regular',fontSize:13,fontWeight:'400'}}>{user.address}</Text>):(
                        <TextInput
                        style={{width:'100%',borderBottomColor:'#FF3737',borderBottomWidth:1,color: 'black'}}
                        editable={true}
                        placeholderTextColor = "gray"
                        placeholder=" Address Line 1"
                        onChangeText={(text)=>{setUser({...user,address:text})}}
                        value={user.address}
                        ></TextInput> 
                    )}
                </View>
                
              
              
            </View>
            {edit==true?(
                <>
                <View style={{marginTop:30,alignSelf:'center',width:'100%',paddingHorizontal:20}}>
                    <Button title="Update" onPress={()=>updateProfile()} buttonStyle={{width:'100%',borderRadius:10,height:53,alignSelf:'center',backgroundColor:'#EA2424'}}/>
                </View>
                </>
            ):(<Image source={require('../../statics/logout.png')} style={{alignSelf:'center',width:'50%',height:46}}/>)}
        </View>
        </KeyboardAwareScrollView>
    )
}

export default Account;
const headerStyles=StyleSheet.create({
    container:{
      
        width:'100%',
        backgroundColor:'white',
        elevation:0,
        height:50,
        display:'flex',
        flexDirection:'row',
        paddingHorizontal:0,
        alignItems:'center',
        justifyContent:'space-between',
        alignSelf:'center'
    }
 })