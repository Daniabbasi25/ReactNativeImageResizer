import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ImageResizer from 'react-native-image-resizer';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

//@ts-ignore
const ResizeScreen = ({navigation,route}) => {
    const selectedImage=route.params
    const [selectedResolution, setSelectedResolution] = useState<{ width: number, height: number }|null>(null);
    const resizeImage = async () => {
        if (selectedResolution &&selectedImage) {
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
    <View>
         {selectedImage && <Image
      source={{uri: selectedImage.uri}}
      style={{width:300,height:300}}
       />}

    <Button title="1080x1920" onPress={() => setSelectedResolution({ width: 1080, height: 1920 })} />
      <Button title="2160x3840" onPress={() => setSelectedResolution({ width: 2160, height: 3840 })} />
      <Button title="1080x1350" onPress={() => setSelectedResolution({ width: 1080, height: 1350 })} />
      <Button title="2160x2700" onPress={() => setSelectedResolution({ width: 2160, height: 2700 })} />
      <Button title="Export" onPress={resizeImage} />
    </View>
  )
}

export default ResizeScreen

const styles = StyleSheet.create({})