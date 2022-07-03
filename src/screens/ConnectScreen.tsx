import {StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, SIZES} from '../consts/consts';
import BlueButton from '../components/BlueButton';
import SolContext from '../features/connectionContext';

const ConnectScreen = () => {
  const {generateNewKeys} = useContext(SolContext);
  return (
    <SafeAreaView style={styles.container}>
      <BlueButton text="Generate new Keypair" onPress={generateNewKeys!} />
      <BlueButton text="Connect using existing SecretKey" onPress={() => {}} />
    </SafeAreaView>
  );
};

export default ConnectScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.darkBlue,
    flex: 1,
    width: SIZES.SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
