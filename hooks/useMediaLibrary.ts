import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

interface MediaLibraryHook {
  selectMedia: () => Promise<ImagePicker.ImagePickerResult | null>;
  media: ImagePicker.ImagePickerResult | null;
}

const useMediaLibrary = (): MediaLibraryHook => {
  const [media, setMedia] = useState<ImagePicker.ImagePickerResult | null>(null);

  const selectMedia = async (): Promise<ImagePicker.ImagePickerResult | null> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.error('Media library permissions not granted');
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setMedia(result);
      return result;
    } else {
      return null;
    }
  };

  return {
    selectMedia,
    media,
  };
};

export default useMediaLibrary;