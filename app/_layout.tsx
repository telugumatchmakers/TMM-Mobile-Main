import { Stack } from "expo-router";
import { store } from '../store/store'
import { Provider } from 'react-redux'
import "./global.css"
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { tokenCache } from "../scripts/utils/cache";

const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

if (!clerkPublishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}

export default function RootLayout() {
  return (
    // <Provider store={store}> <Stack /></Provider>
    <ClerkProvider publishableKey={clerkPublishableKey!} tokenCache={tokenCache}>   
      <ClerkLoaded>
      <Provider store={store}> <Stack /></Provider>
       </ClerkLoaded>
    </ClerkProvider>
    
  ) ;
}
