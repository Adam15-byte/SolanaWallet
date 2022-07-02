import {StyleSheet, Text, View} from 'react-native';
import React, {createContext, useContext, useState, useEffect} from 'react';
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  Keypair,
} from '@solana/web3.js';

interface SolContext {
  keypair?: Keypair;
  balance?: number;
  // publicKey?: PublicKey;
  // secretKey?: Uint8Array;
  generateNewKeys?: () => void;
  getAirDrop?: () => void;
}

const SolContext = createContext<SolContext>({});

interface ChildrenProps {
  children: React.ReactNode;
}

export const SolContextProvider: React.FC<ChildrenProps> = ({
  children,
}: ChildrenProps) => {
  const [balance, setBalance] = useState<number>();
  const [keypair, setKeypair] = useState<Keypair>();
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  const generateNewKeys = () => {
    console.log('trying to get new keypair');
    setKeypair(() => Keypair.generate());
  };

  const getAirDrop = async () => {
    if (keypair) {
      const signature = await connection.requestAirdrop(
        keypair!.publicKey,
        1 * LAMPORTS_PER_SOL,
      );
      await connection.confirmTransaction(signature);
      const newBalance = await connection.getBalance(keypair.publicKey)
      setBalance(prevState => newBalance / LAMPORTS_PER_SOL);
    }
  };

  useEffect(() => {
    if (keypair) {
      connection
        .getBalance(keypair.publicKey)
        .then(result => setBalance(prevState => result / LAMPORTS_PER_SOL));
    }
  }, [keypair]);
  return (
    <SolContext.Provider
      value={{generateNewKeys, keypair, getAirDrop, balance}}>
      {children}
    </SolContext.Provider>
  );
};;

export default SolContext;
