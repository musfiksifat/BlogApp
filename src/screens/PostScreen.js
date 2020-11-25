import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, ScrollView, } from "react-native";
import { Card } from "react-native-elements";
import PostCard from "./../components/PostCard";
import { AuthContext } from "../providers/AuthProvider";
import { getDataJSON, removeData, storeDataJSON } from "../functions/AsyncStorageFunctions";
import DarkThemeHeader from "./../components/DarkThemeHeader";
import StoreInputData from "../components/StoreInputData";
import { AsyncStorage } from "react-native";
import {getAllData, getAllElements} from "./../functions/DataFetchFunctions";

const PostScreen = (props) => {
  const postID = props.route.params.postId;
  const [posts, setPosts] = useState({});
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState([]);
  const [commentID, setCommentID]=useState(0);
  const [notifyID, setnotifyID] = useState(0);

  const loadIndividualPost = async () => {
    let response = await getDataJSON(JSON.stringify(postID));
    if (response != null) {
      return response;
    }
  };
  const loadComments = async () => {
    setLoading(true);
    let response = await getAllElements('comment');
    if (response != null) {
      setComments(response);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadIndividualPost().then((response) => {
      setPosts(JSON.parse(response));
    });
    loadComments();
  }, []);

    return (
      <AuthContext.Consumer>
        {(auth) => (
          <View style={styles.viewStyle}>
            <DarkThemeHeader
              DrawerFunction={() => {
                props.navigation.toggleDrawer();
              }}
            />
            <Card>
              {/*<Card.Title>The post</Card.Title>*/}
              <View style={styles.viewStyle2} >
                <PostCard
                  author={posts.name}
                  body={posts.post}
                />
              </View>
            </Card>
              
            <Card>
                <StoreInputData
                  Text="Post a Comment"
                  currentFunc={setInput}
                  currentText={input}
                  pressFunction={async () => {
                      await setCommentID(["comment" + Math.floor(Math.random()*255)]);
                      let currentComment = {
                        post: postID,
                        reciever: posts.name,
                        commentId:commentID,
                        commenter: auth.CurrentUser.name,
                        comment: input,
                      };
                      //
                      await setnotifyID(["notify"+Math.floor(Math.random()*1000)]);
                              let notification = {
                                notifyID: notifyID,
                                name: auth.CurrentUser.name,
                                type: "commented",
                              }
                              storeDataJSON(
                                JSON.stringify(notifyID),
                                JSON.stringify(notification)
                              );
                              console.log(notification);
                      storeDataJSON(
                        JSON.stringify(commentID),
                        JSON.stringify(currentComment)
                      );
                      //
                      alert("Comment Saved!")
                      //let UserData = await getDataJSON(JSON.stringify(commentID));
                      //console.log(UserData);
                      await loadComments();
                  }}
                />
            </Card>

            <ScrollView>
            <Card>
              <Card.Title>Comments for this post</Card.Title>
              <FlatList
                data={comments}
                onRefresh={loadComments}
                refreshing={loading}
                renderItem={function ({ item }) {
                  let data = JSON.parse(item);
                  if (JSON.stringify(data.post) === JSON.stringify(postID)) {
                    return (
                      <View>
                          <PostCard
                            author={data.commenter}
                            body={data.comment}
                          />
                      </View>
                    );
                  }
                }
                }
              />
            </Card>
            </ScrollView>
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
  },
  viewStyle2: {
    paddingTop:10,
    paddingBottom:40,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});

export default PostScreen;