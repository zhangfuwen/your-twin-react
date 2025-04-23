import React from 'react';
import { Text } from 'react-native';
import { TextData } from '../../database/db';

interface TextItemProps {
  data: TextData;
}

const TextItem: React.FC<TextItemProps> = ({ data }) => {
  return <Text>{data.content}</Text>;
};

export default TextItem;