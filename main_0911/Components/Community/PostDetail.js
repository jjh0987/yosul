import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  NativeModules,
  FlatList,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import firebase from "../../firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const db = firebase.firestore();
const window = Dimensions.get("window");
const width = window.width * 0.49;
const height = window.width * 0.49 * 1.41;

const PostDetail = ({ route, navigation }) => {
  const post = route.params.item;
  const currentUserEmail = firebase.auth().currentUser.email;
  const [deleteStatus, setDeleteStatus] = useState(
    post.owner_email === currentUserEmail
  );
  const [currentLikeStatus, setLikesStatus] = useState(
    !post.likes_by_users.includes(currentUserEmail)
  );
  const [currentBookmarksStatus, setBookmarkStatus] = useState(
    !post.bookmarks_by_users.includes(currentUserEmail)
  );
  const [comments, setcomments] = useState([
    { comment_nickname: "", comment_profile_picture: "", comment: "" },
  ]);

  useEffect(() => {
    setcomments(post.comments);
  }, []);

  console.log(comments);

  const SetCommentSchema = Yup.object().shape({
    comment: Yup.string().required("댓글을 입력해주세요"),
  });

  const likesHandleLike = async (post, currentLikeStatus, currentUserEmail) => {
    const myLikePost = {};
    myLikePost[post.owner_email] = post.id;

    db.collection("users")
      .doc(post.owner_email)
      .collection("posts")
      .doc(post.id)
      .update({
        likes_by_users: currentLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(currentUserEmail)
          : firebase.firestore.FieldValue.arrayRemove(currentUserEmail),
      })
      .catch((error) => {
        console.log("Error updating document", error);
      });

    await db
      .collection("users")
      .doc(currentUserEmail)
      .update({
        myLikesPosts: currentLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(myLikePost)
          : firebase.firestore.FieldValue.arrayRemove(myLikePost),
        notification: currentLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(myLikePost)
          : firebase.firestore.FieldValue.arrayRemove(myLikePost),
      });
    setLikesStatus(!currentLikeStatus);
  };

  const bookmarkHandleLike = async (
    post,
    currentBookmarksStatus,
    currentUserEmail
  ) => {
    const myBookmarkPost = {};
    myBookmarkPost[post.owner_email] = post.id;

    if (currentUserEmail === post.owner_email) {
      Alert.alert("오류", "내 글은 저장할 수 없습니다.");
      return;
    }
    db.collection("users")
      .doc(post.owner_email)
      .collection("posts")
      .doc(post.id)
      .update({
        bookmarks_by_users: currentBookmarksStatus
          ? firebase.firestore.FieldValue.arrayUnion(currentUserEmail)
          : firebase.firestore.FieldValue.arrayRemove(currentUserEmail),
      })
      .catch((error) => {
        console.log("Error updating document", error);
      });

    await db
      .collection("users")
      .doc(currentUserEmail)
      .update({
        myBookmarksPosts: currentBookmarksStatus
          ? firebase.firestore.FieldValue.arrayUnion(myBookmarkPost)
          : firebase.firestore.FieldValue.arrayRemove(myBookmarkPost),
      });
    setBookmarkStatus(!currentBookmarksStatus);
  };

  const uploadComment = async (post, comment, comments, currentUserEmail) => {
    console.log("왜안되");
    const user = (
      await db.collection("users").doc(currentUserEmail).get()
    ).data();
    const update = {
      comment_nickname: user.nickname,
      comment_profile_picture: user.profile_picture,
      comment: comment,
    };

    await db
      .collection("users")
      .doc(post.owner_email)
      .collection("posts")
      .doc(post.id)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion(update),
      });
    console.log(update);
    const newcomments = [...comments, update];

    console.log(newcomments);
    setcomments(newcomments);
  };

  return (
    <Formik
      initialValues={{
        comment: "",
      }}
      onSubmit={(values) => {
        console.log(values.comment);
        uploadComment(post, values.comment, comments, currentUserEmail);
        console.log("들어갔다", values);
      }}
      validationSchema={SetCommentSchema}
      validateOnMount={true}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={{ flex: 1 }}>
            <KeyboardAwareScrollView style={styles.postContainer}>
              <View
                style={{
                  backgroundColor: "white",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 5,
                  height: window.width * 0.12,
                }}
              >
                <PostHeader post={post} />
                <View style={{ flexDirection: "row" }}>
                  <PostDate post={post} />
                  {deleteStatus ? (
                    <PostDelete post={post} navigation={navigation} />
                  ) : (
                    <></>
                  )}
                </View>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#c0e8e0",
                }}
              >
                <Image
                  style={{
                    alignItems: "center",
                    width: window.width * 0.87,
                    height: window.width * 0.87 * 1.41,
                    resizeMode: "cover",
                  }}
                  source={{ uri: post.imageArray[0] }}
                />
              </View>

              {/* <PostImage post={post} /> */}
              <View //
                style={{
                  marginTop: width * 0.05,
                  height: window.width * 0.1,
                  marginLeft: window.width * 0.03,
                }}
              >
                <KeyboardAwareScrollView
                  horizontal={true}
                  pagingEnabled={false}
                  showsHorizontalScrollIndicator={false}
                >
                  <PostTag post={post} />
                </KeyboardAwareScrollView>
              </View>
              <View
                style={{
                  marginLeft: window.width * 0.005,
                  marginTop: width * 0.015,
                }}
              >
                <View style={{ marginBottom: width * 0.1 }}>
                  <LikesOthers post={post} />

                  <PostCaption post={post} />
                </View>

                <PostComments comments={comments} />
              </View>

              <View style={styles.postOptionsContainer}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "white",
                    width: window.width * 0.7,
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      likesHandleLike(post, currentLikeStatus, currentUserEmail)
                    }
                  >
                    <HeartIcon currentLikeStatus={currentLikeStatus} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      bookmarkHandleLike(
                        post,
                        currentBookmarksStatus,
                        currentUserEmail
                      )
                    }
                  >
                    <BookmarkIcon
                      currentBookmarksStatus={currentBookmarksStatus}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ marginTop: width * 0.1 }}></View>
              {/* 좋아요 수 */}
              {/* 댓글 */}
              {/* 시간 */}
              <View
                style={{
                  flex: 0.1,
                  backgroundColor: "white",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 20,
                    width: window.width * 0.976,
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      width: window.width * 0.13,
                      alignItems: "flex-end",
                    }}
                  >
                    <Image
                      source={{ uri: post.profile_picture }}
                      style={{
                        width: window.width * 0.1,
                        height: window.width * 0.1,
                        borderRadius: 50,
                        padding: 5,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: 10,
                      width: window.width * 0.82,
                      height: window.width * 0.1,
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderColor: "#c0e8e0",
                      borderWidth: 1,
                      // backgroundColor: "blue",
                    }}
                  >
                    <TextInput
                      style={{ paddingLeft: 10 }}
                      placeholderTextColor="#444"
                      placeholder="댓글을 입력해주세요."
                      autoCapitalize="none"
                      autoCorrect={false}
                      onChangeText={handleChange("comment")}
                      onBlur={handleBlur("comment")}
                      value={values.comment}
                    />
                    <View
                      style={{
                        width: window.width * 0.13,
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity
                        style={styles.buttonDesign}
                        onPress={handleSubmit}
                      >
                        <Text
                          style={{
                            fontSize: 10,
                          }}
                        >
                          추가
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </KeyboardAwareScrollView>
          </View>
        </View>
      )}
    </Formik>
  );
};

