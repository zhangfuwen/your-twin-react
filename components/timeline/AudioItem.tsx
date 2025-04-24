import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { AudioData } from '../../database/db';

interface AudioItemProps {
  data: AudioData;
}

const placeholderImage = require('../../assets/images/icon.png');

const AudioItem: React.FC<AudioItemProps> = ({ data }) => {
  const [isError, setIsError] = useState<boolean>(false);

  if (!data.url) {
    return <Text>Audio not available</Text>;
  }

  return (
    <View>
      <Image
        source={isError ? placeholderImage : { uri: data.url }}
        style={{ width: 200, height: 200 }}
        onError={() => setIsError(true)}
      />
      {isError && <Text>Content is not accessible</Text>}
    </View>
  );
};

export default AudioItem;


