import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useGlobalState } from './../GlobalContextState';
import { languages } from "../languages";
const Home = ({ navigation }) => {
  const { state } = useGlobalState();
  return (
    <View style={styles.cont1}>
      <Text style={styles.text1}>{languages[state.globalVariable].text2}</Text>
      <TouchableOpacity
        style={{ width: "100%" }}
        onPress={() => {
          navigation.navigate("DiseaseDetection");
        }}
      >
        <View style={styles.container} elevation={5}>
          <View>
            <Image
              source={require("../assets/disease.png")}
              style={{ width: 90, height: 90 }}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexGrow: 2,
            }}
          >
            <Text style={styles.text2}>{languages[state.globalVariable].text3}</Text>
            <Text style={styles.text2}>{languages[state.globalVariable].text4}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ width: "100%" }}
        onPress={() => {
          navigation.navigate("CropRecommendation");
        }}
      >
        <View style={styles.container} elevation={5}>
          <View>
            <Image
              source={require("../assets/Recommendation.png")}
              style={{ width: 90, height: 90 }}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexGrow: 2,
            }}
          >
            <Text style={styles.text2}>{languages[state.globalVariable].text5}</Text>
            <Text style={styles.text2}>{languages[state.globalVariable].text6}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ width: "100%" }}
        onPress={() => {
          navigation.navigate("NewsScreen");
        }}
      >
        <View style={styles.container} elevation={5}>
          <View>
            <Image
              source={require("../assets/News.png")}
              style={{ width: 90, height: 90 }}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexGrow: 2,
            }}
          >
            <Text style={styles.text2}>{languages[state.globalVariable].text7}</Text>
            <Text style={styles.text2}>{languages[state.globalVariable].text8}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ width: "100%" }}
        onPress={() => {
          navigation.navigate("DashBoard");
        }}
      >
        <View style={styles.container} elevation={5}>
          <View>
            <Image
              source={require("../assets/Dashboard.png")}
              style={{ width: 90, height: 90 }}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexGrow: 2,
            }}
          >
            <Text style={styles.text2}>{languages[state.globalVariable].text9}</Text>
            <Text style={styles.text2}>{languages[state.globalVariable].text10}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = new StyleSheet.create({
  cont1: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgb(236,236,236)",
  },
  container: {
    width: "90%",
    padding: 20,
    margin: 20,
    marginBottom: 0,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
  },
  text1: {
    marginTop: 20,
    fontWeight: "600",
    fontSize: 22,
  },
  text2: {
    fontSize: 25,
    fontWeight: "600",
  },
});

export default Home;
