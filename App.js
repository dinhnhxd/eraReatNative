/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect,useCallback  } from 'react';
import splash from './splash.png';
import { BackHandler } from 'react-native';

import { WebView } from 'react-native-webview';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
   Dimensions, Animated, TouchableOpacity, Platform,ToastAndroid
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

let {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 66,
    height: 58,
  },
});


const App = (props) => {
  const [isLoading, setisLoading] = useState(false);
  const {message} = props;
  const [exitApp, setExitApp] = useState(0);



  const [backPressCount, setBackPressCount] = useState(0);
  const handleBackPress  = useCallback(() => {
    if (backPressCount === 0) {
      setBackPressCount(prevCount => prevCount + 1);
      setTimeout(() => setBackPressCount(0), 2000);
      // ToastAndroid.show('Nhấn 1 lần nữa để thoát app', ToastAndroid.SHORT);
      ToastAndroid.showWithGravity(
        "Nhấn 1 lần nữa để thoát app",
        ToastAndroid.LONG,
        ToastAndroid.TOP
      );
    } else if (backPressCount === 1) {
      BackHandler.exitApp();
    }
    return true;
  }, [backPressCount]);

  useEffect(() => {
    const backListener = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return backListener.remove;
  }, [handleBackPress]);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setisLoading(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) {
    return (
      <View>
        <Image
          style={styles.tinyLogo}
          source={splash}
        />
      </View>
    )
  }
  return (
    <WebView source={{ uri: 'http://erashop.vn/' }} />
  );
};

const performTimeConsumingTask = async () => {
  return new Promise((resolve) =>
    setTimeout(
      () => { resolve('result') },
      2000
    )
  );
}



export default App;
