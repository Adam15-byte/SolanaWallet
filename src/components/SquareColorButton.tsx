import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../consts/consts';
interface SquareButtonProps {
  backgroundColor: string;
  children: React.ReactNode;
  title: string;
  onPress: () => void;
  active: boolean;
}

const SquareColorButton = ({
  backgroundColor,
  children,
  title,
  onPress,
  active,
}: SquareButtonProps) => {
  return (
    <View style={[styles.buttonContainer, {opacity: active ? 1 : 0.5}]}>
      <TouchableOpacity
        activeOpacity={active ? 0.8 : 1}
        onPress={() => {
          active ? onPress() : null;
        }}>
        <View style={[styles.buttonStyle, {backgroundColor: backgroundColor}]}>
          {children}
        </View>
      </TouchableOpacity>
      <Text style={styles.textStyle}>{title}</Text>
    </View>
  );
};

export default React.memo(SquareColorButton);

const styles = StyleSheet.create({
  buttonContainer: {
    height: SIZES.SQUARE_BUTTON_HEIGHT + 30,
    width: SIZES.SQUARE_BUTTON_HEIGHT + 50,
    justifyContent: 'space-between',
    alignItems: 'center',
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
