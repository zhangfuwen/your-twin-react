import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import placeholderImage from '../../assets/images/icon.png';
import { PhotoData } from '../../database/db';

interface PhotoItemProps {
  data: PhotoData;
}

const PhotoItem: React.FC<PhotoItemProps> = ({ data }) => {
  const [imageError, setImageError] = useState<boolean>(false);

  return (
    <View>
      {data.url && !imageError ? (
        <Image
          source={{ uri: data.url }}
          style={{ width: 200, height: 200 }}
          onError={() => setImageError(true)}
        />
      ) : (
        <View>
          <Image
            source={placeholderImage}
            style={{ width: 200, height: 200 }}
          />
          <Text>Content is not accessible</Text>
        </View>
      )}
      {!data.url && (
        <Text>Photo not available</Text>
      )}
    </View>
  );
};

export default PhotoItem;