import React from 'react';
import { View, Image } from 'react-native';
import { SlidesData } from '../../database/db';

interface SlidesItemProps {
  data: SlidesData;
}

const SlidesItem: React.FC<SlidesItemProps> = ({ data }) => {
  return (
    <View>
      {data.urls.map((url, index) => (
        <Image key={index} source={{ uri: url }} style={{ width: 200, height: 200 }} />
      ))}
    </View>
  );
};

export default SlidesItem;