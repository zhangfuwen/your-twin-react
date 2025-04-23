import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { db, TimelineItem } from '../../database/db';
import AudioItem from '../../components/timeline/AudioItem';
import PhotoItem from '../../components/timeline/PhotoItem';
import SlidesItem from '../../components/timeline/SlidesItem';
import TextItem from '../../components/timeline/TextItem';
import VideoItem from '../../components/timeline/VideoItem';

const TimelineScreen: React.FC = () => {  
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);  
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const loadTimelineItems = async () => {     setLoading(true);
      try {        db.initialize();        const timelineData = await db.query('', []);        setTimelineItems(timelineData);
      } catch (error) {
        console.error("Failed to load timeline items:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTimelineItems();
  }, []);

  const renderTimelineItem = (item: TimelineItem, index: number) => {
    return (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.time}>{item.metaTime}</Text>
          <View style={styles.timeKnotContainer}>
            <View style={styles.knot} />
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.content}>
              {item.type === 'video' && <VideoItem data={item.data} />}
              {item.type === 'audio' && <AudioItem data={item.data} />}
              {item.type === 'photo' && <PhotoItem data={item.data} />}
              {item.type === 'text' && <TextItem data={item.data} />}
              {item.type === 'slides' && <SlidesItem data={item.data} />}
              <View style={styles.metaContainer}>
                  {item.metaLocation && <Text style={styles.meta}>- {item.metaLocation}</Text>}
                </View>
              {item.comment && <Text style={styles.comment}>{item.comment}</Text>}
            </View>
                <View style={styles.metaContainer}>
                  {item.metaLocation && <Text style={styles.meta}>- {item.metaLocation}</Text>}
                </View>
          </View>
        </View>
    );
    };

    return (
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ScrollView contentContainerStyle={styles.timelineContent}>
            {timelineItems.map(renderTimelineItem)}
          </ScrollView>
        )}
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  timelineContent: {
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'flex-start',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 20,
    marginLeft: 20,
  },
  timeKnotContainer: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    top: 15,
  },
  time: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginRight: 10,
  },
  knot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4a90e2',
  },
  contentContainer: {
    flex: 1,
    paddingLeft: 20,
  },
  content: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  comment: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
  },
  metaContainer: {
    marginTop: 10,
    alignItems: 'flex-start',
  },
  meta: {
    fontSize: 12,
    color: '#888',
  },
  transcription: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
  },
});

export default TimelineScreen;