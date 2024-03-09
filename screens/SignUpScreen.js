import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Pressable, Alert,Image } from 'react-native'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db,auth} from '../firebase'
import { collection, addDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 

const SignUpScreen = ({navigation}) => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [name,setName]=useState("");
  const [validEmail,setValidEmail]=useState(true);
  const [validpassword,setValidPassword]=useState(true);
  const [isValid,setIsValid]=useState(true)

  const validateEmail=()=>{
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    const flag=emailRegex.test(email)
    // Test the email against the regular expression
    setValidEmail(flag);
    return flag;
  }
  const handleSubmit=()=>{
    if(validEmail==true && (password.length>5))
    onSignUp(email,password,name)
  }

  const onSignUp=async (email,password,username)=>{
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log("signUp successful")
        navigation.navigate('HomeScreen')
        try {
          const docRef = await setDoc(doc(db, "users", email), {
            username:username,
            email: email
          });
          // console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert('Error in Sign Up',errorMessage);
      });
  }

  return (
    <View style={styles.container}>
       <Image source={require('../assets/favicon.png')} style={{ width: 100, height: 100 }} />
    <View style={styles.wrapper}>
    <View style={[styles.inputField]}>
      <TextInput
      placeholder='Enter your UserName'
      placeholderTextColor="#444"
      autoCapitalize='none'
      keyboardType='email-address'
      textContentType='emailAddress'
      autoFocus={true}
      onChangeText={(text)=>{setName(text)}}
      // onBlur={handleBlur('email')}
      value={name}
      />
      </View>

      <View style={[styles.inputField,{borderColor:(validEmail)?'#ccc':'red'}]}>
      <TextInput
      placeholder='Enter your Email'
      placeholderTextColor="#444"
      autoCapitalize='none'
      keyboardType='email-address'
      textContentType='emailAddress'
      autoFocus={true}
      onChangeText={(text)=>{setEmail(text)}}
      onBlur={()=>{validateEmail()}}
      value={email}
      />
      </View>
      <View style={[styles.inputField,{borderColor:(password.length<1 || password.length>5)?'#ccc':'red'}]}>
      <TextInput
      placeholder='Password'
      placeholderTextColor="#444"
      autoCapitalize='none'
      autoCorrect={false}
      secureTextEntry={true}
      textContentType='password'
      onChangeText={(text)=>{setPassword(text)}}
      // onBlur={handleBlur('password')}
      value={password}
      />
      </View>
      <Pressable
      style={styles.button(isValid)}
      onPress={handleSubmit}
      >
        <Text 
        style={styles.buttonText}
        >Register</Text>
      </Pressable>
      <View style={styles.signupContainer}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('LoginScreen')}>
            <Text style={{color:'#6BB0F5'}}> Login</Text>
          </TouchableOpacity>
      </View>
    </View>
    </View>
  )
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    padding:10
  },
  inputField:{
      borderRadius:4,
      padding:12,
      backgroundColor:'#FAFAFA',
      marginBottom:10,
      borderWidth:1,
  },
  wrapper:{
      width:'100%',
      marginTop:50,
  },
  signupContainer:{
    flexDirection:'row',
    justifyContent:'center',
    marginTop:50
  },
  button:(isValid)=>({
    backgroundColor:isValid ? '#30A2FF' : '#9DB2BF',
    alignItems:'center',
    justifyContent:'center',
    height:50,
    borderRadius:4,
    width:"100%"
  }),
  buttonText:{
    fontWeight:'400',
    fontSize:20,
    color:'#fff'
  }
})

export default SignUpScreen