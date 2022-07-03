import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useContext} from 'react';
import {COLORS, SIZES} from '../consts/consts';
import SolContext from '../features/connectionContext';
import AddressButton from '../components/AddressButton';

const WalletScreen = () => {
  const {generateNewKeys, keypair, getAirDrop, balance} =
    useContext(SolContext);
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <AddressButton />
      </View>
      <View style={styles.walletCard}></View>
      <View style={styles.actionButtons}></View>
      <View style={styles.transactionHistory}></View>
    </View>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SIZES.SCREEN_WIDTH,
    paddingHorizontal: 20,
  },
  topBar: {
    height: SIZES.BUTTON_HEIGHT,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  walletCard: {},
  actionButtons: {},
  transactionHistory: {},
});
