import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../consts/consts';
import React, {useContext} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import {Copy} from 'react-native-feather';
import SolContext from '../features/connectionContext';

const AddressButton = () => {
  const {keypair} = useContext(SolContext);
  const copyToClipboard = () => {
    if (keypair) Clipboard.setString(keypair.publicKey.toString());
  };
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={copyToClipboard}>
      <View style={styles.buttonContainer}>
        <View style={styles.iconContainer}>
          <Copy
            width={SIZES.ICON_SIZE}
            height={SIZES.ICON_SIZE}
            stroke={COLORS.white}
          />
        </View>
        <Text numberOfLines={1} style={styles.hashText}>
          {keypair?.publicKey.toString()}
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
