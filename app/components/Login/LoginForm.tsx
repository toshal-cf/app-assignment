import React, {FunctionComponent, useState, useRef, useEffect, useContext} from 'react'
import {StyleSheet, View, Text, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, Alert} from "react-native";
import {connect} from "react-redux";
import {displayAlbums, fetchUsers, fetchUsersFailure, setUserId} from "../../redux";


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

const LoginForm : FunctionComponent<any> = ({userData, fetchUsers, setUserId, displayAlbums, fetchUsersFailure}) => {

    useEffect(() => {
            fetchUsers()
        },
        []
    )

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginHandler = () => {
        if(userData.loading == false)
        {
            let i:number;
            let flag: boolean = false;
            for(i = 0; i < userData.users.length; i++) {
                if((username == userData.users[i].username || username == userData.users[i].email) &&
                    password == 'admin@123'){
                    displayAlbums()
                    flag = true;
                    setUserId(userData.users[i].id)
                }
            }
            if(flag == false)
                fetchUsersFailure('Invalid username or password.')
        }
        else
        {
            fetchUsersFailure('Something went wrong. Please try again.')
        }
    }

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


            <TouchableWithoutFeedback onPress={loginHandler}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}> Login </Text>
                </View>
            </TouchableWithoutFeedback>

            {userData.error? <Text style={styles.error}> {userData.error} </Text> : null}

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

const mapStateToProps = (state: any) => {
    return {
        userData: state.user
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        fetchUsers: () => dispatch(fetchUsers()),
        setUserId: (id:number) => dispatch(setUserId(id)),
        displayAlbums: () => dispatch(displayAlbums()),
        fetchUsersFailure: (error: string) => dispatch(fetchUsersFailure(error))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);