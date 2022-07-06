import React, {createContext, useState, useEffect} from 'react';
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  Keypair,
  ParsedTransactionWithMeta,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  PublicKey,
  Signer,
} from '@solana/web3.js';
import {storeKeypair, getKeypairFromStorage} from '../../storage';

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
  checkingStorage?: boolean;
  sendTransaction?: (address: PublicKey, amount: number) => void;
  generateNewKeys?: () => void;
  getAirDrop?: () => void;
}

const SolContext = createContext<SolContext>({});

interface ChildrenProps {
  children: React.ReactNode;
}

export const SolContextProvider: React.FC<ChildrenProps> = ({children}: ChildrenProps) => {
  ////
  // SOL TOKENS IN ACCOUNT
  ////
  const [balance, setBalance] = useState<BalanceObject>({
    balance: 0,
    isLoading: false,
  });

  ////
  // SOL TOKENS IN ACCOUNT VALUED IN USD
  ////

  const [usdValue, setUsdValue] = useState<usdValue>({
    value: 0,
    isLoading: true,
  });

  ////
  // ARRAY OF TRANSACTIONS
  ////
  const [transactions, setTransactions] = useState<Transactions>({
    transactions: null,
    isLoading: true,
  });

  // STATE TO HANDLE STEPS
  const [checkingStorage, setCheckingStorage] = useState<boolean>(true);
  const [keypair, setKeypair] = useState<Keypair>();
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

  const generateNewKeys = React.useCallback(() => {
    console.log('trying to get new keypair');
    const newKeypair = Keypair.generate();
    setKeypair(prevState => newKeypair);
    console.log('Generated new keypair');
    storeKeypair(newKeypair);
  }, []);

  const updateTransactions = async () => {
    let signaturesArray: string[] = [];
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
      } catch (e) {
        console.log(e);
      }
    }
  };

  const updateBalance = async () => {
    if (keypair) {
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
      updateBalance();
      updateTransactions();
    }
  };

  const sendTransaction = async (address: PublicKey, amount: number) => {
    console.log('initializing sending');
    if (keypair) {
      try {
        console.log('Attempting to send');
        let transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: keypair.publicKey,
            toPubkey: address,
            lamports: amount * LAMPORTS_PER_SOL,
          }),
        );
        console.log('Created transaction');
        const signer: Signer = keypair;
        await sendAndConfirmTransaction(connection, transaction, [signer]);
        updateBalance();
        updateTransactions();
      } catch (e) {
        console.log(e);
      }
    }
  };

  ////
  // UPON FIRST OPENING CHECK IF KEYS ARE IN STORAGE
  ////
  useEffect(() => {
    setCheckingStorage(prevState => true);
    getKeypairFromStorage().then(res => {
      if (!res) {
        setCheckingStorage(prevState => false);
        return;
      }
      setKeypair(res);
      setCheckingStorage(prevState => false);
    });
  }, []);

  ////
  // WHEN KEYS
  ////
  useEffect(() => {
    if (keypair) {
      updateBalance();
      updateTransactions();
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
        sendTransaction,
        checkingStorage,
      }}>
      {children}
    </SolContext.Provider>
  );
};;

export default SolContext;
