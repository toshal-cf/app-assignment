import {DISPLAY_ALBUMS, DISPLAY_LOGINSCREEN, DISPLAY_PHOTOS} from "./appTypes";

const initialState = {
    showLogin: true,
    showAlbums: false,
    showPhotos: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case DISPLAY_LOGINSCREEN: return {
            ...state,
            showLogin: true,
            showAlbums: false,
            showPhotos: false,
        }
        case DISPLAY_ALBUMS: return {
            ...state,
            showLogin: false,
            showAlbums: true,
            showPhotos: false
        }
        case DISPLAY_PHOTOS: return {
            ...state,
            showLogin: false,
            showAlbums: false,
            showPhotos: true
        }
        default: return state
    }
}

export default appReducer;