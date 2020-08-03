import axios from 'axios'
import {FETCH_PHOTOS_FAILURE, FETCH_PHOTOS_REQUEST, FETCH_PHOTOS_SUCCESS, SET_PHOTO_ID} from "./photoTypes";

export const fetchPhotosRequest = () => {
    return {
        type: FETCH_PHOTOS_REQUEST
    }
}

export const fetchPhotosSuccess = photos => {
    return {
        type: FETCH_PHOTOS_SUCCESS,
        payload: photos
    }
}

export const fetchPhotosFailure = error => {
    return {
        type: FETCH_PHOTOS_FAILURE,
        payload: error
    }
}

export const setPhotoId = photoId => {
    return {
        type: SET_PHOTO_ID,
        payload: photoId
    }
}

export const fetchPhotos = () => {
    return (dispatch, getState) => {
        dispatch(fetchPhotosRequest)
        const albumId = getState().album.albumId
        axios.get('https://jsonplaceholder.typicode.com/albums/'
            + (albumId? albumId.toString() : '1') + '/photos')
            .then(response => {
                const albums = response.data
                console.log(albums)
                dispatch(fetchPhotosSuccess(albums))
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(fetchPhotosFailure(errorMsg))
            })
    }
}
