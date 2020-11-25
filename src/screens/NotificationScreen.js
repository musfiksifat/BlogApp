import React, { useState, useEffect } from "react";
import { View, StyleSheet, AsyncStorage,ScrollView, FlatList } from "react-native";
import { Text, Card, Button, Avatar} from "react-native-elements";
import NotificationCard from "../components/NotificationCard";
import { AuthContext } from "../providers/AuthProvider";
import DarkThemeHeader from "./../components/DarkThemeHeader"
import {getDataJSON,storeDataJSON} from "./../functions/AsyncStorageFunctions";
import {getAllData, getAllElements} from "./../functions/DataFetchFunctions";

const NotificationScreen = (props) => {
  const [notifications, setNotifications] = useState([]);
  const [notifyID, setnotifyID] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadNotifications = async () => {
    setLoading(true);
    let response = await getAllElements('notify');
    if (response != null) {
      setNotifications(response);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>         
          <DarkThemeHeader
              DrawerFunction={() => {
                props.navigation.toggleDrawer();
              }}
              AuthFunction = {()=>{
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
              }}
          />
          <ScrollView>
            
              <FlatList
                data={notifications}
                onRefresh={loadNotifications}
                refreshing={loading}
                renderItem={function ({ item }) {
                  let data = JSON.parse(item);                 
                    return (
                      <View>
                          <NotificationCard
                            author={data.name}
                            type={data.type}
                          />
                      </View>
                    );
                  }
                }
              />

          </ScrollView>
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
  },
});

export default NotificationScreen;
