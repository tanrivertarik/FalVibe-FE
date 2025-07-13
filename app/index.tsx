import * as AuthSession from 'expo-auth-session';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Complete the auth session properly
WebBrowser.maybeCompleteAuthSession();

const { width, height } = Dimensions.get('window');

export default function LandingScreen() {
  const insets = useSafeAreaInsets();
  const rotation = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);
  
  // Google OAuth Configuration
  const [request, response, promptAsync] = AuthSession.useAuthRequest({
    clientId: 'YOUR_GOOGLE_CLIENT_ID', // You'll need to replace this
    scopes: ['openid', 'profile', 'email'],
    redirectUri: AuthSession.makeRedirectUri({
      scheme: 'falvibeexporeact',
      path: 'auth',
    }),
  }, {
    authorizationEndpoint: 'https://accounts.google.com/oauth2/v2/auth',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log('Authentication successful:', authentication);
      router.replace('/(tabs)');
    } else if (response?.type === 'error') {
      Alert.alert('Authentication Error', 'Failed to authenticate with Google');
    }
  }, [response]);

  useEffect(() => {
    // Start animations when component mounts
    rotation.value = withRepeat(
      withTiming(360, { 
        duration: 8000, 
        easing: Easing.linear 
      }), 
      -1, 
      false
    );
    
    scale.value = withTiming(1, { 
      duration: 1500, 
      easing: Easing.out(Easing.cubic) 
    });
    
    opacity.value = withTiming(1, { 
      duration: 2000, 
      easing: Easing.out(Easing.cubic) 
    });
  }, []);

  const animatedMandalaStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
        { scale: scale.value }
      ],
      opacity: opacity.value,
    };
  });

  const animatedContentStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { 
          translateY: interpolate(
            opacity.value,
            [0, 1],
            [30, 0]
          )
        }
      ]
    };
  });

  const handleGoogleSignIn = async () => {
    try {
      await promptAsync();
    } catch (error) {
      Alert.alert('Error', 'Failed to initiate Google Sign-In');
      console.error(error);
    }
  };

  const handleSkipAuth = () => {
    router.replace('/(tabs)');
  };

  const isDevelopment = __DEV__;

  return (
    <LinearGradient
      colors={['#fdbb2dE6', '#b21f1fE6', '#1a2a6cE6']}
      locations={[0.1, 0.55, 1]}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 0.9, y: 1 }}
      style={{ flex: 1 }}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Development Mode Indicator */}
      {isDevelopment && (
                 <View 
           style={{
             position: 'absolute',
             top: insets.top + 8,
             left: 16,
             zIndex: 10,
             backgroundColor: 'rgba(255, 255, 255, 0.2)',
             paddingHorizontal: 12,
             paddingVertical: 4,
             borderRadius: 12,
             borderColor: 'rgba(255, 255, 255, 0.3)',
             borderWidth: 1,
           }}
         >
           <Text style={{ color: 'white', fontSize: 12, fontWeight: '600' }}>DEV MODE</Text>
         </View>
      )}

      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View 
          style={{
            flex: 1,
            paddingTop: insets.top + 40,
            paddingBottom: insets.bottom + 20,
            paddingHorizontal: 24,
            minHeight: height,
          }}
        >
          
          {/* Logo Section */}
          <Animated.View 
            style={[
              animatedContentStyle,
              {
                alignItems: 'center',
                marginBottom: 40,
              }
            ]}
          >
            <Image
              source={require('@/assets/images/falvibe-logo-new.png')}
              style={{
                width: width * 0.7,
                height: 100,
                marginBottom: 16,
              }}
              resizeMode="contain"
            />
            <Text 
               style={{
                 color: 'rgba(255, 255, 255, 0.85)',
                 fontSize: 18,
                 fontWeight: '300',
                 textAlign: 'center',
                 letterSpacing: 1,
               }}
             >
               Geleceğini Keşfet
             </Text>
          </Animated.View>

          {/* Mandala Section */}
          <View 
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 20,
            }}
          >
            {/* Glow effect behind mandala removed */}
            
            <Animated.View 
              style={[
                animatedMandalaStyle,
                {
                  alignItems: 'center',
                  justifyContent: 'center',
                }
              ]}
            >
              <Image
                source={require('@/assets/images/mandala.png')}
                style={{
                  width: width * 0.55,
                  height: width * 0.55,
                }}
                resizeMode="contain"
              />
            </Animated.View>
          </View>

          {/* Bottom Section */}
          <Animated.View 
            style={[
              animatedContentStyle,
              {
                alignItems: 'center',
                paddingTop: 20,
              }
            ]}
          >
            {/* Tagline */}
                         <Text 
               style={{
                 color: 'rgba(255, 255, 255, 0.8)',
                 fontSize: 16,
                 textAlign: 'center',
                 marginBottom: 32,
                 lineHeight: 24,
                 paddingHorizontal: 16,
               }}
             >
               CATCH PHRASE
             </Text>

            {/* Google Sign-In Button */}
            <TouchableOpacity 
              onPress={handleGoogleSignIn}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                paddingVertical: 16,
                paddingHorizontal: 24,
                borderRadius: 30,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 5,
                marginBottom: 16,
              }}
            >
              <Image 
                source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
                style={{ width: 24, height: 24, marginRight: 12 }}
              />
              <Text style={{ color: '#2C3E50', fontSize: 16, fontWeight: '600' }}>
                Sign in with Google
              </Text>
            </TouchableOpacity>

            {/* Skip Button */}
            <TouchableOpacity onPress={handleSkipAuth}>
                           <Text 
                 style={{
                   color: 'rgba(255, 255, 255, 0.7)',
                   fontSize: 14,
                   fontWeight: '500',
                   padding: 8,
                 }}
               >
                 Giriş Yapmadan Devam Et (DEV MODE)
               </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({}); 