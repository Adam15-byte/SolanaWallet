import {StyleSheet, Text, View} from 'react-native';
import React, {createContext, useContext, useState, useEffect} from 'react';
import * as web3 from '@solana/web3.js';

interface SolContext {
  keys?: any;
  generateNewKeys?: () => void;
}

const SolContext = createContext<SolContext>({});

interface ChildrenProps {
  children: React.ReactNode;
}

export const SolContextProvider: React.FC<ChildrenProps> = ({
  children,
}: ChildrenProps) => {
  const [keys, setKeys] = useState<any>();
  const generateNewKeys = () => {
    console.log('trying to get new keypair');
    const wallet = web3.Keypair.generate();
    console.log(wallet);
  };

  return (
    <SolContext.Provider value={{generateNewKeys, keys}}>
      {children}
    </SolContext.Provider>
  );
};

export default SolContext;
