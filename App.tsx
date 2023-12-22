import {  SafeAreaView,  } from 'react-native';
 
 import  RootNavigator   from './src/navigation/RootNavigator';
 
 

const App = () => {
 
  return (
 <SafeAreaView style={{flex:1}}>
<RootNavigator />
 
 
 </SafeAreaView>
  );
};

export default App;
