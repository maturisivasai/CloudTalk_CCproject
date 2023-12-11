import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import CustomListItem from "../components/CustomListItem";
import { auth, db } from "../firebase";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";


const HomeScreen = ({ navigation }) => {

  const [chats, setChats] = useState([]);



  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace('Login')
    });
  };

  useEffect(() => {
    const unsubscribe = db.collection('chats').onSnapshot(snapshot => (
      setChats(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),

      })))

    ))
    return unsubscribe;
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "ChatApp",
      headerbackgroundcolor: "white",
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",

      headerLeft: () => (<View style={{ marginLeft: 20 }}>
        <TouchableOpacity activeOpacity={0.5}>
          <Avatar rounded source={{ uri: "auth?.currentUser?.photoURL" }} />
        </TouchableOpacity>
      </View>
      ),
      headerRight: () => (


        <View style={styles.container} >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("InsertNewChat")} >
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
            <AntDesign name="logout" color="black" size={24} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const enterChat = (id, chatName) => {
    navigation.navigate('Chat', {
      id,
      chatName,
    });
  };

  return (
    <SafeAreaView>
      <ScrollView style={{ height: '100%' }}>
        {chats.sort((a, b) => a.data.chatName.localeCompare(b.data.chatName))
          .map(({ id, data: { chatName } }) => (
            <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
          ))}

      </ScrollView>
    </SafeAreaView>


  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: "space-between",
    width: 115,
    marginRight: 30,

  }
});

export default HomeScreen;