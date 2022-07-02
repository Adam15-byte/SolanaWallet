import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useContext} from 'react';
import {COLORS} from '../consts/consts';
import SolContext from '../features/connectionContext';

const WalletScreen = () => {
  const {generateNewKeys, keys} = useContext(SolContext);
  return (
    <View style={styles.container}>
      <Text>walletScreen</Text>
      <Text>Connection Status:</Text>
      <Text>Current SOL balance:</Text>
      <Pressable
        style={styles.button}
        onPress={() => {
          console.log('tried connecting');
        }}>
        <Text>Connect to wallet</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          console.log('tried getting sol');
        }}>
        <Text>Get free SOL</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={generateNewKeys}>
        <Text>Generate New Keys</Text>
      </Pressable>
    </View>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.blue,
    marginVertical: 10,
  },
});
