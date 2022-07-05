import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keypair} from '@solana/web3.js';
import bs58 from 'bs58';

export const storeKeypair = async (keypair: Keypair) => {
  try {
    const encoded = bs58.encode(keypair.secretKey);
    await AsyncStorage.setItem('@secretKey', encoded);
    console.log('Data stored as:', encoded);
  } catch (e) {
    console.log(e);
  }
};

export const getKeypairFromStorage = async () => {
  try {
    const value = await AsyncStorage.getItem('@secretKey');
    if (value !== null) {
      console.log('Trying to read: ', value);
      const uint8array = bs58.decode(value);
      console.log('Decoded to: ', uint8array);
      const keypairFromSecret = Keypair.fromSecretKey(uint8array, {
        skipValidation: true,
      });
      console.log('The keypair is: ', keypairFromSecret);
      return keypairFromSecret;
    }
    return false;
  } catch (e) {
    console.log(e);
  }
};
