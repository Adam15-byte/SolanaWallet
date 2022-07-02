import React, {useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SolContextProvider} from './src/features/connectionContext';
import WalletScreen from './src/screens/WalletScreen';

const App = () => {
  return (
    <SolContextProvider>
      <SafeAreaView style={styles.container}>
        <WalletScreen />
      </SafeAreaView>
    </SolContextProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
