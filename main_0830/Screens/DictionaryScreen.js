import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import BookmarkIcon from "../Components/Dictionary/BookmarkIcon";
import HeartIcon from "../Components/Dictionary/HeartIcon";

const db = firebase.firestore();

export default function DictionaryScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [sulList, setSulList] = useState([]);
  const sulCollection = firebase.firestore().collection("global");
  const currentUserEmail = firebase.auth().currentUser.email;

  const getSoolDocs = async () => {
    const dataSnapShot = (await sulCollection.doc("drinks").get()).data();
    const data = [];
    data.push(Object.values(dataSnapShot));
    setSulList(data[0]);
    setLoading(true)
  };

  useEffect(() => {
    getSoolDocs();
  }, []);

  const renderListItem = ({ item, index }) => {
    return (
      <View style={styles.flatlistcontainer}>
        <Pressable
          style={styles.listContainer}
          onPress={() =>
            navigation.push("DictionaryDetailScreen", { id: index, item: item })
          }
        >
          <Image style={styles.img} source={{ uri: item.img }} />
          <View style={styles.textcontainer}>
            <Text style={styles.name}>{item.soolName}</Text>
            {/* <Text style={styles.text}>
              지역 :{" "}
              {item.breweryAddress.substr(
                0,
                item.breweryAddress.indexOf(" ", item.breweryAddress.indexOf(" ") + 1)
              )}
            </Text> */}
            <Text style={styles.text}>도수 :{item.soolAlcohol}</Text>
            <Text style={styles.text}>분류 : {item.soolType}</Text>
          </View>
        </Pressable>
        <View style={styles.iconcontainer}>
          <HeartIcon item={item} currentUserEmail={currentUserEmail}/>
          <BookmarkIcon item={item} currentUserEmail={currentUserEmail}/>
        </View>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{ height: 0.5, width: "100%", backgroundColor: "#c8c8c8" }}
      />
    );
  };

  return (
    <View style={styles.container}>
      {loading === false ? (
        <View style={styles.loading}>
          <ActivityIndicator
            color="#C0E8E0"
            style={{ marginTop: 10, opacity:0.5 }}
            size="large"
          />
        </View>
      ) : (
        <FlatList
          data={sulList}
          renderItem={renderListItem}
          ItemSeparatorComponent={ItemSeparatorView}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  flatlistcontainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: Dimensions.get("window").width - 20,
    height: (Dimensions.get("window").width - 20) / 4,
    padding: 8,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    flexDirection: "row",
    color: "grey",
    backgroundColor: "white",
  },
  img: {
    width: Dimensions.get("window").width / 5,
    height: Dimensions.get("window").width / 5,
    resizeMode: "contain",
    borderColor: "#C0E8E0",
    borderRadius: 20,
    marginRight: 20,
    borderWidth: 1,
  },
  textcontainer: {
    // flex: 1,
  },
  name: {
    color: "black",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 3,
    marginTop: 3,
  },
  text: {
    color: "black",
    fontSize: 15,
    marginBottom: 1,
  },
  iconcontainer: {
    marginTop: 4,
    alignItems: "center",
  },
});
