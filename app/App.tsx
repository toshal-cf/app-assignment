/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux'


import store from "./redux/store";
import Home from "./components/Home/Home";

declare const global: {HermesInternal: null | {}};

const App = (props:any) => {


  return (
    <>
      <StatusBar hidden />
      <Provider store={store}>
        <Home> </Home>
      </Provider>
    </>
  );
};

export default App;
