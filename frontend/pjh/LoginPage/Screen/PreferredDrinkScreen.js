import { View, Text } from "react-native";
import React from "react";
import PreferredDrink from "../Component/PreferredDrink";

const PreferredDrinkScreen = ({ navigation }) => {
  return (
    <View>
      <PreferredDrink navigation={navigation} />
    </View>
  );
};

export default PreferredDrinkScreen;