const PostHeader = ({ post }) => (
  <View style={styles.postUserData}>
    <TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: post.profile_picture }}
          style={{ width: 35, height: 35 }}
          borderRadius={50}
        />
        <Text style={{ fontSize: 14, fontWeight: "600", marginLeft: 10 }}>
          {post.nickname}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

const PostDate = ({ post }) => {
  const date = new Date(post.createdAt.seconds * 1000);
  return (
    <Text
      style={{
        fontSize: width * 0.07,
        color: "#777",
        fontWeight: "500",
        marginLeft: 15,
        marginTop: 5,
        marginRight: 10,
      }}
    >
      {date.getMonth()+1}.{date.getDate()}
    </Text>
  );
};

const PostDelete = ({ post, navigation }) => {
  const deletePost = {};
  deletePost[post.owner_email] = post.id;
  const postId = post.id
  const postEamil = post.owner_email
  return (
    <Pressable
      style={{ marginRight: 5 }}
      onPress={() => {
        Alert.alert("삭제", "정말 이 게시물을 삭제하시겠습니까?", [
          // 버튼 배열
          {
            text: "아니요",
            style: "cancel",
          },
          {
            text: "네",
            onPress: async () => {
              db.collection("users")
              .onSnapshot((snapshot) => {
                snapshot.docs.map((userInfo) =>
                userInfo.data().myBookmarksPosts.includes({ deletePost })
                ? userInfo
                .update(
                  firebase.firestore.FieldValue.arrayRemove(
                    deletePost
                    )
                    )
                    
                    : console.log(deletePost)
                    );
                  });
              await db.collection('users').doc(postEamil).collection('posts').doc(postId).delete().then(() => navigation.goBack());
            },
          },
        ]);
      }}
    >
      <Text>...</Text>
    </Pressable>
  );
};

