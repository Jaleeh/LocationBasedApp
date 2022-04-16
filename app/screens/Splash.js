import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Theme from '../config/Theme';

export const SplashScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/hot_props_logo.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.background,
  },
  logo: {
    width: '40%',
    height: undefined,
    aspectRatio: 1,
  },
});

export default SplashScreen;
