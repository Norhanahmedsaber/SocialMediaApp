import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { usePostContext } from '../../../context/PostContext';
import userImage from "../../../assets/images/user.png";

export default function PostDetails() {
  const { postId } = useLocalSearchParams();
  const { posts, handlePostDeleted, handlePostEdited } = usePostContext();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchedPost = posts.find((p) => p.id === parseInt(postId));
    if (fetchedPost) {
      setPost(fetchedPost);
      setTitle(fetchedPost.title); // Set initial title
      setBody(fetchedPost.body); // Set initial body
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [postId, posts]);

  const handleDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this post?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            handlePostDeleted(post.id);
            router.push('/postList');
          },
        },
      ]
    );
  };

  const toggleEditMode = () => setIsEditing((prev) => !prev);

  const handleSaveEdit = () => {
    const editedPost = { ...post, title, body };
    handlePostEdited(editedPost);
    setIsEditing(false);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#00bfff" />;
  }

  if (!post) {
    return <Text className="text-white text-center mt-4">Post not found.</Text>;
  }

  return (
    <View className="flex-1 bg-gray-900 p-4">
      <TouchableOpacity onPress={() => router.push('/postList')} className="absolute top-10 left-4 z-10">
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <View className="flex-row items-center mt-16">
        <Image source={userImage} className="w-12 h-12 rounded-full mr-4" />
        <Text className="text-white text-lg font-semibold">User {post.userId}</Text>
      </View>

      <View className="mt-6">
        {isEditing ? (
          <>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Edit Title"
              className="text-white text-xl font-bold mb-2 bg-gray-800 p-3 rounded"
              multiline
            />
            <TextInput
              value={body}
              onChangeText={setBody}
              placeholder="Edit Body"
              className="text-gray-400 text-base bg-gray-800 p-3 rounded mt-2"
              multiline
            />
          </>
        ) : (
          <>
            <Text className="text-white text-xl font-bold mb-2">{title}</Text>
            <Text className="text-gray-400 text-base">{body}</Text>
          </>
        )}
      </View>

      <View className="flex-row justify-between mt-4">
        <TouchableOpacity onPress={handleDelete} className="p-2">
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
        {isEditing ? (
          <TouchableOpacity onPress={handleSaveEdit} className="p-2">
            <Ionicons name="checkmark" size={24} color="green" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={toggleEditMode} className="p-2">
            <Ionicons name="pencil" size={24} color="blue" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
