import React from 'react';
import { Image} from 'react-native';
import { styles } from './CardImage.styles';
import { CardImageProps } from './CardImage.types';

export const CardImage: React.FC<CardImageProps> = ({ uri }: { uri: string }) => (
  <Image source={{ uri }} style={styles.image} testID="card-image"/>
);

