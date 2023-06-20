import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';


export function useFont() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          'Nunito-Regular': require('../../assets/fonts/Nunito-Regular.ttf'),
          'Nunito-SemiBold': require('../../assets/fonts/Nunito-SemiBold.ttf'),
          'Nunito-Bold': require('../../assets/fonts/Nunito-Bold.ttf'),
        });
      } catch (loadCachedResourcesError) {
        console.log(loadCachedResourcesError);
      } finally {
        console.log("loaded")
        setLoadingComplete(true);
        await SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}