import React from 'react'
import { Tabs } from 'expo-router'

export default function tabsLayout() {
  return (
    <Tabs screenOptions={{headerShown:false}}>
        <Tabs.Screen name='login' options={{  headerShown: false, tabBarStyle: { display: 'none' }}}/>
        <Tabs.Screen name='addPost' options={{  headerShown: false, tabBarStyle: { display: 'none' }}}/>
         <Tabs.Screen name='editPost/[postId]' options={{  headerShown: false, tabBarStyle: { display: 'none' }}}/>
        <Tabs.Screen name='postDetails/[postId]' options={{  headerShown: false, tabBarStyle: { display: 'none' }}}/> 
        <Tabs.Screen name='postList' options={{  headerShown: false, tabBarStyle: { display: 'none' }}}/>
    </Tabs>
  )
}