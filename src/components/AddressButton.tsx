import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../consts/consts';
import React, {useContext, useState} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import {Copy} from 'react-native-feather';
import SolContext from '../features/SolContext';

const AddressButton = () => {
  const [justCopied, setJustCopied] = useState<boolean>(false);
  const {keypair} = useContext(SolContext);
  const copyToClipboard = () => {
    if (keypair) {
      Clipboard.setString(keypair.publicKey.toString());
      setJustCopied(prevState => true);
      setTimeout(() => {
        setJustCopied(prevState => false);
      }, 2000);
    }
  };
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        if (justCopied) {
          return;
        } else {
          copyToClipboard();
        }
      }}>
      <View style={styles.buttonContainer}>
        <View style={styles.iconContainer}>
          <Copy
            width={SIZES.ICON_SIZE}
            height={SIZES.ICON_SIZE}
            stroke={COLORS.white}
          />
        </View>
        <Text numberOfLines={1} style={styles.hashText}>
          {justCopied ? 'Copied' : keypair?.publicKey.toString()}
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
    justifyContent: 'flex-start',
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
