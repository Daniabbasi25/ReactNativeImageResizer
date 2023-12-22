import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
   
} from 'react-native';
import React, {useState} from 'react';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

type Picture = {
  fileName: string;
  height: number;
  width: number;
  uri: string;
};
const App = () => {
  const [selectedImage, setSelectedImage] = useState<Picture | undefined>();
  const [selectedResolution, setSelectedResolution] = useState<{ width: number, height: number }|null>(null);

  const handleCamera = async () => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        presentationStyle: 'popover',
      });

      if (result.didCancel) {
        console.log('cancelled');
        return;
      }
      if (result.errorMessage) {
        Alert.alert(result.errorMessage);
        return;
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
      if (result.errorMessage) {
        Alert.alert(result.errorMessage);
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
      }
    } catch (error) {
      Alert.alert('Something went wrong');
    }
  };

  const resizeImage = async () => {
    if (selectedResolution) {
      const { width, height } = selectedResolution;
      const resizedImage = await ImageResizer.createResizedImage(selectedImage?.uri, width, height, 'JPEG', 100);

      // Save the resized image to the gallery
      CameraRoll.save(resizedImage.uri, { type: 'photo', album: 'YourAlbumName' })
        .then(() => {
          console.log('Image saved to gallery');
        })
        .catch((error) => {
          console.error('Error saving image to gallery:', error);
        });
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {selectedImage && <Image 
      source={{uri: selectedImage.uri}}
      style={{width:300,height:300}}
       />}

      <Button title="Upload Image From Gallery" onPress={handlePhototLibrary} />
      <Button title="Take Picture" onPress={handleCamera} />

      <Button title="1080x1920" onPress={() => setSelectedResolution({ width: 1080, height: 1920 })} />
      <Button title="2160x3840" onPress={() => setSelectedResolution({ width: 2160, height: 3840 })} />
      <Button title="1080x1350" onPress={() => setSelectedResolution({ width: 1080, height: 1350 })} />
      <Button title="2160x2700" onPress={() => setSelectedResolution({ width: 2160, height: 2700 })} />
      <Button title="Export" onPress={resizeImage} />

    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
