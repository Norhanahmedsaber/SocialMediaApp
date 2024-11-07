// PostContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

// Define types for the Post
type Post = {
  id: number;
  title: string;
  body: string;
};

type PostContextType = {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  handlePostDeleted: (deletedPostId: number) => void;
  handlePostEdited: (editedPost: Post) => void;
};

// Create the context
const PostContext = createContext<PostContextType | undefined>(undefined);

// Create a provider component
export const PostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  // Function to delete a post
  const handlePostDeleted = (deletedPostId: number) => {
    setPosts((prevPosts) => prevPosts.filter(post => post.id !== deletedPostId));
  };

  // Function to edit a post
  const handlePostEdited = (editedPost: Post) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === editedPost.id ? editedPost : post))
    );
  };

  return (
    <PostContext.Provider value={{ posts, setPosts, handlePostDeleted, handlePostEdited }}>
      {children}
    </PostContext.Provider>
  );
};

// Custom hook to use PostContext
export const usePostContext = () => {
  const context = React.useContext(PostContext);
  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return context;
};
