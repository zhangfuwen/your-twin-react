import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';
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
  Platform,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import AudioItem from '@/components/timeline/AudioItem';
import PhotoItem from '@/components/timeline/PhotoItem';
import TextItem from '@/components/timeline/TextItem';
import VideoItem from '@/components/timeline/VideoItem';
import { TimelineItem } from '@/database/db';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface ContentCreationProps {
  // Define props if needed
}

const ContentCreation: React.FC<ContentCreationProps> = () => {
  const [timelineItem, setTimelineItem] = useState<TimelineItem>({
    type: 'text',
    data: '',
    metaTime: '',
    comment: '',
  });
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasAudioPermission, setHasAudioPermission] = useState(false);
  const [recording, setRecording] = useState<any>(null);

  const setContent = (content: string) =>
    setTimelineItem(prev => ({ ...prev, data: content }));
  const setMedia = (media: string) => setTimelineItem(prev => ({ ...prev, data: media }));
  const navigation = useNavigation();
  const { t } = useTranslation();

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
      setMedia(uri || "");
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
    if (timelineItem.data) {
      const filename = timelineItem.data.split('/').pop();
      const newPath = FileSystem.documentDirectory + filename;
    
      await FileSystem.copyAsync({
        from: media,
        to: newPath,
      });
      console.log(`Media moved to ${newPath}`);
    }

    console.log('Content to save:', timelineItem);

    setTimelineItem({
      type: 'text',
      data: '',
      metaTime: '',
      comment: '',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.previewContainer}>
        {timelineItem.type === 'video' && <VideoItem data={timelineItem.data} />}
        {timelineItem.type === 'audio' && <AudioItem data={timelineItem.data} />}
        {timelineItem.type === 'photo' && <PhotoItem data={timelineItem.data} />}
        {timelineItem.type === 'text' && <TextItem data={timelineItem.data} />}
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
            <IconSymbol name={'camera'} size={30} color={'#fff'} />
          </TouchableOpacity>
          <Text style={styles.buttonText}>{t('Camera')}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePickMedia}>
            <IconSymbol name={'photo'} size={30} color={'#fff'} />
          </TouchableOpacity>
          <Text style={styles.buttonText}>{t('Album')}</Text>
        </View>
        {hasAudioPermission && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => (recording ? stopRecording() : startRecording())}>
              <IconSymbol name={'mic'} size={30} color={'#fff'} />
            </TouchableOpacity>
            <Text style={styles.buttonText}>{t('Microphone')}</Text>
          </View>
        )}
        <TextInput style={styles.input} multiline value={timelineItem.data} onChangeText={setContent} placeholder={t("Enter content here...")} />
        <Button title="Save" onPress={handleSave} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'column', // Arrange children vertically
  },
  previewContainer: {
    flex: 1, // Take up half of the available space
    //backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    //flex: 1, // Take up half of the available space
    alignItems: 'center',
    marginHorizontal: 10, // Add margin to the left and right
    marginVertical: 10
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
    buttonText: {
    marginTop: 5,
  }
});

export default ContentCreation;