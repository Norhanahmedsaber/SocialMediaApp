import React from 'react';
import { TouchableOpacity, Image, ImageSourcePropType, StyleProp, ImageStyle, ViewStyle } from 'react-native';

interface IconProps {
  onPress: () => void;
  source: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}

const Icon: React.FC<IconProps> = ({ onPress, source, style, imageStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Image
        source={source}
        style={[{ width: 20, height: 20, borderRadius: 10 }, imageStyle]}
      />
    </TouchableOpacity>
  );
};

export default Icon;
