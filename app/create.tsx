import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

interface ContentCreationPageProps {
  // You can add navigation or data passing props here if needed
}

const ContentCreationPage: React.FC<ContentCreationPageProps> = () => {
  const [content, setContent] = useState<string>('');

  const handleSave = () => {
    // Implement your save logic here, e.g., send data to an API
    console.log('Content to save:', content);
    setContent('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Content:</Text>
      <TextInput
        style={styles.input}
        multiline
        value={content}
        onChangeText={setContent}
        placeholder="Type here..."
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    minHeight: 100,
    textAlignVertical: 'top',
  },
});

export default ContentCreationPage;