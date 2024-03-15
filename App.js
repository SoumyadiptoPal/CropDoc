import { SafeAreaView, StyleSheet, Text, View,Platform, StatusBar } from 'react-native';
import AuthNavigation from './AuthNavigation';
import { GlobalStateProvider } from './GlobalContextState';

export default function App() {
  return (
    <GlobalStateProvider>
    <SafeAreaView style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <AuthNavigation/>
    </SafeAreaView>
    </GlobalStateProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
