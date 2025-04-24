import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import { db, TimelineItem } from '../../database/db';
import AudioItem from '../../components/timeline/AudioItem';
import PhotoItem from '../../components/timeline/PhotoItem';
import SlidesItem from '../../components/timeline/SlidesItem';
import TextItem from '../../components/timeline/TextItem';
import { useTranslation } from 'react-i18next';
import VideoItem from '../../components/timeline/VideoItem';

const TimelineScreen: React.FC = () => {  
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);  
  const [loading, setLoading] = useState(true);


  const { t } = useTranslation();
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
          <View style={styles.timeKnotContainer}>
            <View style={styles.knot} />
            <Text style={styles.time}>{item.metaTime}</Text>
           
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.content}>
              {item.type === 'video' && <VideoItem data={item.data} />}
              {item.type === 'audio' && <AudioItem data={item.data} />}
              {item.type === 'photo' && <PhotoItem data={item.data} />}
              {item.type === 'text' && <TextItem data={item.data} />}
              {item.type === 'slides' && <SlidesItem data={item.data} />}
              {item.metaLocation && <Text style={styles.meta}>- {item.metaLocation}</Text>}
            </View>
                <View style={styles.metaContainer}>
                  {item.metaLocation && <Text style={styles.meta}>- {item.metaLocation}</Text>}
                </View>
          </View>
        </View>
    );
    };

    return (
      <View style={styles.rootContainer}>
        <View style={styles.line} />
        <View style={styles.container}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" style={styles.activityIndicator} />
          ) : (
              <ScrollView contentContainerStyle={styles.timelineContent}>
                {timelineItems.map(renderTimelineItem)}
              </ScrollView>
          )}
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection:'row',
    //width: 400,
    flex:1,
    justifyContent:'flex-start',

  },
  line: {
    //position: 'absolute',
    top:0,
    bottom:0,
    left: 20,
    width: 3,
    backgroundColor: '#4a90e2', // Match knot color\n
    marginLeft: 25,
    zIndex:10,
    //justifyContent:'flex-start',
  },
  container: {
    backgroundColor: '#f0f0f0',
    width:"100%",
    //justifyContent: 'flex-',
  },
  timelineContent: {
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'flex-start',
    flexDirection:'column',
    width: "100%",
  },

  itemContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingBottom: 20,
    //marginLeft: 20,
    //flex: 1,
    width: "100%",
    //backgroundColor:'gray',
  },
  timeKnotContainer: {
    //width: 80,
    flexDirection:"row",
    alignItems: 'center',
    justifyContent: 'flex-start',
    //top: 15,
    paddingBottom: 10,
    left: 20,
    width:"100%",
  },
  knot: {
    width: 10,
    height: 10,
    left: -7,
    borderRadius: 5,
    backgroundColor: '#4a90e2',
  },
  time: {
    fontSize: 10,
    color: '#888',
    textAlign: 'right',
    marginRight: 10,
  },

  contentContainer: {
    //flex: 1,
    paddingLeft: 30,
    width:'90%'
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
  activityIndicator: {
    flex: 1,
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