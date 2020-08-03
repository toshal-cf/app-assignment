import  {combineReducers} from "redux";

import userReducer from "./user/userReducer";
import appReducer from "./app/appReducer";
import albumReducer from "./albums/albumReducer";
import photoReducer from "./photos/photoReducer";

const rootReducer = combineReducers({
    app: appReducer,
    user: userReducer,
    album: albumReducer,
    photo: photoReducer
})

export default rootReducer