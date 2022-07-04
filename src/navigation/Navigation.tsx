import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ConnectScreen from '../screens/ConnectScreen';
import WalletScreen from '../screens/WalletScreen';
import SolContext from '../features/connectionContext';
import SendTransactionScreen from '../screens/SendTransactionScreen';

export type ConnectStackParamList = {
  ConnectScreen: undefined;
};

export type WalletScreenParamList = {
  WalletScreen: undefined;
  SendTransactionScreen: undefined;
};

const ConnectStack = createNativeStackNavigator<ConnectStackParamList>();
const WalletStack = createNativeStackNavigator<WalletScreenParamList>();

const Navigation = () => {
  const {keypair} = useContext(SolContext);
  return (
    <NavigationContainer>
      {keypair ? (
        <WalletStack.Navigator
          initialRouteName="WalletScreen"
          screenOptions={{headerShown: false}}>
          <WalletStack.Screen name="WalletScreen" component={WalletScreen} />
          <WalletStack.Screen
            name="SendTransactionScreen"
            component={SendTransactionScreen}
          />
        </WalletStack.Navigator>
      ) : (
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
