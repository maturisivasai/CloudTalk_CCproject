import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import { TextInput } from 'react-native';
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import firebase from "firebase";
import { db, auth } from '../firebase';

import { ImageBackground } from 'react-native';


const ChatScreen = ({ navigation, route }) => {

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([])
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "chat",
            headerTitleAlign: "left",
            headerBackTitleVisible: false,
            headerTitle: () => (
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                    <Avatar
                        rounded source={{ uri: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png" }}
                    />

                    <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }} > {route.params.chatName} </Text>

                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={navigation.goBack} >
                    <AntDesign name="arrowleft" size={26} color="white" />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginRight: 30,
                    width: 80,
                }}>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={22} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={22} color="white" />
                    </TouchableOpacity>
                </View>
            )
        });

    }, [navigation]);

    const sendMessage = () => {
        Keyboard.dismiss();
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
        })
        setInput('')
    };

    useLayoutEffect(() => {
        const unsubscribe = db
            .collection('chats')
            .doc(route.params.id)
            .collection('messages')
            .orderBy('timestamp')
            .onSnapshot((snapshot) => setMessages(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
            ));
        return unsubscribe;
    }, [route]);
    return (
        <ImageBackground style={{ flex: 1 }} source={{ uri: 'https://reactjs.org/logo-og.png' }}>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar style="light" />
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}
                    keyboardVerticalOffset={90}
                >

                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                        <>
                            <ScrollView contentContainerStyle={{ paddingTop: 15 }} >
                                {messages.map(({ id, data }) => (
                                    data.email === auth.currentUser.email ? (
                                        <View key={id} style={styles.reciever}>
                                            <Avatar position="absolute"
                                                rounded
                                                //WEB
                                                containerStyle={{ position: "absolute", bottom: -15, right: -5 }}
                                                bottom={-15}
                                                right={-5}
                                                size={30}
                                                source={{ uri: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png" }}
                                            //data.PhotoURL
                                            />
                                            <Text style={styles.recieverText}>
                                                {data.message}
                                            </Text>
                                        </View>
                                    ) : (
                                        <View style={styles.sender}>
                                            <Avatar position="absolute"
                                                rounded
                                                //WEB
                                                containerStyle={{ position: "absolute", bottom: -15, left: -5 }}
                                                bottom={-15}
                                                left={-5}
                                                size={20}
                                                source={{ uri: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png" }}
                                            />
                                            <Text style={styles.senderText}>
                                                {data.message}
                                            </Text>
                                            <Text style={styles.senderName}>
                                                {data.displayName}
                                            </Text>
                                        </View>
                                    )
                                ))}

                            </ScrollView>
                            <View style={styles.footer}>
                                <TextInput
                                    placeholder='Type a message'
                                    style={styles.textInput}
                                    value={input}
                                    onChangeText={(text) => setInput(text)}
                                    onSubmitEditing={sendMessage}
                                />
                                <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                                    <Ionicons name="send" size={27} color="#2869E6" />
                                </TouchableOpacity>
                            </View>
                        </>

                    </TouchableWithoutFeedback>


                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%",
        padding: 15,
    },
    textInput: {
        flex: 1,
        height: 40,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        borderRadius: 30,
        color: "black"

    },
    reciever: {
        padding: 8,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 10,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",

    },
    sender: {
        padding: 8,
        backgroundColor: "yellow",
        alignSelf: "flex-start",
        borderRadius: 10,
        margin: 15,
        maxWidth: "80%",
        position: "relative",

    },
    recieverText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 10,
    },
    senderText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 10,
    },


    senderName: {
        color: "blue",
        paddingLeft: 10

    },
});

export default ChatScreen;
