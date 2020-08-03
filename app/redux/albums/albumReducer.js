import {FETCH_ALBUMS_REQUEST, SET_ALBUM_ID, FETCH_ALBUMS_FAILURE, FETCH_ALBUMS_SUCCESS} from "./albumTypes";

const initialState = {
    loading: true,
    albums: [],
    error: '',
    albumId: 0,
}

const albumReducer = (state=initialState, action) => {
    switch (action.type) {
        case FETCH_ALBUMS_REQUEST: return {
            ...state,
            loading: true,
            error: ''
        }
        case FETCH_ALBUMS_SUCCESS: return {
            ...state,
            loading: false,
            error: '',
            albums: action.payload
        }

        case FETCH_ALBUMS_FAILURE: return {
            ...state,
            loading: false,
            error: action.payload,
            albums: []
        }

        case SET_ALBUM_ID: return {
            albumId: action.payload
        }

        default: return state
    }
}

export default albumReducer