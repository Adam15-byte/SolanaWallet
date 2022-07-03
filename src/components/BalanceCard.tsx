import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../consts/consts';

const BalanceCard = () => {
  return (
    <View style={styles.cardContainer}>
      <Text style={{color: 'white'}}>BalanceCard</Text>
    </View>
  );
};

export default BalanceCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    minHeight: 200,
    borderRadius: 30,
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
