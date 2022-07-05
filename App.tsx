import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {COLORS, SIZES} from './src/consts/consts';
import {SolContextProvider} from './src/features/SolContext';
import Navigation from './src/navigation/Navigation';

const App = () => {
  return (
    <SolContextProvider>
      <Navigation />
      <StatusBar barStyle="light-content" />
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
