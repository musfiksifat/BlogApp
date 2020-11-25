import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { FontAwesome, Ionicons, AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import { getDataJSON } from "../functions/AsyncStorageFunctions";

const SignInScreen = (props) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <Card backgroundColor = "#F1FBF1">
            <Card.Title style={styles.card_titleStyle}> Welcome to BlogApp!</Card.Title>
            <Card.Divider/>
            <Input
              leftIcon={<FontAwesome name="envelope" size={16} color="#504F4F" />}
              placeholder="  E-mail Address"
              placeholderTextColor="#918E8E"
              onChangeText={function (currentInput) {
                setEmail(currentInput);
              }}
            />

            <Input
              placeholder=" Password"
              placeholderTextColor="#918E8E"
              leftIcon={<Ionicons name="md-lock" size={20} color="#504F4F" />}
              secureTextEntry={true}
              onChangeText={function (currentInput) {
                setPassword(currentInput);
              }}
            />

            <TouchableOpacity 
              style={styles.registerButtonContainer}
              onPress={async function () {
                let UserData = await getDataJSON(Email);
                if (UserData.password == Password) {
                  auth.setIsLoggedIn(true);
                  auth.setCurrentUser(UserData);
                } else {
                  alert("Login Failed");
                  console.log(UserData);
                }
              }}
            >
              <Text style={styles.registerButtonText}>Sign In!</Text>
            </TouchableOpacity>

            <Button
              type="clear"
              icon={<AntDesign name="user" size={24} color="#A86C65" />}
              title="  Don't have an account?"
              titleStyle = {styles.titleStyle}
              onPress={function () {
                props.navigation.navigate("SignUp");
              }}
            />
          </Card>
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    paddingTop:25,
    backgroundColor: "#8DDB90",
  },
  card_titleStyle: {
    fontSize: 23,
    color: "#E45D4E",
    paddingTop:10,
    paddingBottom:4,
    alignSelf:"center",
    fontWeight:"800",
  },
  titleStyle: {
    color: "#A86C65",
  },
  registerButtonContainer: {
    "alignItems": "center",
    "alignSelf":"center",
    "paddingTop": 5,
    "width": 310,
    "height": 38,
    "borderWidth": 1,
    "borderColor": "#DED5D5",
    "backgroundColor": "#EA6362",
    "borderRadius": 8,
  },
  registerButtonText: {
    fontSize: 18,
    color: "rgba(241, 236, 236, 255)",
    fontWeight: "bold",
    alignSelf: "center",
  },
});
export default SignInScreen;
