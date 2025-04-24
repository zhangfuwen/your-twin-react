import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface ContentCreationProps {
  // Define props if needed
}

const ContentCreation: React.FC<ContentCreationProps> = () => {
  const [content, setContent] = useState<string>('');
  const [media, setMedia] = useState<string | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasAudioPermission, setHasAudioPermission] = useState(false);
  const [recording, setRecording] = useState<any>(null);
  const navigation = useNavigation();

  useEffect(() => {
    // Request permissions for camera and audio
    Camera.requestCameraPermissionsAsync().then(({ status }) => {
      setHasCameraPermission(status === 'granted');
    });

    Audio.requestPermissionsAsync().then(({ status }) => {
      setHasAudioPermission(status === 'granted');
    });
  }, []);

  const startRecording = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recordingInstance = new Audio.Recording();
      await recordingInstance.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recordingInstance.startAsync();
      setRecording(recordingInstance);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setMedia(uri);
      setRecording(null);
    }
  };

  const handleTakePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMedia(result.assets[0].uri);
    }
  };
  const handlePickMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMedia(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    // Save media locally
    if (media) {
      const filename = media.split('/').pop();
      const newPath = FileSystem.documentDirectory + filename;

      await FileSystem.copyAsync({
        from: media,
        to: newPath,
      });
      console.log(`Media moved to ${newPath}`);
    }

    console.log('Content to save:', content, media);

    setContent('');
    setMedia(null);
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer} >
      <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
        <IconSymbol name={'camera'} size={30} color={'#fff'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handlePickMedia}>
        <IconSymbol name={'photo'} size={30} color={'#fff'} />
      </TouchableOpacity>
      {hasAudioPermission && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => (recording ? stopRecording() : startRecording())}>
          <IconSymbol name={'mic'} size={30} color={'#fff'} />
        </TouchableOpacity>
      )}
      {media && (
        <Image source={{ uri: media }} style={{ width: 200, height: 200 }} />
      )}
      <TextInput style={styles.input} multiline value={content} onChangeText={setContent} placeholder="Enter content here..." />
      <Button title="Save" onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
    contentContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
  },
});

export default ContentCreation;