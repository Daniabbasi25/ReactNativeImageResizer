import {Button, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ImageResizer from 'react-native-image-resizer';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import CustomButton from '../components/CustomButton';
import { showMessage } from 'react-native-flash-message';

//@ts-ignore
const ResizeScreen = ({navigation, route}) => {
  const selectedImage = route.params;
  const [selectedResolution, setSelectedResolution] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const resizeImage = async () => {
    if (selectedResolution && selectedImage) {
      const {width, height} = selectedResolution;
      const resizedImage = await ImageResizer.createResizedImage(
        selectedImage?.uri,
        width,
        height,
        'JPEG',
        100,
      );

      // Save the resized image to the gallery
      CameraRoll.save(resizedImage.uri, {type: 'photo', album: 'YourAlbumName'})
        .then(() => {
          showMessage({
            type:'success',
            message:'Image save to gallery successfully'
          })
          navigation.goBack()
         })
        .catch(error => {
          console.error('Error saving image to gallery:', error);
          showMessage({
            type:'danger',
            message:`Error saving image to gallery:${error}`
          })
        });
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {selectedImage && (
        <Image
          source={{uri: selectedImage.uri}}
          style={{width: 300, height: 300}}
        />
      )}

      <Button
        title="1080x1920"
        onPress={() => setSelectedResolution({width: 1080, height: 1920})}
        color={selectedResolution?.width === 1080 && selectedResolution?.height===  1920 ? 'green' : undefined}
      />
      <Button
        title="2160x3840"
        onPress={() => setSelectedResolution({width: 2160, height: 3840})}
        color={selectedResolution?.width === 2160 && selectedResolution?.height===  3840 ? 'green' : undefined}

      />
      <Button
        title="1080x1350"
        onPress={() => setSelectedResolution({width: 1080, height: 1350})}
        color={selectedResolution?.width === 1080 && selectedResolution?.height===  1350 ? 'green' : undefined}

      />
      <Button
        title="2160x2700"
        onPress={() => setSelectedResolution({width: 2160, height: 2700})}
        color={selectedResolution?.width === 2160 && selectedResolution?.height===  2700 ? 'green' : undefined}

      />
      {selectedResolution &&(

      <CustomButton title="Export" type='Next' onPress={resizeImage} />
      )}
 
    </View>
  );
};

export default ResizeScreen;

const styles = StyleSheet.create({});
