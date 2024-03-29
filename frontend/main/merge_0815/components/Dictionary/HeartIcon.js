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
import { Octicons } from "@expo/vector-icons";
import firebase from "../../firebase";

const db = firebase.firestore();

const HeartIcon = ({ item, currentUserEmail }) => {
  const [currentLikesStatus, setcurrentLikesStatus] = useState(
    !item.likesByUsers.includes(currentUserEmail)
  );
  const [currentLength, setCurrentLength] = useState(item.likesByUsers.length);

  const handleLike = () => {
    const update_dict = {};
    const update_mine = {};
    if (currentLikesStatus) {
      update_dict[`${item.name}.likesByUsers`] =
        firebase.firestore.FieldValue.arrayUnion(currentUserEmail);
      update_mine["myLikesDrinks"] = firebase.firestore.FieldValue.arrayUnion(
        item.name
      );
      setCurrentLength(currentLength + 1);
    } else {
      update_dict[`${item.name}.likesByUsers`] =
        firebase.firestore.FieldValue.arrayRemove(currentUserEmail);
      update_mine["myLikesDrinks"] = firebase.firestore.FieldValue.arrayRemove(
        item.name
      );
      setCurrentLength(currentLength - 1);
    }
    db.collection("global").doc("drinks").update(update_dict);
    db.collection('users').doc(currentUserEmail).update(update_mine)
    setcurrentLikesStatus(!currentLikesStatus);
  };
  return (
    <TouchableOpacity onPress={handleLike}>
      {currentLikesStatus ? (
        <Octicons name="heart" size={27} color="gray" />
      ) : (
        <Octicons name="heart-fill" size={27} color="gray" />
      )}
      <Text>{currentLength.toString()}</Text>
    </TouchableOpacity>
  );
};

export default HeartIcon;
