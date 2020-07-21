import React, {FunctionComponent, Props} from 'react'
import {StyleSheet, View, Text, TextInput} from "react-native";
import LoginForm from "./LoginForm";


const Login : FunctionComponent<any> = (props: any) => {
    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}> A simple app for practice. </Text>
                <LoginForm/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    formContainer: {
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
    },
    title: {
        color: "black",
        fontSize: 20,
        opacity: 0.6,
    }

})

export default Login;