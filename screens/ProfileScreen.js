import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Touchable } from "react-native";
import Header from "../components/Header";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { TouchableOpacity } from "react-native-gesture-handler";
import { signOut } from "firebase/auth";

const ProfileScreen = ({ navigation, route }) => {
  const [profile, setProfile] = useState(route.params.profile);
  const [isCurrentUser,setIsCurrentUser]=useState(false)
  useEffect(() => {
    if(auth.currentUser.email===route.params.profile.email)
    setIsCurrentUser(true);
  }, []);

  const handleLogout=()=>{
signOut(auth).then(() => {
  console.log("Sign out Successful")
}).catch((error) => {
  console.log("Error Sign out")
});

  }
  return (
    <View>
      <Header navigation={navigation} />
      <View style={styles.profile_cont1}>
        <View style={styles.profile_cont3}>
          {profile && profile.image ? (
            <Image
              source={{ uri: `${profile.image}` }}
              style={styles.profile_image}
            />
          ) : (
            <Image
              source={require("../assets/icon.png")}
              style={styles.profile_image}
            />
          )}
        </View>
        <View style={styles.profile_cont2}>
          <View style={styles.profile_text1}>
            <Text style={[styles.profile_text2, { fontWeight: "800" }]}>
              Name:{" "}
            </Text>
            <Text style={[styles.profile_text2, {}]}>{profile.username}</Text>
          </View>
          <View style={styles.profile_text1}>
            <Text style={[styles.profile_text2, { fontWeight: "800" }]}>
              Email:{" "}
            </Text>
            <Text style={[styles.profile_text2, {}]}>{profile.email}</Text>
          </View>
          {(isCurrentUser)?<View style={{alignItems:'center'}}>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logout}>Logout</Text>
          </TouchableOpacity>
          </View>:<></>}
          
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profile_cont1: {
    paddingTop: 20,
    // borderColor: "black",
    // borderWidth: 2,
    marginTop: 50,
  },
  profile_cont2: {
    // borderColor: "black",
    // borderWidth: 2,
    // margin:20,
    marginTop: 30,
  },
  profile_cont3: {
    alignItems: "center",
    justifyContent: "center",
  },
  profile_image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: "black",
    borderWidth: 2,
  },
  profile_text1: {
    marginLeft: 20,
    marginRight: 20,
    borderColor: "black",
    borderWidth: 1,
    height: 50,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:5
  },

  profile_text2: {
    fontSize: 20,
  },
  logout:{
    backgroundColor:'red',
    fontSize:20,
    fontWeight:'900',
    color:'white',
    padding:10,
    margin:20,
    borderRadius:10
  }
});
export default ProfileScreen;
