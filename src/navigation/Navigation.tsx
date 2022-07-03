import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ConnectScreen from '../screens/ConnectScreen';
import WalletScreen from '../screens/WalletScreen';
import SolContext from '../features/connectionContext';

const ConnectStack = createNativeStackNavigator();
const WalletStack = createNativeStackNavigator();

const Navigation = () => {
  const {keypair} = useContext(SolContext);
  return (
    <NavigationContainer>
      {keypair ? (
        <WalletStack.Navigator
          initialRouteName="WalletScreen"
          screenOptions={{headerShown: false}}>
          <WalletStack.Screen name="WalletScreen" component={WalletScreen} />
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
