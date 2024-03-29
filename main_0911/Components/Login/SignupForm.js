import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-gesture-handler";
import { Formik } from "formik";
import { ProgressBar } from "react-native-paper";
import * as Yup from "yup";
import Validator from "email-validator";
import firebase from "../../firebase";

const db = firebase.firestore();

function SignupForm({ navigation }) {
  const [emails, setEmails] = useState([]);
  const SignupFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    password: Yup.string()
      .required()
      .min(8, "Your password has to have at least 8 characters"),
  });

  const checkEmail = async () => {
    try {
      const data = [];
      await db.collection("users").onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => data.push(doc.id));
      });
      setEmails(data);
    } catch (error) {
      console.log(error.message);
    }
    return checkEmail;
  };
  useEffect(() => {
    checkEmail();
    console.log(emails);
  }, []);

  const onSignup = async (email, password) => {
    try {
      if (!emails.includes(email)) {
        const userEmail = AsyncStorage.setItem("userEmail", email);
        const userPassword = AsyncStorage.setItem("userPassword", password);
        navigation.push("SetProfileScreen");
      } else {
        Alert.alert("이미 존재하는 이메일입니다");
      }
    } catch (error) {
      Alert.alert(
        error.message[
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          }
        ]
      );
      console.log(error.message);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          onSignup(values.email, values.password);
        }}
        validationSchema={SignupFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.email.length < 1 || Validator.validate(values.email)
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder="email"
                autoCapitalize="none"
                keyboardType="email-address"
                autoFocus={false}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>

            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    1 > values.password.length || values.password.length >= 8
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder="password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>
            <Pressable
              titleSize={20}
              style={styles.button(isValid)}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>계정 생성</Text>
            </Pressable>
            <View style={styles.signupContainer}>
              <Text>계정이 있으신가요? </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: "#6bb0f5" }}>로그인</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
  },
  inputField: {
    borderRadius: 4,
    padding: 13,
    backgroundColor: "#fafafa",
    marginBottom: 10,
    borderWidth: 1,
  },
  button: (isValid) => ({
    backgroundColor: isValid ? "#C0E8E0" : "#444",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 4,
    marginTop: 30,
    padding: 13,
  }),
  buttonText: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 20,
  },
  signupContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 50,
  },
  kakaoButton: {
    backgroundColor: "#FEE500",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 6,
    marginTop: 10,
  },
  kakaoText: {
    color: "#191919",
    fontSize: 30,
  },
  kakaoImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: 8,
  },
  kakaoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SignupForm;
