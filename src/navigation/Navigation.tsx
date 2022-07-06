import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ConnectScreen from '../screens/ConnectScreen';
import WalletScreen from '../screens/WalletScreen';
import SolContext from '../features/SolContext';
import SendTransactionScreen from '../screens/SendTransactionScreen';
import StorageLoadingScreen from '../screens/StorageLoadingScreen';
import ReceiveScreen from '../screens/ReceiveScreen';

export type ConnectStackParamList = {
  ConnectScreen: undefined;
};

export type WalletScreenParamList = {
  WalletScreen: undefined;
  SendTransactionScreen: undefined;
  ReceiveScreen: undefined;
};

const ConnectStack = createNativeStackNavigator<ConnectStackParamList>();
const WalletStack = createNativeStackNavigator<WalletScreenParamList>();

const Navigation = () => {
  const {keypair, checkingStorage} = useContext(SolContext);
  return (
    <NavigationContainer>
      {/* UPON OPENING, WHEN THE STORAGE IS CHECKED DISPLAY TEMPORARY LOADING SCREEN WITH SOLANA LOGO */}

      {checkingStorage ? (
        <StorageLoadingScreen />
      ) : keypair ? (
        // IF KEYPAIR IS INSERTED TO STATE THEN RENDER SCREENS FOR BROWSING AND USING WALLET

        <WalletStack.Navigator
          initialRouteName="WalletScreen"
          screenOptions={{headerShown: false}}>
          <WalletStack.Screen name="WalletScreen" component={WalletScreen} />
          <WalletStack.Screen
            name="SendTransactionScreen"
            component={SendTransactionScreen}
          />
          <WalletStack.Screen name="ReceiveScreen" component={ReceiveScreen} />
        </WalletStack.Navigator>
      ) : (
        // SCREEN TO ALLOW USER TO CREATE KEYPAIR OR LOG IN USING EXISTING DATA

        <ConnectStack.Navigator
          initialRouteName="ConnectScreen"
          screenOptions={{headerShown: false}}>
          <ConnectStack.Screen name="ConnectScreen" component={ConnectScreen} />
        </ConnectStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigation;
