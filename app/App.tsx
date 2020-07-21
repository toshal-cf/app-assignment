/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Login from "./components/Login/Login";
import Albums from "./components/Albums/Albums";
import Photos from "./components/Photos/Photos";



declare const global: {HermesInternal: null | {}};

interface ContextObj{
  setComponent: React.Dispatch<React.SetStateAction<number>>
  userId: number
  setUserId: React.Dispatch<React.SetStateAction<number>>
  albumId: number
  setAlbumId: React.Dispatch<React.SetStateAction<number>>
}

export const ComponentContext = React.createContext< ContextObj | null>(null)


const App = () => {
  const [selectComponent, setSelectComponent] = useState(1)
  const [logIn, setLogin] = useState(true)
  const [showAlbums, setShowAlbums] = useState(false)
  const [showPhotos, setShowPhotos] = useState(false)
  const [userId, setUserId] = useState(0)
  const [albumId, setAlbumId] = useState(0)

  useEffect(() => {
        setSelectComponent(1)
      },
      []
  )

  const handleComponent = () =>
  {
    if(selectComponent == 1)
    {
      setLogin(true)
      setShowAlbums(false)
      setShowPhotos(false)
    }
    else if(selectComponent == 2)
    {
      setLogin(false)
      setShowAlbums(true)
      setShowPhotos(false)
    }
    else if(selectComponent == 3)
    {
      setShowAlbums(false)
      setLogin(false)
      setShowPhotos(true)
    }
  }

  useEffect(
      handleComponent,
      [selectComponent]
  )

  return (
    <>
      <StatusBar hidden />
      <ComponentContext.Provider
          value={
            {
              setComponent: setSelectComponent,
              userId: userId,
              setUserId: setUserId,
              albumId: albumId,
              setAlbumId: setAlbumId
            }
          }
      >

        {
          logIn && <Login/>
        }
        {
          showAlbums && <Albums/>
        }
        {
          showPhotos && <Photos/>
        }
      </ComponentContext.Provider>
    </>
  );
};

export default App;
