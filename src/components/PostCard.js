import React from "react";
import { View , StyleSheet} from "react-native";
import { Card, Button, Text, Avatar,} from "react-native-elements";
import { AntDesign, Feather } from "@expo/vector-icons";

const PostCard = (props) => {
  return (
    <Card>
    <View style={{ flex:10 , width:350 }}>
      <View style={{ flexDirection: "row", alignItems: "center", }} >     
        <Avatar
          containerStyle={{ backgroundColor: "#EC8282" }}
          rounded
          icon={{ name: "user", type: "font-awesome", color: "white" }}
          activeOpacity={1}
        />
        <Text h4Style={{ padding: 10 }} h4>
          {props.author}
        </Text>
      </View>

      <View 
        style={{
          alignItems: "flex-start",
          paddingLeft: 15 ,
        }}>
      <Text style={{ fontStyle: "italic" , paddingLeft:15}}> 
      {props.title}
      </Text>
      <Text
        style={{
          paddingBottom: 15,
          paddingLeft:5,
        }}
      >
        {props.body}
      </Text>
      </View>
      </View>
    </Card>
    
  );
};

const styles = StyleSheet.create({

  ButtonContainer: {
    "alignItems": "center",
    "alignSelf":"center",
    paddingTop:6,
    paddingBottom:6,
    paddingLeft:2,
    paddingRight:2,
    "borderWidth": 1,
    "borderColor": "#DED5D5",
    "backgroundColor": "#79B879",
  },
  ButtonText: {
    fontSize: 18,
    color: "rgba(241, 236, 236, 255)",
    fontWeight: "bold",
  },
});

export default PostCard;
