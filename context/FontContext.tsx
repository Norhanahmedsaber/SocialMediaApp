
import React, { createContext, useState, useEffect } from 'react';
import { useFonts } from 'expo-font';

// Create a context for font loading state
export const FontContext = createContext();

// Create a provider for the context
export const FontProvider = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Use expo-font to load fonts
  const [isFontLoaded] = useFonts({
    'Poppins': require('../assets/fonts/Poppins-Black.ttf'),
  });

  useEffect(() => {
    if (isFontLoaded) {
      setFontsLoaded(true); // Update state once fonts are loaded
    }
  }, [isFontLoaded]);

  return (
    <FontContext.Provider value={{ fontsLoaded }}>
      {children}
    </FontContext.Provider>
  );
};