// const PostImage = ({ post }) => {
//   return (
//     <View
//     // style={{ width: width, height: height }}
//     >
//       <Text>플랫리스트</Text>
//       <FlatList
//         data={post.imageArray}
//         horizontal={true}
//         keyExtractor={(_, index) => index.toString()}
//         // showsHorizontalScrollIndicator={false}
//         pagingEnabled={true}
//         renderItem={({ item, index }) => {
//           return (
//             <View key={index}>
//               <Image
//                 source={{ uri: item }}
//                 style={{
//                   resizeMode: "contain",
//                   width: "100%",
//                   height: "100%",
//                 }}
//               />
//             </View>
//           );
//         }}
//       />
//       <Text>플랫리스트</Text>
//     </View>
//   );
// };

const LikesOthers = ({ post }) => (
  <TouchableOpacity style={styles.likesViewContainer}>
    <Text style={{ fontSize: 14 }}>
      {post.likes_by_users.length}명이 게시글을 좋아합니다{" "}
    </Text>
    {post.likes_by_users[0] > 0 ? (
      <Text style={{ fontWeight: "700" }}>
        {post.likes_by_users[0]} 외 {post.likes_by_users.length - 1}명
      </Text>
    ) : (
      <></>
    )}
  </TouchableOpacity>
);

const PostCaption = ({ post }) => (
  <View style={{ marginLeft: 9, marginTop: window.width * 0.03 }}>
    <Text>
      <Text style={{ fontWeight: "bold" }}>{post.nickname} </Text>
      <Text>{post.caption}</Text>
    </Text>
  </View>
);

const PostComments = ({ comments }) => (
  <View style={styles.commentsContainer}>
    {comments.map((comment) => {
      return (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Image
            source={{ uri: comment.comment_profile_picture }}
            style={{ width: 20, height: 20, marginRight: 11 }}
            borderRadius={50}
          />
          <Text style={{ fontWeight: "700" }}>{comment.comment_nickname}</Text>
          <Text style={{ marginLeft: 8 }}>{comment.comment}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const PostTag = ({ post }) => (
  <View
    style={{
      flexDirection: "row",
      marginTop: 2,
      marginLeft: 10,
      width: window.width,
      alignItems: "center",
    }}
  >
    {post.tags.map((tag, index) => (
      <View
        key={index}
        style={{
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ color: "black" }}>
            <Text
              style={{
                backgroundColor: "#c0e8e0",
                flex: 1,
                fontSize: window.width * 0.04,
              }}
            >
              {"#"}
              {tag}
            </Text>
            {"  "}
          </Text>
        </View>
      </View>
    ))}
  </View>
);

const HeartIcon = ({ currentLikeStatus }) => (
  <View style={styles.box}>
    {currentLikeStatus ? (
      <AntDesign name={"hearto"} size={20} />
    ) : (
      <AntDesign name={"heart"} size={20} color="red" />
    )}
    <Text style={{ color: "black", fontWeight: "350" }}>
      {/* {post.likes_by_users.length.toLocaleString("en")} */}
      좋아요
    </Text>
  </View>
);

const BookmarkIcon = ({ currentBookmarksStatus }) => (
  <View style={styles.box}>
    {currentBookmarksStatus ? (
      <FontAwesome name="bookmark-o" size={20} color="black" />
    ) : (
      <FontAwesome name="bookmark" size={20} color="yellow" />
    )}
    <Text style={{ color: "black", fontWeight: "350" }}>
      {/* {post.bookmarks_by_users.length.toLocaleString("en")} */}
      저장하기
    </Text>
  </View>
);

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  postUserData: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    height: width * 0.12,
  },
  postOptionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: width * 0.2,
    marginHorizontal: 10,
  },
  likesViewContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 10,
  },
  likesPic: {
    width: 20,
    height: 20,
    marginLeft: 0,
    borderWidth: 1,
    borderColor: "white",
  },
  commentsContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 15,
    marginTop: 4,
    marginBottom: 30,
  },
  buttonDesign: {
    borderRadius: 20,
    backgroundColor: "#c0e8e0",
    width: 40,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    flexDirection: "row",
    flex: 1,
    // marginRight: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#C0E8E0",
    width: window.width * 0.3,
    height: window.width * 0.2,
    alignItems: "center",
    justifyContent: "space-evenly",
    shadowColor: "#ccc",
  },
});

export default PostDetail;
