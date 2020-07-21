import React, {FunctionComponent, useContext, useEffect, useState} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, GestureResponderEvent, ViewStyle, SafeAreaView, FlatList} from "react-native";
//import {ListItem} from "react-native-elements";
import  axios from 'axios'
import {ListItem, Header, Overlay, Image, Icon} from "react-native-elements";
import {ComponentContext} from "../../App";

interface Photo {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}

interface ItemProps{
    item: Photo,
    onPress: (event: GestureResponderEvent) => void
}

const Photos : FunctionComponent<any> = (props: any) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [data, setData] = useState< Array<Photo>|[]>([])
    const appContext = useContext(ComponentContext)

    useEffect(() => {
            console.log("In useeffect")
            axios.get(
                'https://jsonplaceholder.typicode.com/albums/'+ (appContext? appContext?.albumId.toString(): '1')
                    +'/Photos',
                { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json; charset=UTF-8', }})
                .then(response => {
                    console.log(response)
                    setLoading(false)
                    setData(response.data)
                    setError('')
                })
                .catch(error => {
                    console.log("Request UnSuccessful")
                    setLoading(false)
                    setData([])
                    setError('Something went wrong')
                    console.log(error)
                })
            console.log("useffect ended")
        },
        []
    )

    const handleArrowBack = () => {
        appContext ? appContext.setComponent(2) : null
    }

    const handleLogOut = () => {
        appContext ? appContext.setComponent(1) : null
    }


    const [displayPic, setDisplayPic] = useState(false)
    const [imageUrl, setUrl] = useState('')

    const displayPhoto = (item : Photo) => {
        setDisplayPic(true)
        setUrl(item.url)
    }


    const Item = (props : ItemProps) : JSX.Element => (
        <TouchableOpacity>
            <ListItem
                title={props.item.title}
                bottomDivider
                titleStyle={styles.title}
                leftAvatar={{rounded: true, source:{uri:props.item.thumbnailUrl}}}
                onPress={props.onPress}
            />
        </TouchableOpacity>
    );


    const renderItem = ( {item}: { item: Photo}) : any => {

        return (
            <Item
                item={item}
                onPress={() => displayPhoto(item)}
            />
        );
    };


    return (
        <SafeAreaView>
            <Header
                centerComponent={{ text: 'PHOTOS', style: { color: '#fff', fontSize: 20} }}
                containerStyle={styles.headerStyle}
                centerContainerStyle={styles.headerCenterStyle}
                leftComponent={{icon:'arrow-back', color: 'white', onPress:()=>handleArrowBack()}}
                rightComponent={<Icon name='log-out-outline' type='ionicon' color='white' onPress={handleLogOut}/>}
            />

            {loading ?
                <Text style={styles.formContainer}> Loading </Text> :
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />

            }
            {
                displayPic && <Overlay
                    isVisible
                    onBackdropPress={() => setDisplayPic(false )}
                    overlayStyle={{width: 400, height: 650, alignItems:"center", justifyContent: "center"}}
                >
                    <Image
                        source={{uri: imageUrl}}
                        style={{width:350, height: 600}}
                    />
                </Overlay>
            }

            {error? <Text> {error} </Text>: null}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerStyle: {
        height: 65,
        paddingTop: 0,
    },
    headerCenterStyle: {
        height: 35,
        fontSize: 40,
        justifyContent: "center",
        alignItems: "center"
    },
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
        fontSize: 25,
        fontWeight: 'bold',
        opacity: 0.9,
        fontFamily: 'Times New Roman'
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    }
})

export default Photos;