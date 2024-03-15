import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";
import { AntDesign } from "@expo/vector-icons";

const ListScreen = ({ navigation, route }) => {
  const [item, setItem] = useState(route.params.itemData);
  const [lists, setLists] = useState(item.checklists);
  const [openModal, setOpenModal] = useState(false);
  const [newList, setNewList] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      let jsonData = await AsyncStorage.getItem("@cropdoc_data");
      let data = JSON.parse(jsonData);
      const index = findIndexOfItem(item.id, data);
      let listArr = data[index].checklists;
      setLists(listArr);
    };
    fetchData();
  }, []);

  const addLists = async () => {
    let listData = lists;
    if (listData) {
      listData = [...listData, newList];
    } else {
      listData = [newList];
    }

    setLists(listData);
    let itemData = item;
    itemData.checklists = listData;
    console.log(itemData);
    setItem(itemData);
    let jsonData = await AsyncStorage.getItem("@cropdoc_data");
    let data = JSON.parse(jsonData);
    const index = findIndexOfItem(item.id, data);
    data[index] = itemData;
    await AsyncStorage.setItem("@cropdoc_data", JSON.stringify(data));
    handleCloseModal();
    console.log(listData);
  };
  const findIndexOfItem = (id, data) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) return i;
    }
    return -1;
  };
  const deleteLists = async (idToDelete) => {
    let jsonData = await AsyncStorage.getItem("@cropdoc_data");
    let data = JSON.parse(jsonData);
    const index = findIndexOfItem(item.id, data);
    let listArr = data[index].checklists;
    console.log(listArr, idToDelete);

    listArr.splice(idToDelete, 1);
    data[index].checklists = listArr;
    setLists(listArr);
    setItem(data[index]);
    console.log("jj", data[index]);
    AsyncStorage.setItem("@cropdoc_data", JSON.stringify(data));
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setNewList({
      title: "",
      description: "",
    });
  };
  return (
    <View style={{ flex: 1, backgroundColor: "rgb(236,236,236)" }}>
      <Header screen={item.Title} navigation={navigation} />
      <View style={styles.cont3}>
        <Text>Number of plantations:{item.Number}</Text>
        <Text>Plantation date:{item.Planting_date}</Text>
        <Text>Weeks to harvest:{item.weeks_to_harvest}</Text>
      </View>
      <Text style={{fontSize:18, fontWeight:"700",marginLeft:15,marginTop:15}}>
        Your Lists
      </Text>
      <ScrollView>
        {lists && lists.length > 0 ? (
          lists.map((data, index) => (
            <ListItem
              data={data}
              key={index}
              id={index}
              deleteLists={deleteLists}
            />
          ))
        ) : (
          <Text>Nothing to display</Text>
        )}
        <Text></Text>
      </ScrollView>
      <TouchableOpacity onPress={() => setOpenModal(true)} style={styles.cont2}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.buttonText}>Add</Text>
          <AntDesign name="plus" size={24} color="white" />
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        onRequestClose={() => {
          handleCloseModal();
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={{ fontSize: 20, fontWeight: "800" }}>
              Create New Entry
            </Text>
            <TextInput
              placeholder="Title"
              placeholderTextColor="#444"
              autoCapitalize="none"
              onChangeText={(text) => {
                setNewList({ ...newList, title: text });
              }}
              value={newList.title}
              style={styles.inputCont}
            />
            <TextInput
              placeholder="Description"
              placeholderTextColor="#444"
              autoCapitalize="none"
              onChangeText={(text) => {
                setNewList({ ...newList, description: text });
              }}
              value={newList.description}
              style={styles.inputCont}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={handleCloseModal} style={[styles.button,{backgroundColor:"grey"}]}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={addLists} style={[styles.button,{backgroundColor:"#43C89C"}]}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const ListItem = ({ data, deleteLists, id }) => {
  return (
    <View style={styles.cont1} elevation={5}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "700" }}>{data.title}</Text>
        <TouchableOpacity
          onPress={() => {
            deleteLists(id);
          }}
        >
          <Text>
            <AntDesign name="delete" size={24} color="red" />
          </Text>
        </TouchableOpacity>
      </View>
      <Text>{data.description}</Text>
    </View>
  );
};
export default ListScreen;

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
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginRight: 5,
  },
  cont3:{
    padding:15,
    paddingBottom:0
  }
});
