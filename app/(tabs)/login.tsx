import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";
import { useFonts } from 'expo-font'; // Import the useFonts hook

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    'Poppins': require('../../assets/fonts/Poppins-Black.ttf'), // Adjust the path as needed
  });

  // If fonts are not loaded, display loading screen
  if (!fontsLoaded) {
    return (
      <SafeAreaView className="flex-1 bg-gray-800">
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg font-bold text-white">Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    if (!email || !password) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setErrorMessage(''); // Clear error message if all validations pass
    // Perform login logic here
    router.push("/postList");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-800">
      <View className="flex-1 justify-center px-5">
        <Text className="text-3xl font-bold text-center text-white mb-3" style={{ fontFamily: 'Poppins', fontWeight: "100" }}>Welcome Back</Text>
        <Text className="text-center text-gray-400 mb-8" style={{ fontFamily: 'Poppins', fontWeight: "100" }}>Share your thoughts.</Text>

        <Text className="text-lg font-semibold text-white mb-2" style={{ fontFamily: 'Poppins', fontWeight: "900" }}>Email</Text>
        <TextInput
          className="border border-gray-700 rounded-lg px-4 py-3 mb-4 text-lg text-white bg-gray-900 placeholder-gray-400"
          placeholder="hero@mondayhero.io"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text className="text-lg font-semibold text-white mb-2" style={{ fontFamily: 'Poppins', fontWeight: "900" }}>Password</Text>
        <TextInput
          className="border border-gray-700 rounded-lg px-4 py-3 mb-6 text-lg text-white bg-gray-900 placeholder-gray-400"
          placeholder="Your super strong password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {errorMessage ? (
          <Text className="text-red-500 text-center mb-4" style={{ fontFamily: 'Poppins' }}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity
          className="bg-slate-300 py-3 rounded-lg items-center mt-2 shadow-lg"
          onPress={handleLogin}
        >
          <Text className="text-white font-bold text-lg" style={{ fontFamily: 'Poppins' }}>LOGIN</Text>
        </TouchableOpacity>

        <Text className="mt-8 text-center text-gray-400" style={{ fontFamily: 'Poppins' }}>
          Have no account? <Text className="text-blue-500">Signup</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
