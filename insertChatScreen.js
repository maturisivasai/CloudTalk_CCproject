
import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button } from "react-native-elements";
import { db } from '../firebase';
const InsertNewChatScreen = ({ navigation }) => {

    const [input, setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Insert a new chat",
            headerBackTitle: "Chats",
        });

    }, [navigation]);

    const createChat = async () => {
        await db
            .collection('chats')
            .add({
                chatName: input
            })
            .then(() => { navigation.goBack() })
            .catch((error) => alert(error));
    };



    return (
        <view style={{ padding: 30, height: "100%", backgroundColor: "white" }} >
            <Input
                placeholder='Enter a Group name'
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={createChat}

            />
            <Button onPress={createChat} title='Create new Chat' />
        </view>
    );

};

const styles = StyleSheet.create({

});

export default InsertNewChatScreen;