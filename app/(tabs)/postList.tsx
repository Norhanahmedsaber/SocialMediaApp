import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { usePostContext } from '../../context/PostContext';
import Profile from "../../components/Profile";
import { useFonts } from 'expo-font'; // Import expo-font
import { AntDesign } from '@expo/vector-icons'; // Optional: for search icon

export default function PostList() {
  const { posts, setPosts } = usePostContext();
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    'Poppins': require('../../assets/fonts/Poppins-Black.ttf'), // Adjust path as needed
  });

  // If fonts are not loaded, show loading screen
  if (!fontsLoaded) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-gray-900">
        <Text style={{ fontFamily: 'Poppins', color: '#ddd' }}>Loading fonts...</Text>
      </SafeAreaView>
    );
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Filter posts based on search query
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 pt-12 bg-gray-900">
      <View className="flex-1 px-6 md:px-12">
        <Profile />

        <View className="mb-4">
          <TextInput
            style={{ fontFamily: 'Poppins' }}
            className="text-white text-lg font-bold mt-4 bg-gray-800 p-4 rounded-full shadow-lg"
            placeholder="Search by title"
            placeholderTextColor="#aaa"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
            // Added left icon for search
            leftIcon={<AntDesign name="search1" size={24} color="#aaa" />}
          />
        </View>

        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push(`/postDetails/${item.id}`)}
              activeOpacity={0.7}
            >
              <View className="p-6 bg-gray-800 mb-4 rounded-lg shadow-xl">
                <Text style={{ fontFamily: 'Poppins', fontSize: 18, fontWeight: 'bold' }} className="text-white">
                  {item.title}
                </Text>
                <Text style={{ fontFamily: 'Poppins', fontSize: 14, fontWeight: '400', color: '#ccc' }} className="mt-2">
                  {item.body.length > 100 ? `${item.body.slice(0, 100)}...` : item.body}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={{ fontFamily: 'Poppins', color: '#777', fontSize: 16 }} className="text-center">
              No posts found
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}
