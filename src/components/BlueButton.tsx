import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FONTS, COLORS, SIZES} from '../consts/consts';

interface Props {
  text: string;
  onPress: () => void;
  active: boolean;
}

const BlueButton = ({text, onPress, active}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={active ? 0.8 : 1}>
      <View style={[styles.buttonContainer, {opacity: active ? 1 : 0.5}]}>
        <Text numberOfLines={1} style={styles.buttonText}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(BlueButton);

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
