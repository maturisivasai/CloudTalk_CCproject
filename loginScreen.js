import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { auth } from "../firebase";


const loginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace('Home');
            }
        });
        return unsubscribe;

    }, []);



    const signin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error));
    };


    return (
        <View behavior='padding' style={styles.container} >
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Email"
                    autoFocus
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}

                />

                <Input
                    placeholder="Password"
                    secureTextEntry
                    type="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={signin}
                />



            </View>
            <Button title="Login" containerStyle={styles.button} onPress={signin} />
            <Button onPress={() => navigation.navigate('Register')} title="Register" type="outline" containerStyle={styles.button} />
            <view style={{ height: 100 }} />
        </View>
    );
}


export default loginScreen;

const styles = StyleSheet.create({


    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 8,
    },

    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 100,
        padding: 10,
        backgroundColor: "levit",

    },

});