import React from 'react';
import { Image } from 'react-native';
import { AudioData } from '../../database/db';

interface AudioItemProps {
  data: AudioData;
}

const AudioItem: React.FC<AudioItemProps> = ({ data }) => {
  return (
    <Image source={{ uri: data.url }} style={{ width: 200, height: 200 }} />
  );
};

export default AudioItem;