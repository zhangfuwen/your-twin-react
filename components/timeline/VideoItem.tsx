import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { VideoData } from '../../database/db';

interface VideoItemProps {
  data: VideoData;
}

const VideoItem: React.FC<VideoItemProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: data.url }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default VideoItem;