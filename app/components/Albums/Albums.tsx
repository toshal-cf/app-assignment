import React, {FunctionComponent, useContext, useEffect, useState} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    GestureResponderEvent,
    ViewStyle,
    SafeAreaView,
    FlatList,
    ScrollView
} from "react-native";
//import {ListItem} from "react-native-elements";
import  axios from 'axios'
import {ListItem, Header, Icon} from "react-native-elements";
import {ComponentContext} from "../../App";

interface Album {
    "userId": number,
    "id": number,
    "title": string
}

interface ItemProps{
    item: Album,
    onPress: (event: GestureResponderEvent) => void
}

const Albums : FunctionComponent<any> = (props: any) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [data, setData] = useState< Array<Album>|[]>([])

    const appContext = useContext(ComponentContext)

    useEffect(() => {
            console.log("In useeffect")
            axios.get(
                'https://jsonplaceholder.typicode.com/users/'+ (appContext ? appContext.userId.toString():'1')
                    + '/albums',
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

    const [selectedId, setSelectedId] = useState<number | null>(null)


    const displayAlbum = (item: Album) => {
        setSelectedId(item.id)
        appContext ? appContext.setComponent(3) : null
        appContext ? appContext.setAlbumId(item.id) : null
    }

    const handleArrowBack = () => {
        appContext ? appContext.setComponent(1) : null
    }

    const Item = (props : ItemProps) : JSX.Element => (
        <TouchableOpacity>
        <ListItem
            title={props.item.title}
            bottomDivider
            titleStyle={styles.title}
            onPress={props.onPress}
        />
        </TouchableOpacity>
    );


    const renderItem = ( {item}: { item: Album}) : any => {

        return (
            <Item
                item={item}
                onPress={() => displayAlbum(item)}
            />
        );
    };



    return (
        <SafeAreaView style={{flex: 1}}>
            <Header
                centerComponent={{ text: 'ALBUMS', style: { color: '#fff',fontSize: 20} }}
                containerStyle={styles.headerStyle}
                centerContainerStyle={styles.headerCenterStyle}
                leftComponent={{icon:'arrow-back', color: 'white', onPress:()=>handleArrowBack()}}
                rightComponent={<Icon name='log-out-outline' type='ionicon' color='white' onPress={handleArrowBack} />}
                //leftContainerStyle={styles.headerCenterStyle}
            />

            {loading ?
                <Text style={styles.formContainer}> Loading </Text> :
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
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
        fontSize: 30,
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
        fontSize: 40,
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

export default Albums;