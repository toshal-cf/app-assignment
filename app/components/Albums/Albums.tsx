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
} from "react-native";
import {ListItem, Header, Icon} from "react-native-elements";
import {connect} from "react-redux";

import {displayLogin, displayPhotos, fetchAlbums, setAlbumId} from "../../redux";

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

    useEffect(props.fetchAlbums,
        []
    )



    const displayAlbum = (item: Album) => {
        props.displayPhotos()
        props.setAlbumId(item.id)
    }

    const handleArrowBack = () => {
        props.displayLogin()
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

            {props.albumsData.loading ?
                <Text style={styles.formContainer}> Loading </Text> :
                <FlatList
                    data={props.albumsData.albums}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
            }

            {props.albumsData.error? <Text> {props.albumsData.error} </Text>: null}
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

const mapStateToProps = (state: any) => {
    return {
        albumsData: state.album
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchAlbums: () => dispatch(fetchAlbums()),
        setAlbumId: (id: number) => dispatch(setAlbumId(id)),
        displayPhotos: () => dispatch(displayPhotos()),
        displayLogin: () => dispatch(displayLogin()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Albums);