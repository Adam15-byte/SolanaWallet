import {ImageBackground, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../consts/consts';

const BalanceCard = () => {
  return (
    <View style={styles.cardContainer}>
      <ImageBackground
        style={styles.imageBackgroundStyle}
        source={require('../assets/images/CardBackground.png')}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.currentBalanceText}>Current Balance</Text>
            <Text style={styles.solBalance}> 3 SOL </Text>
            <Text style={styles.usdEquivalent}> = 12,05 USD </Text>
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
            Last Transaction: 31 April 2022
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
    minHeight: 80,
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
  solBalance: {
    ...FONTS.h1,
    color: COLORS.white,
    marginTop: 5,
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
