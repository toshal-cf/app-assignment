import React, {FunctionComponent} from "react";
import {connect} from "react-redux";

import Login from "../Login/Login";
import Albums from "../Albums/Albums";
import Photos from "../Photos/Photos";


const Home: FunctionComponent<any> = (props:any) => {
    return (
        <>
            {
                props.appData.showLogin && <Login/>
            }
            {
                props.appData.showAlbums && <Albums/>
            }
            {
                props.appData.showPhotos && <Photos/>
            }
        </>
    )
}

const mapStateToProps = (state:any) => {
    return {
        appData: state.app
    }
}

export default connect(mapStateToProps)(Home)