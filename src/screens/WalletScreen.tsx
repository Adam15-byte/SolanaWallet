import {StyleSheet, Text, View, Pressable, ScrollView} from 'react-native';
import React, {useContext} from 'react';
import {COLORS, SIZES} from '../consts/consts';
import SolContext from '../features/connectionContext';
import AddressButton from '../components/AddressButton';
import NetworkTypeButton from '../components/NetworkTypeButton';
import BalanceCard from '../components/BalanceCard';

const WalletScreen = () => {
  const {generateNewKeys, keypair, getAirDrop, balance} =
    useContext(SolContext);
  return (
    <ScrollView bounces={false}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <AddressButton />
          <NetworkTypeButton />
        </View>
        <View style={styles.walletCardContainer}>
          <BalanceCard />
        </View>
        <View style={styles.actionButtonsContainer}></View>
        <View style={styles.transactionHistoryContainer}></View>
      </View>
    </ScrollView>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SIZES.SCREEN_WIDTH,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  topBar: {
    height: SIZES.BUTTON_HEIGHT,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  walletCardContainer: {
    minHeight: 200,
    width: '100%',
    marginTop: 30,
  },
  actionButtonsContainer: {},
  transactionHistoryContainer: {},
});
