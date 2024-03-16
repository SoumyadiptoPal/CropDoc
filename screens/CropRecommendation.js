import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import Header from "../components/Header";
import { MaterialIcons } from "@expo/vector-icons";
import { useGlobalState } from "./../GlobalContextState";
import { languages } from "../languages";

const CropRecommendation = ({ navigation }) => {
  const [data, setData] = useState({
    "Nitogen Content of soil": "",
    "Phosphorus Content of soil": "",
    "Potassium Content of soil": "",
    "pH Value of soil": "",
  });
  const { state } = useGlobalState();
  const [seasonData, setSeasonsData] = useState("");
  const seasons = ["Summer", "Winter", "Monsoon", "Autumn"];
  const [predictedCrop, setPredictedCrop] = useState();
  const [isLoading,setIsLoading]=useState(false);
  const handlePredict = async () => {
    //Call GetPrediction
    setIsLoading(true);
    try {
      const body = {
        N: data["Nitogen Content of soil"],
        P: data["Phosphorus Content of soil"],
        K: data["Potassium Content of soil"],
        ph: data["pH Value of soil"],
        humidity: "74",
        temp: "25.6",
        rainfall: "104"
      };
      const response = await fetch('http://192.168.29.61:8082/recommend/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const responseData = await response.json();
      console.log(responseData)
      setPredictedCrop({
        Name: responseData["prediction"],
        Image_url:
          "https://assets.thehansindia.com/h-upload/2023/10/22/1391621-jagadish-reddy.webp",
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }

    
  };

  const getPlaceholder = (text) => {
    if (text === "Nitogen Content of soil")
      return languages[state.globalVariable].text13;
    else if (text === "Phosphorus Content of soil")
      return languages[state.globalVariable].text14;
    else if (text === "Potassium Content of soil")
      return languages[state.globalVariable].text15;
    else if (text === "pH Value of soil")
      return languages[state.globalVariable].text16;
  };
  return (
    <View style={{ flex: 1, backgroundColor: "rgb(236,236,236)" }}>
      <Header
        screen={languages[state.globalVariable].text51}
        navigation={navigation}
      />
      <ScrollView style={{ marginBottom: 10 }}>
        <View style={style.cont1}>
          {Object.entries(data).map(([key, value]) => (
            <View key={key}>
              <TextInput
                onChangeText={(val) => setData({ ...data, [key]: val })}
                value={value}
                placeholder={getPlaceholder(key)}
                keyboardType="numeric"
                style={style.inputCont}
              />
            </View>
          ))}
          <SelectDropdown
            data={seasons}
            defaultButtonText={languages[state.globalVariable].text17}
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
              if(item==="Summer")
              return languages[state.globalVariable].text18
              else if(item==="Winter")
              return languages[state.globalVariable].text19
              else if(item==="Monsoon")
              return languages[state.globalVariable].text20
              else if(item==="Autumn")
              return languages[state.globalVariable].text21
            }}
            dropdownIconPosition="right"
            renderDropdownIcon={() => (
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="black"
              />
            )}
            buttonStyle={style.inputCont}
            buttonTextStyle={{ fontSize: 18 }}
          />
          <TouchableOpacity onPress={handlePredict} style={style.button}>
            <Text style={style.buttonText}>{languages[state.globalVariable].text22}</Text>
          </TouchableOpacity>
          <View></View>
          {
            (!isLoading)?<>
            {predictedCrop && (
            <View>
              <View style={style.cont2}>
                <Image
                  source={require("./../assets/Recommendation.png")}
                  style={{ width: 45, height: 45 }}
                  resizeMode="contain"
                />
                <Text
                  style={{ fontSize: 18, fontWeight: "600", marginLeft: 10 }}
                >
                  {languages[state.globalVariable].text23}
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <View>
                  <Text style={{ fontSize: 22, fontWeight: "600" }}>
                    {predictedCrop.Name}
                  </Text>
                </View>
                {/* <View>
                  <Image
                    source={{ uri: predictedCrop.Image_url }}
                    style={{ width: 300, height: 280 }}
                    resizeMode="cover"
                  />
                </View> */}
              </View>
            </View>
          )}
            </>:<View>
              <ActivityIndicator size="large"/>
            </View>
          }
          
        </View>
      </ScrollView>
    </View>
  );
};

export default CropRecommendation;

const style = StyleSheet.create({
  cont1: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
  },
  inputCont: {
    borderRadius: 25,
    backgroundColor: "white",
    width: 300,
    height: 50,
    paddingHorizontal: 25,
    marginBottom: 20,
    fontSize: 15,
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
  cont2: {
    borderRadius: 15,
    backgroundColor: "white",
    width: 350,
    height: 50,
    paddingHorizontal: 25,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});
