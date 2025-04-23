import React from 'react';
import { Image } from 'react-native';
import { PhotoData } from '../../database/db';

interface PhotoItemProps {
  data: PhotoData;
}

const PhotoItem: React.FC<PhotoItemProps> = ({ data }) => {
  return <Image source={{ uri: data.url }} style={{ width: 200, height: 200 }} />;
};

export default PhotoItem;