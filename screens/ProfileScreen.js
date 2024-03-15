import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Touchable } from "react-native";
import Header from "../components/Header";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { TouchableOpacity } from "react-native-gesture-handler";
import { signOut } from "firebase/auth";
import SelectDropdown from "react-native-select-dropdown";
import { MaterialIcons } from "@expo/vector-icons";
import { useGlobalState } from "./../GlobalContextState";
import { languages } from "../languages";

const ProfileScreen = ({ navigation, route }) => {
  const [profile, setProfile] = useState(route.params.profile);
  const { state, dispatch } = useGlobalState();
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const Languages = ["English", "हिंदी", "বাংলা"];
  useEffect(() => {
    if (auth.currentUser.email === route.params.profile.email)
      setIsCurrentUser(true);
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign out Successful");
      })
      .catch((error) => {
        console.log("Error Sign out");
      });
  };
  return (
    <View style={{ flex: 1, backgroundColor: "rgb(236,236,236)" }}>
      <Header navigation={navigation} screen={languages[state.globalVariable].text36} />
      <View style={styles.profile_cont1}>
        <View style={styles.profile_cont3}>
          {profile && profile.image ? (
            <Image
              source={{ uri: `${profile.image}` }}
              style={styles.profile_image}
            />
          ) : (
            <Image
              source={require("../assets/profile.png")}
              style={styles.profile_image}
            />
          )}
        </View>
        <View style={styles.profile_cont2}>
          <View style={styles.profile_text1}>
            <Text style={[styles.profile_text2, { fontWeight: "800" }]}>
            {languages[state.globalVariable].text37}:{" "}
            </Text>
            <Text style={[styles.profile_text2, {}]}>{profile.username}</Text>
          </View>
          <View style={styles.profile_text1}>
            <Text style={[styles.profile_text2, { fontWeight: "800" }]}>
            {languages[state.globalVariable].text38}:{" "}
            </Text>
            <Text style={[styles.profile_text2, {}]}>{profile.email}</Text>
          </View>
          <SelectDropdown
            data={Languages}
            defaultButtonText={state.globalVariable}
            onSelect={(selectedItem, index) => {
              dispatch({ type: "UPDATE_GLOBAL_VARIABLE", payload: selectedItem });
              
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
            dropdownIconPosition="right"
            renderDropdownIcon={() => (
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="black"
              />
            )}
            buttonStyle={styles.inputCont}
            buttonTextStyle={{ fontSize: 20 }}
          />
          {isCurrentUser ? (
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.logout}>{languages[state.globalVariable].text50}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profile_cont1: {
    paddingTop: 20,
    marginTop: 50,
  },
  profile_cont2: {
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
    marginHorizontal: 20,
    marginVertical: 5,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent:'center',
    paddingLeft: 30,
    borderRadius: 25,
    backgroundColor: "white",
  },

  profile_text2: {
    fontSize: 20,
  },
  logout: {
    backgroundColor: "red",
    fontSize: 20,
    fontWeight: "900",
    color: "white",
    padding: 10,
    margin: 20,
    borderRadius: 10,
  },
  inputCont: {
    borderRadius: 25,
    backgroundColor: "white",
    width: 340,
    height: 50,
    paddingHorizontal: 25,
    marginBottom: 20,
    fontSize: 15,
    marginHorizontal: 20,
    marginVertical: 5,
  },
});
export default ProfileScreen;
