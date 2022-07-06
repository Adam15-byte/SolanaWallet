import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import SolContext from '../features/SolContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, SIZES, FONTS} from '../consts/consts';
import {ArrowLeft} from 'react-native-feather';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {WalletScreenParamList} from '../navigation/Navigation';
import QRCode from 'react-native-qrcode-svg';
import AddressButton from '../components/AddressButton';

// REQUIRED FOR NAVIGATION
type SendTransactionScreenProp = NativeStackNavigationProp<
  WalletScreenParamList,
  'ReceiveScreen'
>;

const ReceiveScreen = () => {
  const {keypair} = useContext(SolContext);
  const navigation = useNavigation<SendTransactionScreenProp>();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBarContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
          }}>
          <ArrowLeft
            stroke={COLORS.white}
            width={SIZES.ICON_SIZE}
            height={SIZES.ICON_SIZE}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Receive funds</Text>
      </View>
      <View style={styles.addressContainer}>
        <View style={styles.typedAddressRow}>
          <Text style={styles.infoTextColor}>
            Your public key to receive transactions
          </Text>
          <AddressButton width={300} />
        </View>
        <QRCode value={keypair?.publicKey?.toString()} size={250} />
      </View>
    </SafeAreaView>
  );
};

export default ReceiveScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SIZES.SCREEN_WIDTH,
    backgroundColor: COLORS.darkBlue,
    paddingHorizontal: 20,
    paddingVertical: 20,
    zIndex: 10,
  },
  topBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    width: SIZES.BUTTON_HEIGHT,
    aspectRatio: 1,
    borderRadius: SIZES.BUTTON_HEIGHT / 2,
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 10,
  },
  headerText: {
    ...FONTS.h2,
    color: COLORS.white,
    textAlign: 'center',
  },
  addressContainer: {
    position: 'absolute',
    top: 200,
    height: SIZES.SCREEN_HEIGHT - 200,
    width: SIZES.SCREEN_WIDTH,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  typedAddressRow: {
    minHeight: SIZES.BUTTON_HEIGHT * 2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  infoTextColor: {
    color: COLORS.white,
    ...FONTS.h3,
    marginBottom: 10,
  },
});
