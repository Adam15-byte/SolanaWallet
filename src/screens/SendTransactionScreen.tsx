import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, SIZES, FONTS} from '../consts/consts';
import {ArrowLeft} from 'react-native-feather';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {WalletScreenParamList} from '../navigation/Navigation';

type SendTransactionScreenProp = NativeStackNavigationProp<
  WalletScreenParamList,
  'SendTransactionScreen'
>;

const SendTransactionScreen = () => {
  const navigation = useNavigation<SendTransactionScreenProp>();
  return (
    <SafeAreaView style={styles.container}>
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
    paddingVertical: 10,
  },
  backButton: {
    width: SIZES.BUTTON_HEIGHT,
    aspectRatio: 1,
    borderRadius: SIZES.BUTTON_HEIGHT / 2,
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
