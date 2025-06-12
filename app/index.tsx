import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, Alert, StatusBar, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  interpolate,
  Easing 
} from 'react-native-reanimated';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Complete the auth session properly
WebBrowser.maybeCompleteAuthSession();

const { width, height } = Dimensions.get('window');

export default function LandingScreen() {
  const insets = useSafeAreaInsets();
  const rotation = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);
  
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

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

  const isDevelopment = __DEV__ || Constants.expoConfig?.extra?.development;

  return (
    <View style={{ flex: 1, backgroundColor: '#EDEADE' }}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Blurred Background Elements */}
      {/* Blue Circle Group */}
      <View style={[styles.backgroundElement, styles.backgroundElement1, styles.blurLayer]}>
        <LinearGradient
          colors={['rgba(30, 107, 200, 0.15)', 'rgba(30, 107, 200, 0.05)', 'transparent']}
          style={styles.gradientFill}
        />
      </View>
      <View style={[styles.backgroundElement, styles.backgroundElement1, styles.blurLayer2]}>
        <LinearGradient
          colors={['rgba(30, 107, 200, 0.08)', 'transparent']}
          style={styles.gradientFill}
        />
      </View>
      
      {/* Orange Circle Group */}
      <View style={[styles.backgroundElement, styles.backgroundElement2, styles.blurLayer]}>
        <LinearGradient
          colors={['rgba(255, 69, 0, 0.15)', 'rgba(255, 69, 0, 0.05)', 'transparent']}
          style={styles.gradientFill}
        />
      </View>
      <View style={[styles.backgroundElement, styles.backgroundElement2, styles.blurLayer2]}>
        <LinearGradient
          colors={['rgba(255, 69, 0, 0.08)', 'transparent']}
          style={styles.gradientFill}
        />
      </View>
      
      {/* Gold Circle Group */}
      <View style={[styles.backgroundElement, styles.backgroundElement3, styles.blurLayer]}>
        <LinearGradient
          colors={['rgba(255, 215, 0, 0.15)', 'rgba(255, 215, 0, 0.05)', 'transparent']}
          style={styles.gradientFill}
        />
      </View>
      <View style={[styles.backgroundElement, styles.backgroundElement3, styles.blurLayer2]}>
        <LinearGradient
          colors={['rgba(255, 215, 0, 0.08)', 'transparent']}
          style={styles.gradientFill}
        />
      </View>
      
      {/* Purple Circle Group */}
      <View style={[styles.backgroundElement, styles.backgroundElement4, styles.blurLayer]}>
        <LinearGradient
          colors={['rgba(156, 39, 176, 0.12)', 'rgba(156, 39, 176, 0.04)', 'transparent']}
          style={styles.gradientFill}
        />
      </View>
      <View style={[styles.backgroundElement, styles.backgroundElement4, styles.blurLayer2]}>
        <LinearGradient
          colors={['rgba(156, 39, 176, 0.06)', 'transparent']}
          style={styles.gradientFill}
        />
      </View>
      
      {/* Development Mode Indicator */}
      {isDevelopment && (
                 <View 
           style={{
             position: 'absolute',
             top: insets.top + 8,
             left: 16,
             zIndex: 10,
             backgroundColor: 'rgba(255, 165, 0, 0.9)',
             paddingHorizontal: 12,
             paddingVertical: 4,
             borderRadius: 12,
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
                height: 60,
                marginBottom: 16,
              }}
              resizeMode="contain"
            />
                         <Text 
               style={{
                 color: 'rgba(31, 41, 55, 0.85)',
                 fontSize: 18,
                 fontWeight: '300',
                 textAlign: 'center',
                 letterSpacing: 1,
               }}
             >
               Discover Your Fortune
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
            {/* Glow effect behind mandala */}
            <View 
              style={{
                position: 'absolute',
                width: width * 0.6,
                height: width * 0.6,
                backgroundColor: 'rgba(255, 165, 0, 0.08)',
                borderRadius: (width * 0.6) / 2,
                shadowColor: '#FFA500',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.3,
                shadowRadius: 25,
                elevation: 10,
              }}
            />
            
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
                 color: 'rgba(55, 65, 81, 0.8)',
                 fontSize: 16,
                 textAlign: 'center',
                 marginBottom: 32,
                 lineHeight: 24,
                 paddingHorizontal: 16,
               }}
             >
               Unlock the mysteries of your future with ancient wisdom and modern insights
             </Text>

            {/* Google Sign-In Button */}
            <TouchableOpacity
              onPress={handleGoogleSignIn}
              disabled={!request}
              style={{ width: '100%', maxWidth: 280 }}
            >
              <LinearGradient
                colors={['#4285F4', '#3367D6']}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 16,
                  paddingHorizontal: 24,
                  borderRadius: 16,
                  shadowColor: '#4285F4',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8,
                }}
              >
                <Image
                  source={{
                    uri: 'https://developers.google.com/identity/images/g-logo.png'
                  }}
                  style={{ width: 24, height: 24, marginRight: 12 }}
                  resizeMode="contain"
                />
                <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>
                  Continue with Google
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Development Skip Button */}
            {isDevelopment && (
              <TouchableOpacity
                onPress={handleSkipAuth}
                style={{ 
                  width: '100%', 
                  maxWidth: 280, 
                  marginTop: 16 
                }}
              >
                                 <View 
                   style={{
                     borderWidth: 1,
                     borderColor: 'rgba(107, 114, 128, 0.3)',
                     paddingVertical: 12,
                     paddingHorizontal: 24,
                     borderRadius: 16,
                     backgroundColor: 'rgba(255, 255, 255, 0.5)',
                   }}
                 >
                                     <Text 
                     style={{
                       color: 'rgba(55, 65, 81, 0.8)',
                       fontSize: 16,
                       fontWeight: '500',
                       textAlign: 'center',
                     }}
                   >
                     Skip Auth (Dev Only)
                   </Text>
                </View>
              </TouchableOpacity>
            )}

            {/* Terms */}
                         <Text 
               style={{
                 color: 'rgba(107, 114, 128, 0.7)',
                 fontSize: 12,
                 textAlign: 'center',
                 marginTop: 24,
                 paddingHorizontal: 16,
                 lineHeight: 16,
               }}
             >
               By continuing, you agree to our Terms of Service and Privacy Policy
             </Text>
          </Animated.View>
        </View>
      </ScrollView>

      {/* Decorative floating particles */}
      <View style={{ position: 'absolute', top: insets.top + 80, left: 16, width: 8, height: 8, backgroundColor: 'rgba(255, 165, 0, 0.3)', borderRadius: 4 }} />
      <View style={{ position: 'absolute', top: insets.top + 120, right: 32, width: 4, height: 4, backgroundColor: 'rgba(100, 150, 255, 0.4)', borderRadius: 2 }} />
      <View style={{ position: 'absolute', bottom: insets.bottom + 120, left: 48, width: 6, height: 6, backgroundColor: 'rgba(255, 100, 100, 0.3)', borderRadius: 3 }} />
      <View style={{ position: 'absolute', bottom: insets.bottom + 80, right: 16, width: 4, height: 4, backgroundColor: 'rgba(255, 200, 100, 0.4)', borderRadius: 2 }} />
    </View>
  );
}

const styles = {
  backgroundElement: {
    position: 'absolute' as const,
    borderRadius: 9999,
    overflow: 'hidden' as const,
  },
  gradientFill: {
    flex: 1,
    width: '100%' as const,
    height: '100%' as const,
  },
  backgroundElement1: {
    top: '-20%' as const,
    left: '-10%' as const,
    width: '50%' as const,
    height: '40%' as const,
  },
  backgroundElement2: {
    bottom: '-10%' as const,
    right: '-5%' as const,
    width: '40%' as const,
    height: '30%' as const,
  },
  backgroundElement3: {
    top: '40%' as const,
    right: '10%' as const,
    width: '30%' as const,
    height: '25%' as const,
  },
  backgroundElement4: {
    bottom: '30%' as const,
    left: '5%' as const,
    width: '35%' as const,
    height: '25%' as const,
  },
  blurLayer: {
    // Base layer for blur effect
  },
  blurLayer2: {
    // Outer layer for extended blur
    transform: [{ scale: 1.5 }] as const,
    opacity: 0.6,
  },
}; 