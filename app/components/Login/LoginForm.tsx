import React, {FunctionComponent, useState, useRef, useEffect, useContext} from 'react'
import {StyleSheet, View, Text, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, Alert} from "react-native";
import axios from "axios";
import {ComponentContext} from "../../App";

interface Company {
    name: string
    catchPhrase: string
    bs: string
}

interface Address {
    street: string,
    city: string,
    suite: string
    zipcode: string
    geo: {
        lat: string,
        lng: string,
    }
}

interface User {
    id: number,
    name: string,
    username: string,
    email: string,
    address: Address,
    phone: string,
    website: string,
    company: Company
}

const LoginForm : FunctionComponent<any> = (props: any) => {
    const [users, setUsers] = useState<Array<User> | []>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')


    useEffect(() => {
            axios.get('https://jsonplaceholder.typicode.com/users',
                { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json; charset=UTF-8', }})
                .then(response => {
                    console.log(response)
                    setLoading(false)
                    setUsers(response.data)
                    setError('')
                })
                .catch(error => {
                    console.log("Request UnSuccessful")
                    setLoading(false)
                    setUsers([])
                    setError('Something went wrong while fetching users.')
                    console.log(error)
                })
        },
        []
    )


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const appContext = useContext(ComponentContext)

    const loginHandler = () => {
        if(loading == false)
        {
            let i:number;
            let flag: boolean = false;
            for(i = 0; i < users.length; i++) {
                if((username == users[i].username || username == users[i].email) && password == 'admin@123'){
                    appContext ? appContext.setComponent(2):null
                    flag = true;
                    appContext ? appContext.setUserId(users[i].id):null
                }
            }
            if(flag == false)
                setError('Invalid username or password.')
        }
        else
        {
            setError('Something went wrong. Please try again.')
        }
    }

    /*const registerHandler = () => {
        Alert.alert("Registration successful")
    }*/

    const passwordInput = useRef<TextInput>(null)

    const usernameSubmitHandler = () => {
        if(passwordInput && passwordInput.current) {
            passwordInput.current.focus();
        }
    }


    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Username or Email."
                style={styles.input}
                onSubmitEditing={usernameSubmitHandler}
                onChangeText={text => setUsername(text)}
            />

            <TextInput
                placeholder="Password"
                secureTextEntry
                style={styles.input}
                ref={passwordInput}
                onChangeText={text => setPassword(text)}
            />


            <TouchableWithoutFeedback        onPress={loginHandler}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}> Login </Text>
                </View>
            </TouchableWithoutFeedback>

            {error? <Text style={styles.error}> {error} </Text> : null}

            {/*<TouchableWithoutFeedback onPress={registerHandler} style={styles.button}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Register</Text>
                    </View>
            </TouchableWithoutFeedback>
            */}


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        width: 250,
        height: 40,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderBottomColor:'#D3D3D3',
        borderBottomWidth: 1,
    },
    button: {
        marginBottom: 10,
        marginTop: 10,
        width: 250,
        height: 40,
        alignItems: 'center',
        backgroundColor: '#2196F3',
        elevation: 4
    },
    buttonText: {
        textAlign: 'center',
        padding: 10,
        color: 'white'
    },
    error: {
        color: 'red'
    }
})

export default LoginForm;