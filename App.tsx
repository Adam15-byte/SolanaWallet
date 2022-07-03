import React, {useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {COLORS, SIZES} from './src/consts/consts';
import {SolContextProvider} from './src/features/connectionContext';
import WalletScreen from './src/screens/WalletScreen';

const App = () => {
  return (
    <SolContextProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <WalletScreen />
      </SafeAreaView>
    </SolContextProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SIZES.SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.darkBlue,
  },
});

export default App;
