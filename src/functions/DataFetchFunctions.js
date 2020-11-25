import { AsyncStorage } from "react-native";
import {getDataJSON,storeDataJSON} from "./../functions/AsyncStorageFunctions";

const getAllData = async () => {
    let data = []
    try {
      data = await AsyncStorage.getAllKeys();
      if (data != null) {
        return data;
      } else {
        alert("No data with this key!");
      }
    } catch (error) {
      alert(error);
    }
  };

  const getAllElements = async (key_portion) => {
    let keys = await getAllData();
    let all_elements = [];
    try {
        if (keys != null) {
            for (let key of keys) {
                if (key.includes(key_portion)) {
                    let post = await getDataJSON(key);
                    all_elements.push(post);
                }
            }
            return all_elements;
        }
        else {
          alert("No "+ {key_portion} + " available");
        }
    } catch (error) {
        alert(error);
    }
}

export {getAllElements, getAllData};