import React, { useState } from "react";
import {
  Alert,
  Button,
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  ImageBackgroundBase,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Header from "../components/Header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const DiseaseDetection = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [disease, setDisease] = useState();
  const takePhoto = async () => {
    console.log("hello");
    try {
      const cameraResp = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });

      if (!cameraResp.canceled) {
        const { uri } = cameraResp.assets[0];

        makePrediction(uri);
        setSelectedImage(uri);
      }
    } catch (e) {
      Alert.alert("Error Uploading Image " + e.message);
      console.log(e.message);
    }
  };

  const openImagePicker = async () => {
    console.log("Hi");
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        makePrediction(result.assets[0].uri);
        setSelectedImage(result.assets[0].uri);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const makePrediction = (uri) => {
    //fetch prediction from API
    setDisease({
      Name: "Apple_Rot",
      Solution1: "Remove and Burn infected plant parts",
      Solution2:
        "Spray weekly with copper fungicide and Bordeaux mixture starting in late October. You can also use a general purpose fruit spray, which often contains caftan, methoxychlor, and malathion or carbaryl",
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Header screen="DISEASE IDENTIFICATION" navigation={navigation} />
      <ScrollView style={style.cont1}>
        <View style={style.cont2}>
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={style.imageCont}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require("./../assets/icon.png")}
              style={style.imageCont}
              resizeMode="contain"
            />
          )}
        </View>
        <View style={style.cont3}>
          <TouchableOpacity
            style={{ padding: 10 }}
            onPress={() => {
              takePhoto();
            }}
          >
            <MaterialCommunityIcons
              name="camera-plus-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10 }} onPress={openImagePicker}>
            <MaterialIcons name="add-photo-alternate" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={style.cont2}>
          {disease && (
            <View style={style.cont4}>
              <ImageBackground
                source={require("../assets/gradient.png")}
                resizeMode="cover"
                style={{
                  justifyContent: "center",
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                <View style={{ alignItems: "center", paddingTop: 10 }}>
                  <Text style={[style.text1, { paddingBottom: 10 }]}>
                    {disease.Name}
                  </Text>
                  <Text style={style.text1}>Solution</Text>
                </View>
                <Text style={style.text2}>
                  <Entypo name="dot-single" size={24} color="black" />
                  {disease.Solution1}
                </Text>
                <Text style={style.text2}>
                  <Entypo name="dot-single" size={24} color="black" />
                  {disease.Solution2}
                </Text>
              </ImageBackground>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default DiseaseDetection;

const style = StyleSheet.create({
  cont1: {
    backgroundColor: "rgb(236,236,236)",
  },
  cont2: {
    width: "100%",
    alignItems: "center",
    padding: 30,
  },
  imageCont: {
    width: 300,
    height: 300,
    borderWidth: 5,
    borderColor: "#0250a3",
  },
  cont3: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: "30%",
  },
  cont4: {
    width: "90%",
    borderRadius: 5,
    height: "auto",
  },
  text1: {
    fontSize: 22,
    fontWeight: "600",
  },
  text2: {
    fontSize: 17,
    fontWeight: "400",
    padding: 5,
  },
});
