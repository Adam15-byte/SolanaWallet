import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../consts/consts';
interface SquareButtonProps {
  backgroundColor: string;
  children: React.ReactNode;
  title: string;
  onPress: () => void;
}

const SquareColorButton = ({
  backgroundColor,
  children,
  title,
  onPress,
}: SquareButtonProps) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
        <View style={[styles.buttonStyle, {backgroundColor: backgroundColor}]}>
          {children}
        </View>
      </TouchableOpacity>
      <Text style={styles.textStyle}>{title}</Text>
    </View>
  );
};

export default SquareColorButton;

const styles = StyleSheet.create({
  buttonContainer: {
    height: SIZES.SQUARE_BUTTON_HEIGHT + 30,
    width: SIZES.SQUARE_BUTTON_HEIGHT,
    justifyContent: 'space-between',
  },
  buttonStyle: {
    height: SIZES.SQUARE_BUTTON_HEIGHT,
    aspectRatio: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: COLORS.white,
    ...FONTS.h3,
    textAlign: 'center',
  },
});
