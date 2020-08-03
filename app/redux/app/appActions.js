import {DISPLAY_ALBUMS, DISPLAY_LOGINSCREEN, DISPLAY_PHOTOS} from "./appTypes";

export const displayLogin = () => {
    return {
        type: DISPLAY_LOGINSCREEN,
    }
}

export const displayAlbums = () => {
    return {
        type: DISPLAY_ALBUMS,
    }
}

export const displayPhotos = () => {
    return {
        type: DISPLAY_PHOTOS,
    }
}