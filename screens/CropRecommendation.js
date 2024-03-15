import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import Header from "../components/Header";
import { MaterialIcons } from '@expo/vector-icons';

const CropRecommendation = ({ navigation }) => {
  const [data, setData] = useState({
    "Nitogen Content of soil": "",
    "Phosphorus Content of soil": "",
    "Potassium Content of soil": "",
    "ph Value of soil": "",
  });
  const [seasonData, setSeasonsData] = useState("");
  const seasons = ["Summer", "Winter", "Monsoon", "Autumn"];
  const [predictedCrop, setPredictedCrop] = useState();
  const handlePredict = async () => {
    //Call GetPrediction

    setPredictedCrop({
      Name: "Wheat",
      Image_url:
        "https://assets.thehansindia.com/h-upload/2023/10/22/1391621-jagadish-reddy.webp",
    });
  };
  return (
    <View style={{ flex: 1, backgroundColor:"rgb(236,236,236)" }}>
      <Header screen="CROP RECOMMENDATION" navigation={navigation} />
      <ScrollView style={{marginBottom:10}}>
      <View style={style.cont1}>
      {Object.entries(data).map(([key, value]) => (
        <View key={key}>
          <TextInput
            onChangeText={(val) => setData({ ...data, [key]: val })}
            value={value}
            placeholder={key}
            keyboardType="numeric"
            style={style.inputCont}
          />
        </View>
      ))}
      <SelectDropdown
        data={seasons}
        defaultButtonText="Select Season"
        onSelect={(selectedItem, index) => {
          setSeasonsData(selectedItem);
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
        renderDropdownIcon={()=>(<MaterialIcons name="keyboard-arrow-down" size={24} color="black" />)}
        buttonStyle={style.inputCont}
        buttonTextStyle={{fontSize:18}}
      />
      <TouchableOpacity onPress={handlePredict} style={style.button}>
        <Text style={style.buttonText}>Predict</Text>
      </TouchableOpacity>
      <View>
      </View>
        {predictedCrop && (
          <View>
            <View style={style.cont2}>
            <Image
                source={require("./../assets/Recommendation.png")}
                style={{ width: 45, height: 45 }}
                resizeMode="contain"
              />
              <Text style={{fontSize:18, fontWeight:"600",marginLeft:10}}>Predicted Crop</Text>
            </View>
            <View style={{alignItems:"center"}}>
            <View>
              <Text style={{fontSize:22,fontWeight:"600"}}>{predictedCrop.Name}</Text>
            </View>
            <View>
              <Image
                source={{ uri: predictedCrop.Image_url }}
                style={{ width: 300, height: 280 }}
                resizeMode="cover"
              />
            </View>
            </View>
          </View>
        )}
      </View>
      </ScrollView>
    </View>
  );
};

export default CropRecommendation;

const style=StyleSheet.create({
  cont1:{
    width:"100%",
    flexDirection:"column",
    alignItems:"center",
    marginTop:20
  },
  inputCont:{
    borderRadius:25,
    backgroundColor:"white",
    width:300,
    height:50,
    paddingHorizontal:25,
    marginBottom:20,
    fontSize:15
  },
  button: {
    backgroundColor: "#43C89C",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 25,
    width: 300,
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 20,
    color: "#fff",
  },
  cont2:{
    borderRadius:15,
    backgroundColor:"white",
    width:350,
    height:50,
    paddingHorizontal:25,
    margin:20,
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"row"
  }
})