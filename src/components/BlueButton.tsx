import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FONTS, COLORS, SIZES} from '../consts/consts';

interface Props {
  text: string;
  onPress: () => void;
}

const BlueButton = ({text, onPress}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <View style={styles.buttonContainer}>
        <Text numberOfLines={1} style={styles.buttonText}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BlueButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: SIZES.SCREEN_WIDTH * 0.8,
    height: SIZES.BUTTON_HEIGHT,
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginVertical: 20,
  },
  buttonText: {
    ...FONTS.h3,
    color: COLORS.white,
  },
});
