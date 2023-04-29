/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import type {PropsWithChildren} from 'react';
import {useEffect, useRef, useState} from 'react';
import {AppState, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import Routes from './src/navigation/routes';
import {store} from './src/redux/store';
import {setupPlayer} from './src/services/PlaybackService';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    async function setup() {
      let isSetup = await setupPlayer();

      // const queue = await TrackPlayer.getQueue();
      // if (isSetup && queue.length <= 0) {
      //   await addTracks();
      // }

      setIsPlayerReady(isSetup);
    }

    // const subscription = AppState.addEventListener('change', nextAppState => {
    //   if (
    //     appState.current.match(/active/) &&
    //     (nextAppState === 'inactive' || nextAppState === 'background')
    //   ) {
    //     setup();
    //   }

    //   appState.current = nextAppState;
    //   setAppStateVisible(appState.current);
    // });

    // return () => {
    //   subscription.remove();
    // };
    setup();
  }, []);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
