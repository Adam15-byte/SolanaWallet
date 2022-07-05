import {StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, SIZES} from '../consts/consts';
import BlueButton from '../components/BlueButton';
import SolContext from '../features/SolContext';

////
// SCREEN SHOWN ON FIRST LOGIN THAT SHOWS TWO BUTTONS.
// ONE TO CREATE NEW KEYPAIR (public + secret)
// ONE TO LOGIN USING EXISTING SECRET KEY (CURRENTLY INACTIVE)
////

const ConnectScreen = () => {
  const {generateNewKeys} = useContext(SolContext);
  return (
    <SafeAreaView style={styles.container}>
      <BlueButton
        text="Generate new Keypair"
        active={true}
        onPress={generateNewKeys!}
      />
      <BlueButton
        text="Connect using existing secret key"
        active={false}
        onPress={() => {}}
      />
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
