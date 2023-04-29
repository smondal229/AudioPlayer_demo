import {Text, View} from 'react-native';
import strings from '../config/languages';

export default function SplashScreen(props) {
  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          textAlign: 'center',
          textAlignVertical: 'center',
          fontSize: 32,
          flex: 1,
        }}>
        {strings.SCREEN_title}
      </Text>
    </View>
  );
}
