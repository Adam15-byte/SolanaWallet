import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useContext} from 'react';
import {COLORS} from '../consts/consts';
import SolContext from '../features/connectionContext';

const WalletScreen = () => {
  const {generateNewKeys, keypair, getAirDrop, balance} =
    useContext(SolContext);
  return (
    <View style={styles.container}>
      <Text>walletScreen</Text>
      <Text>Connection Status: {keypair ? 'Connected' : 'Not connected'}</Text>
      <Text>Current SOL balance: {balance}</Text>
      <Text>
        Public Key:{' '}
        {keypair
          ? JSON.stringify(keypair?.publicKey?.toBase58(), null, 2)
          : null}
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => {
          console.log('tried connecting');
        }}>
        <Text>Connect to wallet</Text>
      </Pressable>
      {keypair && (
        <Pressable
          style={styles.button}
          onPress={() => {
            console.log('getting more sol');
            getAirDrop?.();
          }}>
          <Text>Get free SOL</Text>
        </Pressable>
      )}

      <Pressable style={styles.button} onPress={generateNewKeys}>
        <Text>Generate New Keys</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          console.log(keypair?.publicKey);
        }}>
        <Text>console log public</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          console.log(keypair?.secretKey);
        }}>
        <Text>console log secret</Text>
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
