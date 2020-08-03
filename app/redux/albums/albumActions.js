import axios from 'axios'

import {
    FETCH_ALBUMS_FAILURE,
    FETCH_ALBUMS_REQUEST,
    FETCH_ALBUMS_SUCCESS,
    SET_ALBUM_ID
} from "./albumTypes";

export const fetchAlbumsRequest = () => {
    return {
        type: FETCH_ALBUMS_REQUEST
    }
}

export const fetchAlbumsSuccess = albums => {
    return {
        type: FETCH_ALBUMS_SUCCESS,
        payload: albums
    }
}

export const fetchAlbumsFailure = error => {
    return {
        type: FETCH_ALBUMS_FAILURE,
        payload: error
    }
}

export const setAlbumId = albumId => {
    return {
        type: SET_ALBUM_ID,
        payload: albumId
    }
}

export const fetchAlbums = () => {
    return (dispatch, getState) => {
        dispatch(fetchAlbumsRequest)
        const userId = getState().user.userId
        axios.get('https://jsonplaceholder.typicode.com/users/'
            + (userId? userId.toString() : '1') + '/albums')
            .then(response => {
                const albums = response.data
                console.log(albums)
                dispatch(fetchAlbumsSuccess(albums))
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(fetchAlbumsFailure(errorMsg))
            })
    }
}
