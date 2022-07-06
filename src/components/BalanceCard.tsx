import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useContext} from 'react';
import {COLORS, FONTS} from '../consts/consts';
import {BalanceObject} from '../features/SolContext';
import moment from 'moment';
import solContext, {usdValue} from '../features/SolContext';

interface Props {
  balance: BalanceObject;
  usdValue: usdValue;
}

const BalanceCard = ({balance, usdValue}: Props) => {
  const {transactions} = useContext(solContext);
  return (
    <View style={styles.cardContainer}>
      <ImageBackground
        style={styles.imageBackgroundStyle}
        source={require('../assets/images/CardBackground.png')}>
        <View style={styles.topRow}>
          <View style={styles.leftBalanceUSDContainer}>
            <Text style={styles.currentBalanceText}>Current Balance</Text>
            <View style={styles.solAmountLoadingRow}>
              <Text style={styles.solBalance}> {balance.balance} SOL </Text>
              {balance.isLoading && (
                <ActivityIndicator size="large" color={COLORS.pink} />
              )}
            </View>
            <View style={styles.usdAmountLoadingRow}>
              <Text style={styles.usdEquivalent}>
                = {usdValue.value.toFixed(2)} USD{' '}
              </Text>
              {usdValue.isLoading && (
                <ActivityIndicator size="small" color={COLORS.pink} />
              )}
            </View>
          </View>
          <View style={styles.logoContainer}>
            <Image
              style={styles.solLogo}
              source={require('../assets/images/SolanaLogo.png')}
            />
          </View>
        </View>
        <View style={styles.bottomRowForLastTransaction}>
          <Text style={styles.lastTransaction}>
            Last Transaction:{' '}
            {transactions!.transactions.length > 0
              ? moment
                  .unix(transactions!.transactions[0]?.blockTime!)
                  .format('YYYY-MM-DD, HH:mm:ss')
              : '---'}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default BalanceCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    minHeight: 200,
    borderRadius: 30,
    overflow: 'hidden',
  },
  imageBackgroundStyle: {
    width: '100%',
    minHeight: 200,
  },
  topRow: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 40,
    flexDirection: 'row',
    minHeight: 70,
    justifyContent: 'space-between',
  },
  leftBalanceUSDContainer: {
    minHeight: 70,
    justifyContent: 'space-between',
  },
  bottomRowForLastTransaction: {
    flex: 1,
    marginBottom: 30,
    width: '100%',
    paddingHorizontal: 40,
    justifyContent: 'flex-end',
  },
  logoContainer: {
    justifyContent: 'center',
  },
  solLogo: {
    width: 60,
    height: 60,
  },
  currentBalanceText: {
    ...FONTS.h5,
    color: COLORS.white,
  },
  solAmountLoadingRow: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'flex-end',
  },
  usdAmountLoadingRow: {
    flexDirection: 'row',
    height: 15,
    alignItems: 'flex-end',
  },
  solBalance: {
    ...FONTS.h1,
    color: COLORS.white,
    marginRight: 5,
  },
  usdEquivalent: {
    ...FONTS.h4,
    color: COLORS.white,
  },
  lastTransaction: {
    ...FONTS.h4,
    color: COLORS.white,
  },
});
