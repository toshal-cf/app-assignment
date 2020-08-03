import {FETCH_PHOTOS_FAILURE, FETCH_PHOTOS_REQUEST, FETCH_PHOTOS_SUCCESS, SET_PHOTO_ID} from "./photoTypes";


const initialState = {
    loading: true,
    photos: [],
    error: '',
    photoId: 0,
}

const photoReducer = (state=initialState, action) => {
    switch (action.type) {
        case FETCH_PHOTOS_REQUEST: return {
            ...state,
            loading: true,
            error: ''
        }
        case FETCH_PHOTOS_SUCCESS: return {
            ...state,
            loading: false,
            error: '',
            photos: action.payload
        }

        case FETCH_PHOTOS_FAILURE: return {
            ...state,
            loading: false,
            error: action.payload,
            photos: []
        }

        case SET_PHOTO_ID: return {
            photoId: action.payload
        }

        default: return state
    }
}

export default photoReducer