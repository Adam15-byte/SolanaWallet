import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../consts/consts';
import React from 'react';
import Clipboard from '@react-native-clipboard/clipboard';

const AddressButton = () => {
  const copyToClipboard = () => {
    Clipboard.setString('hello world');
  };
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={copyToClipboard}>
      <View style={styles.buttonContainer}>
        <Text numberOfLines={1} style={styles.hashText}>
          0x5494389nfjds0953054238989458
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AddressButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: 150,
    height: SIZES.BUTTON_HEIGHT,
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  hashText: {
    ...FONTS.h3,
    color: COLORS.white,
  },
});
