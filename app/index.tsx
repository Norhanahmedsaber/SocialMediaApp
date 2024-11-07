import { ImageBackground, SafeAreaView, Text, View } from 'react-native';
import Button from "../components/Button";
import connectionsImage from "../assets/images/connections.jpg";
import AppGradient from '../components/AppGradient';
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useFonts } from 'expo-font'; // Import expo-font for custom fonts
import "../global.css";

import Animated, { FadeInDown } from "react-native-reanimated";

export default function Home() {
  const router = useRouter();

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    'Poppins': require('../assets/fonts/Poppins-Black.ttf'), // Adjust path as needed
  });

  // If fonts are not loaded, show loading screen
  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ImageBackground
        source={connectionsImage}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient
          // Background Linear Gradient
          colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.8)"]}
        >
          <SafeAreaView className="flex flex-1 px-1 justify-between">
            <Animated.View
              entering={FadeInDown.delay(300)
                .mass(0.5)
                .stiffness(80)
                .springify(20)}
            >
              <Text
                style={{ fontFamily: 'Poppins', fontSize: 32, fontWeight: 'bold' }} // Apply custom font
                className="text-center text-white"
              >
                Welcome!
              </Text>
              <Text
                style={{ fontFamily: 'Poppins', fontSize: 24, fontWeight: 'normal' }} // Apply custom font
                className="text-center text-slate-300 mt-3"
              >
                Share your thoughts
              </Text>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(300)
                .mass(0.5)
                .stiffness(80)
                .springify(20)}
            >
              <Button
                onPress={() => router.push("/login")}
                title="Get Started"
                containerStyles='bg-white rounded-xl min-h-[62px] justify-center items-center text-4xl'
              />
            </Animated.View>

            <StatusBar style="light" />
          </SafeAreaView>
        </AppGradient>
      </ImageBackground>
    </View>
  );
}
