import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../consts/consts';
import React from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import {Copy} from 'react-native-feather';

interface Props {
  onPress: () => void;
}

const AddressButton = ({onPress}: Props) => {
  const copyToClipboard = () => {
    Clipboard.setString('hello world');
  };
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <View style={styles.buttonContainer}>
        <View style={styles.iconContainer}>
          <Copy
            width={SIZES.ICON_SIZE}
            height={SIZES.ICON_SIZE}
            stroke={COLORS.white}
          />
        </View>
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
    width: 170,
    height: SIZES.BUTTON_HEIGHT,
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginRight: 20,
  },
  hashText: {
    ...FONTS.h4,
    color: COLORS.white,
    maxWidth: '70%',
  },
  iconContainer: {
    marginRight: 15,
  },
});
