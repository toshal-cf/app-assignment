import React, {FunctionComponent, useContext, useEffect, useState} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, GestureResponderEvent, ViewStyle, SafeAreaView, FlatList} from "react-native";
import {ListItem, Header, Overlay, Image, Icon} from "react-native-elements";
import {connect} from "react-redux";

import {displayAlbums, displayLogin, fetchPhotos, setPhotoId} from "../../redux";

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

    useEffect(props.fetchPhotos,
        []
    )

    const handleArrowBack = () => {
        props.displayAlbums()
    }

    const handleLogOut = () => {
        props.displayLogin()
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

            {props.photoData.loading ?
                <Text style={styles.formContainer}> Loading </Text> :
                <FlatList
                    data={props.photoData.photos}
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

            {props.photoData.error? <Text> {props.photoData.error} </Text>: null}
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

const mapStateToProps = (state: any) => {
    return {
        photoData: state.photo
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchPhotos: () => dispatch(fetchPhotos()),
        displayLogin: () => dispatch(displayLogin()),
        displayAlbums: () => dispatch(displayAlbums()),
        setPhotoId: (id: number) => dispatch(setPhotoId())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Photos);