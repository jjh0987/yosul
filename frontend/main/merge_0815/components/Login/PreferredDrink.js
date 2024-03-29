import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Button,
    TouchableOpacity,
  } from "react-native";
  import React, { useState } from "react";
  import { ScrollView, TextInput } from "react-native-gesture-handler";
  import { Divider, CheckBox, Slider, Icon } from "react-native-elements";
  
  const PreferredDrink = ({ navigation }) => {
    const [preferredContent, setPreferredContent] = useState();
    const [preferredAlchol, setPreferredAlchol] = useState(false);
    const [isSelect, setIsSelect] = useState({
      id1: false,
      id2: false,
      id3: false,
      id4: false,
      id5: false,
      id6: false,
    })
    return (
      <SafeAreaView>
        <View
          style={{
            alignItems: "center",
            marginBottom: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button title="이전으로" onPress={() => navigation.goBack()} />
  
          <View>
            <Text style={{ fontSize: 20, fontWeight: "600", marginRight: 142 }}>
              프로필 설정
            </Text>
          </View>
        </View>
        <Divider />
        <View style={styles.texts}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            주량
          </Text>
        </View>
        <View style={styles.inputField}>
          <TextInput
            placeholderTextColor="#444"
            placeholder="주량을 입력해주세요."
            autoCapitalize="none"
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              marginTop: 30,
              marginBottom: 20,
              marginLeft: 13,
            }}
          >
            선호 주종
          </Text>
          <Text
            style={{
              fontSize: 12,
              marginTop: 33,
              marginBottom: 19,
              marginLeft: 4,
            }}
          >
            (중복 선택 가능)
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setPreferredAlchol}
            style={[
              styles.checkBoxDesign,
              {backgroundColor: isSelect[id] ? '#C0E8E0' : '#fafafa'}

            ]}
          >
            <Text>소주</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setPreferredAlchol}
            style={[
              styles.checkBoxDesign,
              {backgroundColor: isSelect[id] ? '#C0E8E0' : '#fafafa'}

            ]}
          >
            <Text>맥주</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setPreferredAlchol}
            style={[
              styles.checkBoxDesign,
              {backgroundColor: isSelect[id] ? '#C0E8E0' : '#fafafa'}

            ]}
          >
            <Text>막걸리</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setPreferredAlchol}
            style={[
              styles.checkBoxDesign,
              {backgroundColor: isSelect[id] ? '#C0E8E0' : '#fafafa'}

            ]}
          >
            <Text>증류식 소주</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setPreferredAlchol}
            style={[
              styles.checkBoxDesign,
              {backgroundColor: isSelect[id] ? '#C0E8E0' : '#fafafa'}

            ]}
          >
            <Text>와인</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => !setPreferredAlchol}
            style={[
              styles.checkBoxDesign,
              {backgroundColor: isSelect[id] ? '#C0E8E0' : '#fafafa'}
            ]}
          >
            <Text>위스키</Text>
          </TouchableOpacity>
        </View>
  
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              marginTop: 30,
              marginBottom: 20,
              marginLeft: 13,
            }}
          >
            선호 도수
          </Text>
        </View>
        <View>
          <Slider
            value={preferredContent}
            onValueChange={setPreferredContent}
            maximumValue={50}
            minimumValue={0}
            step={10}
            trackStyle={{ height: 20 }}
            thumbStyle={{ height: 30, width: 30, backgroundColor: "#C0E8E0" }}
          />
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text>{preferredContent}</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#C0E8E0",
            marginTop: 50,
            height: "100%",
          }}
        >
          <TouchableOpacity activeOpacity={0.8} style={styles.buttonDesign}>
            <Text style={{ fontSize: 30, fontWeight: "500", color: "white" }}>
              완료
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    header: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
      marginBottom: 20,
      flex: 1,
    },
    texts: {
      marginLeft: 11,
      marginTop: 24,
    },
    inputField: {
      borderRadius: 4,
      padding: 13,
      backgroundColor: "#fafafa",
      margin: 12,
      borderWidth: 1,
    },
    checkBoxDesign: {
      width: "48%",
      height: 80,
      // borderColor: "#444",
      // borderWidth: 1,
      borderStyle: "solid",
      borderRadius: 20,
      margin: 3,
      alignItems: "center",
      justifyContent: "center",
    },
    pressedCheckBox: {
      width: "48%",
      height: 80,
      borderColor: "#C0E8E0",
      backgroundColor: "#C0E8E0",
      borderStyle: "solid",
      borderRadius: 20,
      margin: 3,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonDesign: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
    },
  });
  
  export default PreferredDrink;