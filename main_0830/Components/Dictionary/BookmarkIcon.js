import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Octicons } from "@expo/vector-icons";
import firebase from "../../firebase";

const db = firebase.firestore()

const BookmarkIcon = ({ item, currentUserEmail }) => {
  const [currentBookmarkStatus, setcurrentBookmarkStatus] = useState(
    !item.bookmarksByUsers.includes(currentUserEmail)
  );
  const [currentLength, setCurrentLength] = useState(item.bookmarksByUsers.length);

  const handleLike = () => {
    const update_dict = {};
    const update_mine = {}
    if (currentBookmarkStatus) {
      update_dict[`${item.soolName}.bookmarksByUsers`] =
        firebase.firestore.FieldValue.arrayUnion(currentUserEmail);
      setCurrentLength(currentLength + 1);
      update_mine["myDrinks"] = firebase.firestore.FieldValue.arrayUnion(
        item.name
      );
    } else {
      update_dict[`${item.soolName}.bookmarksByUsers`] =
        firebase.firestore.FieldValue.arrayRemove(currentUserEmail);
        update_mine["myDrinks"] = firebase.firestore.FieldValue.arrayRemove(
          item.name
        );
      setCurrentLength(currentLength - 1);
    }
    db.collection('users').doc(currentUserEmail).update(update_mine)
    setcurrentBookmarkStatus(!currentBookmarkStatus);
    db.collection("global").doc("drinks").update(update_dict);
  };

  return (
    <TouchableOpacity
      style={{ marginBottom: 2 }}
      onPress={handleLike}
      onchange={handleLike}
    >
      {currentBookmarkStatus ? (
        <Octicons name="star" size={27} color="gray" />
      ) : (
        <Octicons name="star-fill" size={27} color="gray" />
      )}
      <Text>{currentLength.toString()}</Text>
    </TouchableOpacity>
  );
};

export default BookmarkIcon;
