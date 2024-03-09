import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const Home = ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          navigation.navigate("DiseaseDetection");
        }}
      >
        <Text>Disease Detection</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          navigation.navigate("CropRecommendation");
        }}
      >
        <Text>Crop Recommendation</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          navigation.navigate("NewsScreen");
        }}
      >
        <Text>Agri News</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          navigation.navigate("DashBoard");
        }}
      >
        <Text>DashBoard</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = new StyleSheet.create({
  container: {
    width: "90%",
    padding: 20,
    margin: 20,
    borderWidth: 5,
  },
});

export default Home;
