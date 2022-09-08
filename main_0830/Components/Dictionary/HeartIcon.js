import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Octicons } from "@expo/vector-icons";
import firebase from "../../firebase";

const db = firebase.firestore()

const HeartIcon = ({ item, currentUserEmail }) => {
  const [currentLikesStatus, setcurrentLikesStatus] = useState(
    !item.likesByUsers.includes(currentUserEmail)
  );
  const [currentLength, setCurrentLength] = useState(item.likesByUsers.length)

  const handleLike = () => {
    const update_dict = {};
    if (currentLikesStatus) {
      update_dict[`${item.soolName}.likesByUsers`] =
        firebase.firestore.FieldValue.arrayUnion(currentUserEmail);
        setCurrentLength(currentLength+1)
    } else {
      update_dict[`${item.soolName}.likesByUsers`] =
        firebase.firestore.FieldValue.arrayRemove(currentUserEmail);
        setCurrentLength(currentLength-1)
    }
    db.collection("global").doc("drinks").update(update_dict);
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
