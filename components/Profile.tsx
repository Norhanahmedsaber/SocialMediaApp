import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { BellIcon } from 'react-native-heroicons/outline';
import userImage from "../assets/images/user.png";
import moreImage from "../assets/images/add.png";
import Icon from './Icon';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font'; // Import expo-font

export default function Profile() {
  const router = useRouter();

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    'Poppins': require('../assets/fonts/Poppins-Black.ttf'), // Adjust path as needed
  });

  // If fonts are not loaded, show loading screen
  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-900">
        <Text style={{ fontFamily: 'Poppins', color: '#ddd' }}>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <View>
      <View className="flex-row items-center justify-between px-5 py-4 bg-gray-800 shadow-md rounded-lg">
        <View className="flex-row justify-center items-center">
          <Image
            source={userImage}
            style={{ width: 40, height: 40, borderRadius: 22 }} />
          <Text style={{ fontFamily: 'Poppins', fontWeight: "900", color: '#fff' }} className="pl-3 text-lg">
            Hello, Ready for new thoughts?
          </Text>
        </View>
        <View className="flex-row items-center space-x-4">
          {/* More Icon with Background */}
          <Icon 
            onPress={() => router.push("/addPost")} 
            source={moreImage} 
            imageStyle={{
              width: 24, height: 24, borderRadius: 12, backgroundColor: '#333', padding: 5
            }} 
          />
          {/* Notification Icon with Better Interactivity */}
          <TouchableOpacity activeOpacity={0.7}>
            <BellIcon size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
