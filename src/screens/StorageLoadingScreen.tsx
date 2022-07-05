import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../consts/consts';

////
// SCREEN SHOWN UPON LAUNCHING THE APP, WHEN ASYNC STORAGE CHECKS IF THERE IS A COPY OF SECRET KEY IN STORAGE
////
const StorageLoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/SolanaLogo.png')}
        style={styles.logoStyle}
        resizeMode="contain"
      />
    </View>
  );
};

export default StorageLoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SIZES.SCREEN_WIDTH,
    backgroundColor: COLORS.darkBlue,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoStyle: {
    width: 80,
    aspectRatio: 1,
  },
});
