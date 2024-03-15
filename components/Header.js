import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { MaterialIcons } from '@expo/vector-icons';

const Header = ({ navigation, user, screen }) => {
  const [profile, setProfile] = useState(user);
  useEffect(() => {
    setProfile(user);
  }, [user]);

  return (
    <View style={[styles.header_cont1]}>
      {navigation && screen != "CROPDOC" && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="white" />
        </TouchableOpacity>
      )}
      <View
        style={[
          styles.header_cont1,
          { justifyContent: user ? "space-between" : "center" },
        ]}
      >
        <Text style={styles.header_text}>{screen}</Text>

        {screen === "CROPDOC" ? (
          <TouchableOpacity
            onPress={() => {
              navigation.push("ProfileScreen", { profile: profile });
            }}
          >
            {profile && profile.image ? (
              <Image
                source={{ uri: `${profile.image}` }}
                style={styles.header_image}
              />
            ) : (
              <Image
                source={require("../assets/profile.png")}
                style={styles.header_image}
              />
            )}
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header_cont1: {
    backgroundColor: "rgb(8,207,142)",
    height: 80,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    zIndex: 100,
    // flex:1
  },
  header_text: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  header_image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
export default Header;
