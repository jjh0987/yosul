import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
function HomeScreen({ navigation}) {  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Here is SNS!</Text>
      </View>
    );
}

function SNS({navigation}){
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} title='home'
                options={{
                    title:'Home',
                    headerShown:false,
                    }}/>
        </Stack.Navigator>
    )
}


export default SNS
  

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
},
});
