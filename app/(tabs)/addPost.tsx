import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import Button from "../../components/Button";
import { usePostContext } from '../../context/PostContext';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons

export default function AddPost() {
  const { posts, setPosts } = usePostContext();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const router = useRouter();

  const handleAddPost = async () => {
    // Input validation
    if (!title || !body) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return;
    }

    // API request to add post
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body }),
      });

      if (response.ok) {
        const newPost = await response.json();

        // Add the new post at the beginning of the posts list
        setPosts([newPost, ...posts]);

        // Reset form and notify user
        setTitle('');
        setBody('');
        Alert.alert('Success', 'Post added successfully');

        // Navigate back to PostList
        router.push("/postList");
      } else {
        Alert.alert('Error', 'Failed to add post');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while adding the post');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-800">
      <View className="flex-1 justify-start px-5">
        <Ionicons 
          name="arrow-back" 
          size={30} 
          color="white" 
          onPress={() =>router.push("/postList")} 
          style={{ marginTop: 20, marginBottom: 10 }} 
        />

        <View className='justify-center flex-1'>
        <Text className="text-3xl font-bold text-center text-white mb-3">New Thought?</Text>
        <Text className="text-center text-gray-400 mb-8">Share your thoughts with the world!</Text>

        <Text className="text-lg font-semibold text-white mb-2">Subject</Text>
        <TextInput
          className="border border-gray-700 rounded-lg px-4 py-3 mb-4 text-lg text-white bg-gray-900 placeholder-gray-400"
          placeholder="Title"
          placeholderTextColor="#888"
          value={title}
          onChangeText={setTitle}
          autoCapitalize="none"
        />

        <Text className="text-lg font-semibold text-white mb-2 ">Post</Text>
        <TextInput
          className="border border-gray-700 rounded-lg px-4 py-3 mb-6 text-lg text-white bg-gray-900 placeholder-gray-400"
          placeholder="Body"
          placeholderTextColor="#888"
          value={body}
          onChangeText={setBody}
          multiline
        />

        <Button
          containerStyles="bg-slate-200 py-3 rounded-lg items-center mt-2 shadow-lg"
          onPress={handleAddPost}
          title="Add POST"
        />
        </View>
      </View>
    </SafeAreaView>
  );
}
