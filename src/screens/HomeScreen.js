import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList} from "react-native";
import { Card } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import PostCard from "./../components/PostCard";
import LightThemeHeader from "./../components/LightThemeHeader";
import StoreInputData from "../components/StoreInputData";
import {getDataJSON,storeDataJSON} from "./../functions/AsyncStorageFunctions";
import {getAllData, getAllElements} from "./../functions/DataFetchFunctions";
import { Button } from "react-native-elements";
import {Feather, AntDesign, FontAwesome } from "@expo/vector-icons";

const HomeScreen = (props) => {

  const [posts, setPosts] = useState([]);
  const [postID, setpostID] = useState(0);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState([]);
  const [count, setCount] = useState(0);
  const [icon, setIcon] = useState(["like2"]);
  const [notifyID, setnotifyID] = useState(0);

  const loadPosts = async () => {
    setLoading(true);
    let response = await getAllElements('post');
    if (response != null) {
      setPosts(response);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPosts();
  }, []);

    return (
      <AuthContext.Consumer>
        {(auth) => (
          <View style={styles.viewStyle}>
            <LightThemeHeader
              DrawerFunction={() => {
                props.navigation.toggleDrawer();
              }}
              AuthFunction = {()=>{
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
              }}
            />
            <Card>
              <StoreInputData
                Text="What's On Your Mind ?"
                currentFunc={setInput}
                currentText={input}
                pressFunction={async () => {
                  await setpostID(["post"+Math.floor(Math.random()*255)]);
                  let currentPost = {
                    name: auth.CurrentUser.name,
                    postID: postID,
                    post: input,
                    likes: 0,
                  };
                  storeDataJSON(
                    JSON.stringify(postID),
                    JSON.stringify(currentPost)
                  );          
                  alert("Post Saved!")
                  //let UserData = await getDataJSON(JSON.stringify(postID));
                  //console.log(UserData);
                  await loadPosts();
                }}
              />
            </Card>
            <FlatList
              data={posts}
              onRefresh={loadPosts}
              
              refreshing={loading}
              renderItem={function ({ item }) {
                let data = JSON.parse(item)
                //console.log(JSON.stringify(data));
                return (
                  <View>
                    <Card>
                      <PostCard
                        author={data.name}
                        body={data.post}
                      />
                      <Card.Divider />
                      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                        <Button
                          buttonStyle = {{borderColor:'#37D993',  borderWidth:1, width:120 }}
                          type="outline"
                          title={`  Like (${count})  `}
                          titleStyle = {{color:'#2ABF80'}}
                          icon={<AntDesign name={icon} size={22} color="#2ABF80" />}
                          
                          onPress={async function () {
                            if (icon== "like2") {
                              
                              await setnotifyID(["notify"+Math.floor(Math.random()*1000)]);
                              let notification = {
                                notifyID: notifyID,
                                name: auth.CurrentUser.name,
                                type: "liked",
                              }
                              storeDataJSON(
                                JSON.stringify(notifyID),
                                JSON.stringify(notification)
                              );
                              console.log(notification);
                              //ager
                              
                              setCount(count + 1);
                              setIcon("like1")
                            }
                            else {
                              setCount(count - 1);
                              setIcon("like2");
                            }
                          }}
                        />
                        
                        <Button 
                          buttonStyle = {{backgroundColor:'#33D28E', borderColor:'#37D993', width:130}}
                          type="solid"
                          title="  Comment  "
                          titleStyle = {{color:'white'}}
                          icon = {<Feather name="message-square" size={24} color="white" />}
                          onPress={() => {
                            props.navigation.navigate("PostScreen", {postId: data.postID,});
                          }}
                        />

                      </View>
                    </Card>
                  </View>
                );
              }}
            />
          </View>
        )}
      </AuthContext.Consumer>
    );
   
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
    backgroundColor:"#E6F5E6",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});

export default HomeScreen;
