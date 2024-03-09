import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import Header from '../components/Header';
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Home from '../components/Home';

const HomeScreen = ({navigation}) => {
    const [profile,setProfile]=useState();

    useEffect(() => {
      const fetchData = async () => {
        const profil = await getDoc(doc(db, "users", auth.currentUser.email));
        setProfile(profil.data());
      };
      fetchData();
    }, []);
    
  return (
    <View>
        <Header navigation={navigation} user={profile} screen="Home"/>
        <Home navigation={navigation}/>
    </View>
  )
}

export default HomeScreen