import {StyleSheet, Text, View, Pressable, ScrollView} from 'react-native';
import React, {useContext} from 'react';
import {COLORS, SIZES} from '../consts/consts';
import SolContext from '../features/connectionContext';
import AddressButton from '../components/AddressButton';
import NetworkTypeButton from '../components/NetworkTypeButton';
import BalanceCard from '../components/BalanceCard';
import SquareColorButton from '../components/SquareColorButton';
import {ArrowDown, ArrowUp, Download} from 'react-native-feather';

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
        <View style={styles.actionButtonsContainer}>
          <SquareColorButton
            title="Send"
            backgroundColor={COLORS.green}
            onPress={() => {
              console.log('clicked');
            }}>
            <ArrowUp
              width={SIZES.ICON_SIZE}
              height={SIZES.ICON_SIZE}
              stroke={COLORS.white}
            />
          </SquareColorButton>
          <SquareColorButton
            title="Get free SOL"
            backgroundColor={COLORS.blueSolLogo}
            onPress={() => {
              console.log('clicked');
            }}>
            <Download
              width={SIZES.ICON_SIZE}
              height={SIZES.ICON_SIZE}
              stroke={COLORS.white}
            />
          </SquareColorButton>
          <SquareColorButton
            title="Receive"
            backgroundColor={COLORS.pink}
            onPress={() => {
              console.log('clicked');
            }}>
            <ArrowDown
              width={SIZES.ICON_SIZE}
              height={SIZES.ICON_SIZE}
              stroke={COLORS.white}
            />
          </SquareColorButton>
        </View>
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
  actionButtonsContainer: {
    minHeight: SIZES.SQUARE_BUTTON_HEIGHT + 40,
    width: '100%',
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionHistoryContainer: {},
});
