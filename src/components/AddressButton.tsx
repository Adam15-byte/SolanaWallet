import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../consts/consts';
import React, {useContext, useState} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import {Copy} from 'react-native-feather';
import SolContext from '../features/SolContext';

interface Props {
  width: number;
}

const AddressButton = ({width}: Props) => {
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
      <View style={[styles.buttonContainer, {width: width}]}>
        <View style={styles.iconContainer}>
          <Copy
            width={SIZES.ICON_SIZE}
            height={SIZES.ICON_SIZE}
            stroke={COLORS.white}
          />
        </View>
        <Text
          numberOfLines={1}
          style={[
            styles.hashText,
            {maxWidth: width - 15 - SIZES.ICON_SIZE - 40},
          ]}>
          {justCopied ? 'Copied' : keypair?.publicKey.toString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(AddressButton);

const styles = StyleSheet.create({
  buttonContainer: {
    height: SIZES.BUTTON_HEIGHT,
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  hashText: {
    ...FONTS.h4,
    color: COLORS.white,
  },
  iconContainer: {
    marginRight: 15,
  },
});
