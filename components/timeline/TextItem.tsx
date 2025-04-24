import React from 'react';
import { Text } from 'react-native';
import { TextData } from '../../database/db';

interface TextItemProps {
  data: TextData;
}

const TextItem: React.FC<TextItemProps> = ({ data }) => {
  return (
    <Text>
      {data.content ? data.content : 'Text not available'}
    </Text>
  );
};

export default TextItem;