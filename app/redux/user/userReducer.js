import {FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, SET_USER_ID} from "./userTypes";

const initialState = {
    loading: true,
    users: [],
    error: '',
    userId: 0,
}

const userReducer = (state=initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST: return {
            ...state,
            loading: true,
            error: ''
        }
        case FETCH_USERS_SUCCESS: return {
            ...state,
            loading: false,
            error: '',
            users: action.payload
        }

        case FETCH_USERS_FAILURE: return {
            ...state,
            loading: false,
            error: action.payload,
            users: []
        }

        case SET_USER_ID: return {
            userId: action.payload
        }

        default: return state
    }
}

export default userReducer