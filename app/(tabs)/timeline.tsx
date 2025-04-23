import { BottomTabBar } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

interface TimelineItem {
  type: 'photo' | 'text' | 'audio' | 'video' | 'slides';
  data: any;
  comment?: string;
  meta?: {
    time: string;
    location?: string;
  };
}

const TimelineScreen: React.FC = () => {
  const timelineItems: TimelineItem[] = [
    {
      type: 'photo',
      data: require('../../assets/images/react-logo.png'),
      comment: 'React logo at the beginning of the timeline.',
      meta: { time: '2023-10-27 18:30', location: 'Beach' },
    },
    {
      type: 'text',
      data: 'Just finished reading an amazing book! Highly recommend it to everyone.',
      meta: { time: '2023-10-27 15:00' },
    },
    {
      type: 'audio',
      data: {
        url: 'audio-url',
        transcription: 'This is a transcription of the audio content.',
      },
      comment: 'Recorded a new song idea!',
      meta: { time: '2023-10-27 12:00' },
    },
    {
      type: 'video',
      data: {
        url: 'video-url',
        transcription: 'Video about our amazing trip to the mountains.',
      },
      comment: 'Highlight of the trip!',
      meta: { time: '2023-10-27 09:00', location: 'Mountain' },
    },
    {
      type: 'slides',
      data: ['Slide 1', 'Slide 2', 'Slide 3'],
      meta: { time: '2023-10-26 20:00' },
    },
  ];

  const renderTimelineItem = (item: TimelineItem, index: number) => {
    let content;

    switch (item.type) {
      case 'photo':
        content = (
          <View style={styles.contentContainer}>
            <Image source={item.data} style={styles.image} resizeMode="contain" />
          </View>
        );
        break;
      case 'text':
        content = (
          <View style={styles.contentContainer}>
            <Text style={styles.text}>{item.data}</Text>
          </View>
        );
        break;
      case 'audio':
        content = (
          <View style={styles.contentContainer}>
            <Text style={styles.text}>Audio: {item.data.url}</Text>
            <Text style={styles.transcription}>Transcription: {item.data.transcription}</Text>
          </View>
        );
        break;
      case 'video':
        content = (
          <View style={styles.contentContainer}>
            <Text style={styles.text}>Video: {item.data.url}</Text>
            <Text style={styles.transcription}>Transcription: {item.data.transcription}</Text>
          </View>
        );
        break;
      case 'slides':
        content = (
          <View style={styles.contentContainer}>
            {item.data.map((slide, slideIndex) => (
              <Text key={slideIndex} style={styles.text}>{slide}</Text>
            ))}
          </View>
        );
        break;
      default:
        content = <Text>Unsupported item type</Text>;
    }

    return (
      <View>
        <View style={styles.knot} />
        <Text style={styles.time}>{item.meta.time}</Text>

      <View key={index} style={styles.itemWrapper}>
        <View style={styles.itemContainer}>
          <View style={styles.content}>
            {content}
            {item.comment && <Text style={styles.comment}>{item.comment}</Text>}
            {item.meta && (
              <View style={styles.metaContainer}>
                {item.meta.location && <Text style={styles.meta}> - {item.meta.location}</Text>}
              </View>
            )}
          </View>
        </View>
   
        
      </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.timelineContainer}>
        <View style={styles.line} />
        {timelineItems.map(renderTimelineItem)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  timelineContainer: {
    paddingLeft: 40,
    paddingRight: 20,
  },

  itemWrapper: {
    marginBottom: 30,
    marginLeft: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  itemContainer: {
    position: 'relative',
  },
  line: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 39,
    width: 2,
    backgroundColor: '#4a90e2', // Match knot color\n
    marginLeft: 5,
  },
  knot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'lightblue',
    left: 0,
    top: 10,
    zIndex: 1,
  },
  time: {
    color: "gray",
    top: -2,
    fontSize: 10,
    left: 15,
  },
  content: {
    flex: 1,
    alignSelf: 'flex-start',
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 5,
  },
  text: {
    fontSize: 15,
    color: '#333',
  },
  transcription: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
  },
  comment: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
    textAlign: 'left',
  },
  metaContainer: {
    flexDirection: 'row', // Keep items (time, location) inline
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  meta: {
    fontSize: 13,
    color: '#888', // Adjust color as needed
  },
});

export default TimelineScreen;