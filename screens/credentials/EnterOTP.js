
import React,{useState,useEffect,useRef} from "react";
import {SafeAreaView,ScrollView,StatusBar,StyleSheet,Text, useColorScheme,View,TextInput,TouchableOpacity,Image} from 'react-native';
import { Button } from "react-native-elements";
import OTPTextView from 'react-native-otp-textinput'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const EnterOTP=({navigation})=>{
    const otpInputRef = useRef(null);
    const [val,setVal]=useState('');
    const [msg,setMsg]=useState('');
    const onPressEnterOTP=async()=>{
        const userInfo=await AsyncStorage.getItem('userInfo');
        if(userInfo){
            const {email_mobile}=JSON.parse(userInfo);
            const rPRes=await axios.post('http://saloon.magnifyingevents.com/api/api-v2.php',{
    
                access_key:6808,
                reset_password:1,
                password:val,
                email_mobile:email_mobile,
                reset_token:'39o0ek2g'
            },{
                headers:{
                    authorization:`Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTgxNDcyNzcsImlzcyI6ImF1cmEiLCJleHAiOjE2NTgyNTUyNzcsInN1YiI6ImF1cmEgaXQgc29sdXRpb25zIn0.lA4aF5jJ_Itx0RJZ546n_tzoBcnlquUf289CyOjtSLE`
                }
            });
            console.log(rPRes);
            if(rPRes.data.error==false){
                navigation.navigate('Login');
                
            }
        }
    }
    const dispatchOTPfn=async()=>{
        const userInfo=await AsyncStorage.getItem('userInfo');
        if(userInfo){
            const {email_mobile}=JSON.parse(userInfo);
            const fPRes=await axios.post('http://saloon.magnifyingevents.com/api/api-v2.php',{
    
                access_key:6808,
                forgot_password:1,
                email_mobile:email_mobile
            },{
                headers:{
                    authorization:`Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTgxNDcyNzcsImlzcyI6ImF1cmEiLCJleHAiOjE2NTgyNTUyNzcsInN1YiI6ImF1cmEgaXQgc29sdXRpb25zIn0.lA4aF5jJ_Itx0RJZ546n_tzoBcnlquUf289CyOjtSLE`
                }
            });
            console.log(fPRes);
            if(fPRes.data.error==false){
                setMsg(fPRes.data.message);
                
            }
        }
    }
    useEffect(()=>{
        dispatchOTPfn();
    },[])

    return (
        <KeyboardAwareScrollView contentContainerStyle={{height:480}}>
        <View style={{backgroundColor:'white',flex:1,justifyContent:'space-evenly'}}>
          
        <Image source={require('../../statics/Bellazza.png')} style={{alignSelf:'center',marginTop:10}}/>
            <Text style={{fontFamily:'Poppins-Bold',alignSelf:'center',color:'black',fontWeight:'600',fontSize:20,lineHeight:30}}>Enter OTP</Text>
            <Text>{msg}</Text>
            <Text style={{...style.tStyle,fontWeight:'500',fontSize:14,lineHeight:21,width:'60%',alignSelf:'center'}}>Please enter the OTP that you have recieved on your phone number</Text>
                <OTPTextView 
                    ref={e => {otpInputRef.current=val;}}
                    handleTextChange={(e)=>{setVal(e);}}
                    containerStyle={{color:'white',width:'80%',alignSelf:'center'}}
                    textInputStyle={{ borderWidth: 2, borderRadius:8, borderBottomWidth: 2, marginTop:0 }}
                    tintColor="#FF3737"
                    offTintColor="#FF3737"
                />
    
            
           
                <Button onPress={()=>{onPressEnterOTP()}} buttonStyle={{width:'70%', borderRadius:15,alignSelf:'center',height:58,backgroundColor:'#EA2424'}} title="Enter OTP"/>
                <TouchableOpacity onPress={()=>navigation.navigate('EnterOTP')}><Text style={{fontWeight:'600',fontSize:13,lineHeight:18,fontFamily:'Poppins-Regular',alignSelf:'center',color:'#EA2424'}}>Didn’t get the OTP?  Send Again</Text></TouchableOpacity>
    
          
        </View>
        </KeyboardAwareScrollView>
    )
}

export default EnterOTP;
const style=StyleSheet.create({
    tStyle:{
        fontFamily:'Poppins-Regular',
        textAlign:'center',
        color:'black'
    }
})