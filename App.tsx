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
import Navigation from './src/navigation/Navigation';
import ConnectScreen from './src/screens/ConnectScreen';

const App = () => {
  return (
    <SolContextProvider>
      <Navigation />
      <StatusBar barStyle="light-content" />
      {/* <ConnectScreen /> */}
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
