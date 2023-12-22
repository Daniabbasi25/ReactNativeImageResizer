import {  SafeAreaView,  } from 'react-native';
 
 import  RootNavigator   from './src/navigation/RootNavigator';
import FlashMessage, { hideMessage } from 'react-native-flash-message';
 
 

const App = () => {
 
  return (
 <SafeAreaView style={{flex:1}}>
<RootNavigator />
 
<FlashMessage position="top" floating onPress={hideMessage} />
 </SafeAreaView>
  );
};

export default App;
