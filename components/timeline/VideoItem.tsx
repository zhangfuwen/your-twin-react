import React, { useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { VideoData } from '../../database/db';

interface VideoItemProps {
  data: VideoData;
}

const VideoItem: React.FC<VideoItemProps> = ({ data }) => {
  if (!data.url) {
    return (
        <View style={styles.container}>
            <Text style={styles.placeholderText}>Video not available</Text>
        </View>
    );
  }  
    const [isError, setIsError] = useState(false);
    const placeholderImage = require('../../assets/images/icon.png');
  return (
    <View>
        <View style={styles.container}>
            <Image
                source={isError ? placeholderImage : { uri: data.url }}
                style={styles.image}
                onError={() => setIsError(true)}
            />
        </View>
        {isError && <Text style={styles.text}>Content is not accessible</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
    text: {
        color: 'black',
        textAlign: 'center',
        marginTop: 5,
    },
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
  }, placeholderText: {
    color: 'white',
    fontSize: 16,
  },
});

export default VideoItem;