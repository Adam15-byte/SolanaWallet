import {StyleSheet, Text, View} from 'react-native';
import React, {createContext, useContext, useState, useEffect} from 'react';
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  Keypair,
  ParsedTransactionWithMeta,
} from '@solana/web3.js';
import moment from 'moment';

export interface BalanceObject {
  balance: number;
  isLoading: boolean;
}

export interface usdValue {
  value: number;
  isLoading: boolean;
}

export interface Transactions {
  transactions: null | (null | ParsedTransactionWithMeta)[];
  isLoading: boolean;
}

interface SolContext {
  keypair?: Keypair;
  balance?: BalanceObject;
  usdValue?: usdValue;
  transactions?: Transactions;
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
  const [balance, setBalance] = useState<BalanceObject>({
    balance: 0,
    isLoading: false,
  });
  const [usdValue, setUsdValue] = useState<usdValue>({
    value: 0,
    isLoading: false,
  });
  const [transactions, setTransactions] = useState<Transactions>({
    transactions: null,
    isLoading: false,
  });
  const [keypair, setKeypair] = useState<Keypair>();
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  const generateNewKeys = () => {
    console.log('trying to get new keypair');
    setKeypair(() => Keypair.generate());
    console.log('Generated new keypair');
  };

  const updateTransactions = async () => {
    const signaturesArray: string[] = [];
    if (keypair) {
      try {
        setTransactions(prevState => ({...prevState, isLoading: true}));
        const sigantures = await connection.getSignaturesForAddress(
          keypair?.publicKey,
        );
        sigantures.map(sig => {
          signaturesArray.push(sig.signature.toString());
        });
        const transactionsList = await connection.getParsedTransactions(
          signaturesArray,
        );
        setTransactions(prevState => ({
          ...prevState,
          transactions: transactionsList,
          isLoading: false,
        }));
        console.log(transactionsList);
        console.log(
          moment
            .unix(transactionsList[0]?.blockTime!)
            .format('YYYY-MM-DD HH:mm:ss'),
        );
      } catch (e) {
        console.log(e);
      }
    }
  };
  const getAirDrop = async () => {
    setBalance(prevState => ({...prevState, isLoading: true}));
    setUsdValue(prevState => ({...prevState, isLoading: true}));
    if (keypair) {
      const signature = await connection.requestAirdrop(
        keypair!.publicKey,
        1 * LAMPORTS_PER_SOL,
      );
      await connection.confirmTransaction(signature);
      const newBalance = await connection.getBalance(keypair.publicKey);
      setBalance(prevState => ({
        ...prevState,
        balance: newBalance / LAMPORTS_PER_SOL,
        isLoading: false,
      }));
      let solData = await fetch(
        'https://api.coingecko.com/api/v3/coins/solana?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false',
      ).then(res => res.json());
      const solPrice = solData.market_data.current_price.usd;
      setUsdValue(prevState => ({
        ...prevState,
        value: (newBalance / LAMPORTS_PER_SOL) * solPrice,
        isLoading: false,
      }));
      updateTransactions();
    }
  };

  useEffect(() => {
    if (keypair) {
      setBalance(prevState => ({...prevState, isLoading: true}));
      connection.getBalance(keypair.publicKey).then(result =>
        setBalance(prevState => ({
          ...prevState,
          balance: result / LAMPORTS_PER_SOL,
          isLoading: false,
        })),
      );
    }
  }, [keypair]);
  return (
    <SolContext.Provider
      value={{
        generateNewKeys,
        keypair,
        getAirDrop,
        balance,
        usdValue,
        transactions,
      }}>
      {children}
    </SolContext.Provider>
  );
};;

export default SolContext;
