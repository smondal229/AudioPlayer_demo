import {Icon, Slider} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {AppState, Button, Text, View} from 'react-native';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import Albumart from '../components/Albumart';
import {durationInMinsString} from '../utils/common';


export default function HomeScreen(props) {
  const [tracks, setTracks] = useState([
    {
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Load media from the network
      title: 'Avaritia',
      artist: 'deadmau5',
      album: 'while(1<2)',
      genre: 'Progressive House, Electro House',
      date: '2014-05-20T07:00:00+00:00', // RFC 3339
      artwork: 'https://picsum.photos/200', // Load artwork from the network
      duration: 732, // Duration in seconds
    },
  ]);
  const [playing, setPlaying] = useState(false);
  const {position, buffered, duration} = useProgress();
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    (async () => {
      await TrackPlayer.add(tracks);
    })();

    const appStateListener = AppState.addEventListener(
      'change',
      nextAppState => {
        setAppState(nextAppState);
      },
    );
    return () => {
      appStateListener?.remove();
    };
  }, []);

  useEffect(() => {
    if (appState == 'inactive' || appState == 'background') {
      console.log('state', appState);
    }
  }, [appState]);

  useEffect(() => {
    if (playing) {
      TrackPlayer.play();
    } else {
      TrackPlayer.pause();
    }
  }, [playing]);

  const onPressPlayPauseButton = () => {
    setPlaying(!playing);
  };
  console.log('AppState.currentState', AppState.currentState);
  return (
    <View style={{padding: 15}}>
      <Albumart src={tracks[0].artwork} />
      <Slider
        value={position}
        onValueChange={value => {
          TrackPlayer.seekTo(value);
        }}
        maximumValue={duration}
        minimumValue={0}
        step={1}
        allowTouchTrack
        trackStyle={{height: 5, backgroundColor: 'transparent'}}
        thumbStyle={{height: 10, width: 10, backgroundColor: 'transparent'}}
        thumbProps={{
          children: (
            <View
              style={{
                borderRadius: 5,
                width: 10,
                height: 10,
                backgroundColor: '#030303',
              }}
            />
          ),
        }}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>{durationInMinsString(position)}</Text>
        <Text>{durationInMinsString(duration)}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Icon
          name="step-backward"
          type="font-awesome"
          size={20}
          color={'#000'}
          containerStyle={{
            bottom: 20,
            right: 20,
            padding: 10,
            borderRadius: 15,
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: '#0000',
          }}
          iconStyle={{backgroundColor: '#fff'}}
          disabled={tracks.length <= 1}
          onPress={onPressPlayPauseButton}
        />
        <Icon
          name={playing ? 'pause' : 'play'}
          type="font-awesome"
          size={20}
          color={'#fff'}
          containerStyle={{
            bottom: 20,
            right: 20,
            width: 40,
            height: 40,
            padding: 10,
            borderRadius: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: '#000',
            alignItems: 'center',
          }}
          onPress={onPressPlayPauseButton}
        />
        <Icon
          name="step-forward"
          type="font-awesome"
          size={20}
          color={'#000'}
          disabled={tracks.length <= 1}
          containerStyle={{
            bottom: 20,
            right: 20,
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'center',
          }}
          iconStyle={{backgroundColor: '#fff'}}
          onPress={onPressPlayPauseButton}
        />
      </View>

      <Button
        title="View PDF"
        onPress={() => props.navigation.navigate('PdfReaderScreen')}
      />
    </View>
  );
}
