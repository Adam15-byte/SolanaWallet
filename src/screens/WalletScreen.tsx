import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, FONTS, SIZES} from '../consts/consts';
import SolContext from '../features/connectionContext';
import AddressButton from '../components/AddressButton';
import NetworkTypeButton from '../components/NetworkTypeButton';
import BalanceCard from '../components/BalanceCard';
import SquareColorButton from '../components/SquareColorButton';
import {ArrowDown, ArrowUp, Download} from 'react-native-feather';
import TransactionComponents from '../components/TransactionComponents';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {WalletScreenParamList} from '../navigation/Navigation';

type WalletScreenProp = NativeStackNavigationProp<
  WalletScreenParamList,
  'WalletScreen'
>;

const WalletScreen = () => {
  const {
    generateNewKeys,
    keypair,
    getAirDrop,
    balance,
    usdValue,
    transactions,
  } = useContext(SolContext);
  const navigation = useNavigation<WalletScreenProp>();
  return (
    <ScrollView bounces={false} style={styles.scrollContainer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <AddressButton />
          <NetworkTypeButton />
        </View>
        <View style={styles.walletCardContainer}>
          <BalanceCard
            balance={balance!}
            usdValue={usdValue!}
            lastTransaction="31 April 2022"
          />
        </View>
        <View style={styles.actionButtonsContainer}>
          <SquareColorButton
            title="Send"
            backgroundColor={COLORS.pink}
            onPress={() => navigation.navigate('SendTransactionScreen')}>
            <ArrowUp
              width={SIZES.ICON_SIZE}
              height={SIZES.ICON_SIZE}
              stroke={COLORS.white}
            />
          </SquareColorButton>
          <SquareColorButton
            title="Get free SOL"
            backgroundColor={COLORS.blue}
            onPress={getAirDrop!}>
            <Download
              width={SIZES.ICON_SIZE}
              height={SIZES.ICON_SIZE}
              stroke={COLORS.white}
            />
          </SquareColorButton>
          <SquareColorButton
            title="Receive"
            backgroundColor={COLORS.green}
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
        <View style={styles.transactionHistoryContainer}>
          <View style={styles.transactionsHeaderContainer}>
            <Text style={styles.transactionsHeader}>Transactions</Text>
            <Pressable
              onPress={() => {
                console.log('pressed view all');
              }}>
              <Text style={styles.viewAllText}>View all</Text>
            </Pressable>
          </View>
          <View style={styles.transactionsListContainer}>
            {transactions?.transactions ? (
              <>
                {transactions?.isLoading && (
                  <ActivityIndicator size="large" color={COLORS.pink} />
                )}
                {transactions?.transactions.map(transaction => (
                  <TransactionComponents
                    key={transaction?.transaction.signatures[0]!}
                    TxN={transaction?.transaction.signatures[0]!}
                    postBalances={transaction?.meta?.postBalances[1]!}
                    preBalances={transaction?.meta?.preBalances[1]!}
                    date={moment
                      .unix(transaction?.blockTime!)
                      .format('YYYY-MM-DD HH:mm:ss')}
                  />
                ))}
              </>
            ) : (
              <Text style={styles.noTransactionsText}>
                No transactions to display
              </Text>
            )}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  container: {
    flex: 1,
    width: SIZES.SCREEN_WIDTH,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.darkBlue,
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
  transactionHistoryContainer: {
    flex: 1,
    width: '100%',
    marginTop: 30,
  },
  transactionsHeaderContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  transactionsHeader: {
    ...FONTS.h2,
    color: COLORS.white,
  },
  viewAllText: {
    ...FONTS.h3,
    color: COLORS.blueSolLogo,
  },
  transactionsListContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 15,
  },
  noTransactionsText: {
    ...FONTS.h3,
    color: COLORS.white,
  },
});
