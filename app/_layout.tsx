import { Stack} from "expo-router"
import Toast from 'react-native-toast-message';
import { PostProvider } from '../context/PostContext';
import { FontProvider } from '../context/FontContext';  // Font context

export default function RootLayout(){
    return(
        <FontProvider>
            <PostProvider>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{headerShown:false}} />
                    <Stack.Screen name="index" options={{headerShown:false}} />
                    <Toast />
                    </Stack>
            </PostProvider>
        </FontProvider>


    )
}
