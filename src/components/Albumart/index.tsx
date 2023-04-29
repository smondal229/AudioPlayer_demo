import {Image} from '@rneui/base';
import {ActivityIndicator, StyleSheet} from 'react-native';

export default function Albumart({src}: {src: string}) {
  return (
    <Image
      source={{uri: src}}
      containerStyle={styles.item}
      PlaceholderContent={<ActivityIndicator />}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    width: 200,
    height: 200,
  },
});
