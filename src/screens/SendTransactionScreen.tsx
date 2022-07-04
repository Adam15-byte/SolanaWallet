import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, SIZES, FONTS} from '../consts/consts';
import {ArrowLeft} from 'react-native-feather';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {WalletScreenParamList} from '../navigation/Navigation';
import BlueButton from '../components/BlueButton';

type SendTransactionScreenProp = NativeStackNavigationProp<
  WalletScreenParamList,
  'SendTransactionScreen'
>;

const SendTransactionScreen = () => {
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
        <Text style={styles.headerText}>Send transaction</Text>
      </View>
      <View style={styles.inputsContainer}>
        <View style={styles.receiverAddressContainer}>
          <View style={styles.sendToTextContainer}>
            <Text style={styles.sendToText}>Send To:</Text>
          </View>
          <View style={styles.sendToInputContainer}>
            <Text style={styles.infoLittleText}>Receiving wallet address</Text>
            <View style={styles.inputContainer}>
              <TextInput placeholder="example: DHcni37YojfmwxkUNnwFM5S7iAog2Uybxg2brof2MJSi" />
            </View>
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
              <TextInput keyboardType="numeric" placeholder="example: 2" />
            </View>
          </View>
        </View>
        <BlueButton
          text="Send transaction"
          onPress={() => console.log('pressed send button')}
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
});
