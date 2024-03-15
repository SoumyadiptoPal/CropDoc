import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { useGlobalState } from "./../GlobalContextState";
import { languages } from "../languages";

const DashBoard = ({ navigation }) => {
  const { state } = useGlobalState();
  const [lists, setLists] = useState();
  const [newList, setNewList] = useState({
    id: 0,
    Title: "",
    Number: "",
    Planting_date: "",
    weeks_to_harvest: "",
  });
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const jsonData = await AsyncStorage.getItem("@cropdoc_data");
      if (jsonData !== null) {
        setLists(JSON.parse(jsonData));
      }
    };
    fetchData();
  }, []);

  const addLists = async () => {
    let n = 0;
    if (lists && lists.length > 0) n = lists[lists.length - 1].id;
    let data = lists;
    let obj = newList;
    obj.id = n + 1;
    if (data) data = [...data, obj];
    else data = [obj];
    setLists(data);
    await AsyncStorage.setItem("@cropdoc_data", JSON.stringify(data));
    console.log(data);
    handleCloseModal();
  };
  const deleteLists = (idToDelete) => {
    let data = lists;
    data = data.filter((item) => item.id !== idToDelete);
    AsyncStorage.setItem("@cropdoc_data", JSON.stringify(data));
    setLists(data);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
    setNewList({
      id: 0,
      Title: "",
      Number: "",
      Planting_date: "",
      weeks_to_harvest: "",
    });
  };
  return (
    <View style={{ flex: 1, backgroundColor: "rgb(236,236,236)" }}>
      <Header screen={languages[state.globalVariable].text25} navigation={navigation} />
      <ScrollView>
        {lists ? (
          <>
            {lists.map((item, index) => (
              <ListItem
                data={item}
                key={index}
                deleteLists={deleteLists}
                navigation={navigation}
              />
            ))}
          </>
        ) : (
          <Text>{languages[state.globalVariable].text52}</Text>
        )}
        <Text>{}</Text>
      </ScrollView>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.cont2}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={styles.buttonText}
          >
            {languages[state.globalVariable].text26}
          </Text>
          <AntDesign name="plus" size={24} color="white" />
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          handleCloseModal();
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ fontSize: 20, fontWeight: "800" }}>
            {languages[state.globalVariable].text27}
            </Text>
            <TextInput
              placeholder={languages[state.globalVariable].text28}
              placeholderTextColor="#444"
              autoCapitalize="none"
              onChangeText={(text) => {
                setNewList({ ...newList, Title: text });
              }}
              value={newList.Title}
              style={styles.inputCont}
            />
            <TextInput
              placeholder={languages[state.globalVariable].text29}
              placeholderTextColor="#444"
              autoCapitalize="none"
              keyboardType="numeric"
              onChangeText={(text) => {
                setNewList({ ...newList, Number: text });
              }}
              value={newList.Number}
              style={styles.inputCont}
            />
            <TextInput
              placeholder={languages[state.globalVariable].text30}
              placeholderTextColor="#444"
              autoCapitalize="none"
              keyboardType="numeric"
              onChangeText={(text) => {
                setNewList({ ...newList, Planting_date: text });
              }}
              value={newList.Planting_date}
              style={styles.inputCont}
            />
            <TextInput
              placeholder={languages[state.globalVariable].text31}
              placeholderTextColor="#444"
              autoCapitalize="none"
              onChangeText={(text) => {
                setNewList({ ...newList, weeks_to_harvest: text });
              }}
              value={newList.weeks_to_harvest}
              style={styles.inputCont}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={handleCloseModal}
                style={[styles.button,{backgroundColor:"grey"}]}
              >
                <Text style={styles.buttonText}>{languages[state.globalVariable].text32}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={addLists} style={[styles.button,{backgroundColor:"#43C89C"}]}>
                <Text style={styles.buttonText}>{languages[state.globalVariable].text26}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const ListItem = ({ data, deleteLists, navigation }) => {
  const { state } = useGlobalState();
  const handleNavigate = () => {
    navigation.push("ListScreen", { itemData: data });
  };
  return (
    <TouchableOpacity onPress={handleNavigate}>
      <View style={styles.cont1} elevation={5}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 5,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "700" }}>{data.Title}</Text>
          <TouchableOpacity onPress={() => deleteLists(data.id)}>
            <Text>
              <AntDesign name="delete" size={24} color="red" />
            </Text>
          </TouchableOpacity>
        </View>
        <Text>{languages[state.globalVariable].text29}:{data.Number}</Text>
        <Text>{languages[state.globalVariable].text30}:{data.Planting_date}</Text>
        <Text>{languages[state.globalVariable].text31}:{data.weeks_to_harvest}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default DashBoard;

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "relative",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cont1: {
    backgroundColor: "white",
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  cont2: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#43C89C",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  inputCont: {
    width: 300,
    backgroundColor: "rgb(236,236,236)",
    height: "auto",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    fontSize: 17,
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginRight: 15,
    borderRadius:8
  },
  buttonText:{
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginRight: 5,
  }
});
