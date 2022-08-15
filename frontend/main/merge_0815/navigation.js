import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
// import LoginScreen from "./Screens/LoginScreen";
// import SignupScreen from "./Screens/SignupScreen";
import BottomTabs from "./Screens/BottomTabs";

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
};

export const SignedInStack = () => {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
};

// export const SignedOutStack = () => {
//     return (
//         <NavigationContainer>
//           <Stack.Navigator
//             initialRouteName="LoginScreen"
//             screenOptions={screenOptions}
//           >
//             <Stack.Screen name="LoginScreen" component={LoginScreen} />
//             <Stack.Screen name="SignupScreen" component={SignupScreen} />
//           </Stack.Navigator>
//         </NavigationContainer>
//       );
// }