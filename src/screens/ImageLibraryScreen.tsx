import {
  ActivityIndicator,
    Alert,
    Button,
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
     
  } from 'react-native';
  import React, {FC, useCallback, useEffect, useState} from 'react';
  import {
    Asset,
    launchCamera,
    launchImageLibrary,
  } from 'react-native-image-picker';
 
  import {
    CameraRoll,
    PhotoIdentifier,
  } from '@react-native-camera-roll/camera-roll';import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import { useFocusEffect } from '@react-navigation/native';

  type Picture = {
    id?: string;
    fileName: string;
    height: number;
    width: number;
    uri: string;
  };
const ImageLibraryScreen:FC = () => {
    const [selectedImage, setSelectedImage] = useState<Picture | undefined>();
    const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

const navigation=useNavigation()
  const handleCamera = async () => {
    
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        presentationStyle: 'popover',
      });

      if (result.errorCode) {
        Alert.alert(result.errorCode);
        return;
      }
      if (result.didCancel) {
        console.log('cancelled');
        return;
      }
      console.log(result);
      if (result.assets) {
        const image: Asset = result.assets[0];
        setSelectedImage({
          fileName: image.fileName ? image.fileName : '',
          height: image.height ? image.height : 0,
          uri: image.uri ? image.uri : '',
          width: image.width ? image.width : 0,
        });
        //@ts-ignore
        navigation.navigate('ResizeScreen' ,{...selectedImage})
      }
    } catch (error) {
      Alert.alert('Something went wrong');
    }
  };
  const handlePhototLibrary = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        presentationStyle: 'popover',
      });

      if (result.didCancel) {
        console.log('cancelled');
        return;
      }
      if (result.errorCode) {
        Alert.alert(result.errorCode);
        return;
      }
      console.log(result);
      if (result.assets) {
        const image: Asset = result.assets[0];
        setSelectedImage({
          fileName: image.fileName ? image.fileName : '',
          height: image.height ? image.height : 0,
          uri: image.uri ? image.uri : '',
          width: image.width ? image.width : 0,
        });
        //@ts-ignore
        navigation.navigate('ResizeScreen' ,{...selectedImage})
      }
    } catch (error) {
      Alert.alert('Something went wrong');
    }
  };

 const handleNextPress = () => {
//@ts-ignore
  navigation.navigate('ResizeScreen' ,{...selectedImage})
 }

const handleImageselected= (item:any) => {
console.log(item)
setSelectedImage({
  id:item?.node.id,
  fileName: item?.node?.image?.fileName ? item?.node?.image?.fileName : '',
  height: item?.node?.image?.height ? item?.node?.image?.height : 0,
  uri: item?.node?.image?.uri ? item?.node?.image?.uri : '',
  width: item?.node?.image?.width ? item?.node?.image?.width : 0,
})
}

 const fetchPhotos = useCallback(async () => {
  const res = await CameraRoll.getPhotos({
    first: 200,
    assetType: 'Photos',
  });
  setPhotos(res?.edges);
  setIsLoading(false);
}, []);
useFocusEffect(
  React.useCallback(() => {
    fetchPhotos();

   
  }, [fetchPhotos])
);
 
  return (
    <View style={{flex:1}}>
      {isLoading?
      <ActivityIndicator size={25} color={'black'} />
      :
      <FlatList
  numColumns={3}
  data={isLoading ? Array(15).fill('') : photos}
  keyExtractor={(_, index) => index.toString()}
  renderItem={({item, index}) => {
     
    return (
      <TouchableOpacity  style={[styles.image,{borderWidth:selectedImage?.id==item?.node.id? 2:0,borderColor:'red'}]} onPress={()=>handleImageselected(item)}>

        <Image
          key={item?.node?.image?.uri}
          source={{uri: item?.node?.image?.uri}}
          height={140}
         
        />
      </TouchableOpacity>
    );
  }}
  style={styles.list}
/>
      }
 
      <CustomButton title='Library' type='Library' onPress={handlePhototLibrary} />
      <CustomButton title='Camera' type='Camera' onPress={handleCamera} />
      {selectedImage &&(

      <CustomButton title='Next' type='Next' onPress={handleNextPress} />
      )}
    </View>
  )
}


const styles = StyleSheet.create({
  list: {padding: 16},
  image: {
    height: 145,
    width: '33%',
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },
});

export default ImageLibraryScreen