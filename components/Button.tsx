import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font'; // Import the useFonts hook

interface ButtonProps {
  onPress: () => void;
  title: string;
  textStyles?: string;
  containerStyles?: string;
}

const Button = ({
  onPress,
  title,
  textStyles = "",
  containerStyles = "",
}: ButtonProps) => {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    'Poppins': require('../assets/fonts/Poppins-Black.ttf'), // Adjust path as needed
  });

  // If fonts are not loaded, show loading screen
  if (!fontsLoaded) {
    return (
      <TouchableOpacity activeOpacity={0.7} className={`bg-white justify-center items-center ${containerStyles}`} onPress={onPress}>
        <Text className="font-semibold text-xl">Loading...</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`bg-white justify-center items-center ${containerStyles} `}
      onPress={onPress}
    >
      <Text
        style={{ fontFamily: 'Poppins', fontWeight:"100" }} // Apply custom font
        className={`font-semibold text-xl ${textStyles}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
