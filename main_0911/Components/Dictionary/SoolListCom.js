import {
  Text,
  Pressable,
  Image,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import React from "react";
import image0 from "../../assets/soolType/0.jpg"
import image1 from "../../assets/soolType/1.jpg"
import image2 from "../../assets/soolType/2.jpg"
import image3 from "../../assets/soolType/3.jpg"
import image4 from "../../assets/soolType/4.jpg"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const window = Dimensions.get("window");

const imageArray = {
  '0': image0,
  '1': image1,
  '2': image2,
  '3': image3,
  '4': image4,
}
const SoolListCom = ({ item, index, navigation }) => {

  return (
    <Pressable
      style={styles.listContainer}
      onPress={() =>
        navigation.push("DictionaryDetailScreen", { id: index, item: item })
      }
    >
      {item.typeCode === 'undefined' ? null : (
        <Image style={styles.img} source={imageArray[`${item.typeCode}`]} />
      )}
      <View style={{ justifyContent: "space-evenly" }}>
        <Text style={styles.name}>{item.soolName}</Text>
        <Text style={styles.text}>
          지역 :{" "}
          {item.breweryAddress === ' None ' || item.breweryAddress === undefined ?
          "정보없음"
          :
          item.breweryAddress.substr(
            0,
            item.breweryAddress.indexOf(

              " ",
              item.breweryAddress.indexOf(" ") + 1
            )
          )}
        </Text>
        <Text style={styles.text}>도수 :{item.soolAlcohol}</Text>
        <Text style={styles.text}>분류 : {item.soolType}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: "row",
    alignItems:'center',
    backgroundColor: "white",
  },
  img: {
    width: Dimensions.get("window").width / 5,
    height: Dimensions.get("window").width / 5,
    resizeMode: "contain",
    borderColor: "#C0E8E0",
    borderRadius: 20,
    marginRight: Dimensions.get("window").width / 27,
    borderWidth: 1,
    marginTop: Dimensions.get("window").width / 30,
    marginBottom: Dimensions.get("window").width / 30,
  },
  name: {
    color: "black",
    fontSize: RFPercentage(1.96),
    fontWeight: "600",
    marginBottom: 3,
    marginTop: 3,
  },
  text: {
    color: "black",
    fontSize: RFPercentage(1.73),
    marginBottom: 1,
  },
});

export default SoolListCom;
