import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState, useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, SIZES, FONTS} from '../consts/consts';
import {ArrowLeft} from 'react-native-feather';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {WalletScreenParamList} from '../navigation/Navigation';
import BlueButton from '../components/BlueButton';
import SolContext from '../features/SolContext';
import {PublicKey, Keypair} from '@solana/web3.js';
import bs58 from 'bs58';

////
// SCREEN FOR SENDING FUNDS WITH INPUTS FOR RECEPIENT WALLET ADDRESS AND AMOUNT OF TOKENS TO SEND. 
// CURRENTLY DOESN'T WORK BECAUSE OF SOLANA WEB3.JS ERROR: [ReferenceError: Can't find variable: Buffer]
////


// REQUIRED FOR NAVIGATION
type SendTransactionScreenProp = NativeStackNavigationProp<
  WalletScreenParamList,
  'SendTransactionScreen'
>;

interface Error {
  walletAddress: string | null;
  solAmount: string | null;
}

const SendTransactionScreen = () => {
  const navigation = useNavigation<SendTransactionScreenProp>();
  const [walletAddress, setWalletAddress] = useState<string>();
  const [solAmount, setSolAmount] = useState<string>();
  const [error, setError] = useState<Error>({
    walletAddress: null,
    solAmount: null,
  });
  const {sendTransaction, balance} = useContext(SolContext);

  ////
  // CHECK IF INPUTS ARE CORRECT, IF ALL VALIDATIONS PASS RESET THE ERRORS AND USE THE "sendTransaction" FUNCTION FROM SolContext
  ////
  const validateAndSend = () => {
    if (walletAddress && solAmount && sendTransaction) {
      if (walletAddress.length < 32 || walletAddress.length > 44) {
        setError(prevState => ({
          ...prevState,
          walletAddress: 'Invalid wallet address',
          solAmount: null,
        }));
        return;
      }
      if (Number.isNaN(Number(solAmount))) {
        setError(prevState => ({
          ...prevState,
          walletAddress: null,
          solAmount: 'Must be a number',
        }));
        return;
      }
      if (Number(solAmount) >= balance!.balance) {
        setError(prevState => ({
          ...prevState,
          walletAddress: null,
          solAmount: 'Number bigger than your balance',
        }));
        return;
      }
      setError(prevState => ({
        ...prevState,
        walletAddress: null,
        solAmount: null,
      }));
      const tempPublickKey = new PublicKey(bs58.decode(walletAddress!));
      sendTransaction(tempPublickKey, Number(solAmount));
    } else {
      // IF walletAddress and solAmount are falsy
      setError(prevState => ({
        ...prevState,
        walletAddress: 'Require all values',
        solAmount: 'Require all values',
      }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* TOP BAR WITH HEADER AND BUTTON TO GO BACK */}

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
        <Text style={styles.headerText}>Send transaction</Text>
      </View>

      {/* TEMPORARY BOX FOR WARNING ABOUT THE FUNCTION NOT WORKING */}

      <View style={styles.warningContainer}>
        <Text style={styles.warningText}>
          Takes proper inputs, but currently throws error
        </Text>
      </View>

      {/*  INPUTS */}

      <View style={styles.inputsContainer}>
        <View style={styles.receiverAddressContainer}>
          <View style={styles.sendToTextContainer}>
            <Text style={styles.sendToText}>Send To:</Text>
          </View>
          <View style={styles.sendToInputContainer}>
            <Text style={styles.infoLittleText}>Receiving wallet address</Text>
            <View style={styles.inputContainer}>
              <TextInput
                value={walletAddress}
                onChangeText={text => setWalletAddress(prevState => text)}
                placeholder="example: DHcni37YojfmwxkUNnwFM5S7iAog2Uybxg2brof2MJSi"
              />
            </View>
            <Text style={styles.errorText}>
              {error.walletAddress ? error.walletAddress : null}
            </Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.receiverAddressContainer}>
          <View style={styles.sendToTextContainer}>
            <Text style={styles.sendToText}>Amount: </Text>
          </View>
          <View style={styles.sendToInputContainer}>
            <Text style={styles.infoLittleText}>How much SOL to send</Text>
            <View style={styles.inputContainer}>
              <TextInput
                value={solAmount?.toString()}
                onChangeText={text => setSolAmount(text)}
                keyboardType="numeric"
                placeholder="example: 2"
              />
            </View>
            <Text style={styles.errorText}>
              {error.solAmount ? error.solAmount : null}
            </Text>
          </View>
        </View>

        {/* SEND BUTTON */}

        <BlueButton
          active={true}
          text="Send transaction"
          onPress={validateAndSend}
        />
      </View>
    </SafeAreaView>
  );
};

export default SendTransactionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SIZES.SCREEN_WIDTH,
    backgroundColor: COLORS.darkBlue,
    paddingHorizontal: 20,
    paddingVertical: 20,
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
  warningContainer: {
    marginTop: 50,
    width: '100%',
    minHeight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningText: {
    color: COLORS.red,
    ...FONTS.h3,
  },
  inputsContainer: {
    marginTop: 20,
    wdith: '100%',
    alignItems: 'center',
  },
  receiverAddressContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 100,
  },
  sendToTextContainer: {
    height: '100%',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendToInputContainer: {
    height: '100%',
    width: '60%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  sendToText: {
    color: COLORS.white,
    ...FONTS.h3,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: COLORS.white,
  },
  inputContainer: {
    width: '100%',
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  infoLittleText: {
    color: COLORS.white,
    ...FONTS.h4,
    marginLeft: 10,
  },
  errorText: {
    ...FONTS.h4,
    color: COLORS.red,
    marginLeft: 10,
  },
});
