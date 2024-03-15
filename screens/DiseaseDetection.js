import React, { useState } from 'react'
import { Alert, Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// import {launchCameraAsync} from "expo-image-picker"

const DiseaseDetection = () => {
  const [selectedImage,setSelectedImage]=useState();
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();

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

        setSelectedImage(uri);
    }
    } catch (e) {
      Alert.alert("Error Uploading Image " + e.message);
      console.log(e.message)
    }
  
  };

  const openImagePicker=async()=>{
    console.log("Hi")
    try{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    }
    catch(e)
    {
      console.log(e);
    }
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
     {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            style={{ flex: 1 }}
            resizeMode="contain"
          />
    )}
    <View style={{ marginTop: 20 }}>
      <Button title="Choose from Device" onPress={openImagePicker} />
    </View>
    <View style={{ marginTop: 20,marginBottom: 50 }}>
      <Button title="Open Camera" onPress={()=>{takePhoto()}} />
    </View>
  </View>
  );
};


export default DiseaseDetection