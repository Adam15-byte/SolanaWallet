import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../consts/consts';
import React, {useState} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import {ChevronDown} from 'react-native-feather';

const NetworkTypeButton = () => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        null;
      }}>
      <View style={styles.buttonContainer}>
        <Text numberOfLines={1} style={styles.hashText}>
          Devnet
        </Text>
        <View style={styles.iconContainer}>
          <ChevronDown
            width={SIZES.ICON_SIZE + 5}
            height={SIZES.ICON_SIZE + 5}
            fill={COLORS.white}
            stroke={COLORS.white}
            strokeWidth={1}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NetworkTypeButton;

const styles = StyleSheet.create({
  buttonContainer: {
    maxWidth: 120,
    height: SIZES.BUTTON_HEIGHT,
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    opacity: 0.5,
  },
  hashText: {
    ...FONTS.h4,
    color: COLORS.white,
    maxWidth: '70%',
  },
  iconContainer: {
    marginLeft: 5,
  },
});
