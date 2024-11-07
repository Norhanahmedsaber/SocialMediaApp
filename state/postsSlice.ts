import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async actions
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  console.log(response.json)
  return response.json();
});

export const addPost = createAsyncThunk('posts/addPost', async (newPost: { title: string, body: string }) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(newPost),
    headers: { 'Content-Type': 'application/json' },
  });
  return response.json();
});

export const deletePost = createAsyncThunk('posts/deletePost', async (postId: number) => {
  await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, { method: 'DELETE' });
  return postId;
});

export const editPost = createAsyncThunk('posts/editPost', async (updatedPost: { id: number, title: string, body: string }) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedPost),
    headers: { 'Content-Type': 'application/json' },
  });
  return response.json();
});

// Slice
const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',  // 'loading' | 'succeeded' | 'failed'
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
      })
      .addCase(editPost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      });
  },
});

export default postsSlice.reducer;
