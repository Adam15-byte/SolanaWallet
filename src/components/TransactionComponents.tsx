import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, SIZES} from '../consts/consts';
import {ArrowDown, ArrowUp, Copy} from 'react-native-feather';
import Clipboard from '@react-native-clipboard/clipboard';
import {LAMPORTS_PER_SOL} from '@solana/web3.js';
interface Props {
  TxN: string;
  postBalances: number;
  preBalances: number;
  date: string;
}

const TransactionComponents = ({
  TxN,
  postBalances,
  preBalances,
  date,
}: Props) => {
  const [justCopied, setJustCopied] = useState<boolean>(false);
  const finalBalance = (postBalances - preBalances) / LAMPORTS_PER_SOL;
  const isFundsReceived = finalBalance > 0;
  const copyToClipboard = () => {
    Clipboard.setString(TxN);
    setJustCopied(prevState => true);
    setTimeout(() => {
      setJustCopied(prevState => false);
    }, 2000);
  };
  return (
    <>
      <View style={styles.container}>
        {isFundsReceived ? (
          <View style={styles.fundsReceivedIcon}>
            <ArrowDown
              width={SIZES.ICON_SIZE}
              height={SIZES.ICON_SIZE}
              stroke={COLORS.white}
            />
          </View>
        ) : (
          <View style={styles.fundsSentIcon}>
            <ArrowUp
              width={SIZES.ICON_SIZE}
              height={SIZES.ICON_SIZE}
              stroke={COLORS.white}
            />
          </View>
        )}
        <View>
          <View style={styles.balancesSumDateContainer}>
            <Text style={styles.finalBalanceDisplayed}>
              {isFundsReceived ? '+' : '-'}
              {finalBalance} SOL
            </Text>
            <Text style={styles.dateText}>{date}</Text>
          </View>
          <View style={styles.transactionsHashContainer}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.copyTxNButton}
              onPress={() => {
                justCopied ? null : copyToClipboard();
              }}>
              <Copy
                stroke={COLORS.white}
                width={SIZES.ICON_SIZE}
                height={SIZES.ICON_SIZE}
              />
              <Text style={styles.txnTextStyle} numberOfLines={1}>
                {justCopied ? 'Copied' : TxN}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.separator} />
    </>
  );
};

export default React.memo(TransactionComponents);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: SIZES.SQUARE_BUTTON_HEIGHT,
    flexDirection: 'row',
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: COLORS.white,
  },
  fundsReceivedIcon: {
    width: SIZES.SQUARE_BUTTON_HEIGHT * 0.7,
    aspectRatio: 1,
    backgroundColor: COLORS.green,
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fundsSentIcon: {
    width: SIZES.SQUARE_BUTTON_HEIGHT * 0.7,
    aspectRatio: 1,
    backgroundColor: COLORS.red,
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  balancesSumDateContainer: {
    height: '50%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  transactionsHashContainer: {
    height: '50%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyTxNButton: {
    backgroundColor: COLORS.blue,
    width: '90%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
  },
  txnTextStyle: {
    color: COLORS.white,
    width: '80%',
    marginLeft: 5,
    ...FONTS.h4,
  },
  finalBalanceDisplayed: {
    ...FONTS.h2,
    color: COLORS.white,
  },
  dateText: {
    ...FONTS.h4,
    color: COLORS.white,
    marginLeft: 20,
  },
});
