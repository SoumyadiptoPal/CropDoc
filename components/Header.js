import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const Header = ({ navigation, user, screen }) => {

  const [profile,setProfile]=useState(user)
  useEffect(() => {
    setProfile(user);
  }, [user])
  
  return (
    <View style={styles.header_cont1}>
      <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
        <Text style={styles.header_text}>CropDoc</Text>
      </TouchableOpacity>
      {
        screen && <TouchableOpacity
        onPress={() => {
          navigation.push("ProfileScreen",{profile: profile});
        }}
      >
        {profile && profile.image ? (
          <Image
            source={{ uri: `${profile.image}` }}
            style={styles.header_image}
          />
        ) : (
          <Image
            source={require("../assets/icon.png")}
            style={styles.header_image}
          />
        )}
      </TouchableOpacity>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  header_cont1: {
    backgroundColor: "#46178F",
    height: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
  },
  header_text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  header_image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
export default Header;
