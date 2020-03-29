import * as React from 'react';
import { Text } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export function MonoText(props) {
  const loadAssetsAsync = async() => {
    await Font.loadAsync({
      'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
      ...Ionicons.font,
    })
  }

  React.useEffect(() => {
    loadAssetsAsync();
  }, []);
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}
