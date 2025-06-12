# Google OAuth Setup Instructions

## Steps to configure Google OAuth for your FalVibe app:

### 1. Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API and Google OAuth2 API

### 2. Configure OAuth Consent Screen
1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in the required fields:
   - App name: FalVibe
   - User support email: your email
   - Developer contact information: your email
4. Add scopes: `openid`, `profile`, `email`
5. Add test users (your email and other testers)

### 3. Create OAuth 2.0 Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. For application type, choose:
   - **iOS**: Bundle ID should match your app.json `ios.bundleIdentifier`
   - **Android**: Package name should match your app.json `android.package`
   - **Web**: For Expo development

### 4. Configure Redirect URIs
Add these redirect URIs to your OAuth client:
- For development: `https://auth.expo.io/@your-expo-username/falvibeexporeact`
- For production: `falvibeexporeact://auth`

### 5. Update the Landing Page
Replace `YOUR_GOOGLE_CLIENT_ID` in `app/landing.tsx` with your actual Google Client ID.

### 6. Test the Authentication
1. Run your app with `npm start`
2. Try the Google Sign-In button
3. Check the console for authentication success messages

## Important Notes:
- For iOS, you may need to add the client ID to your `app.json` under `ios.config.googleSignIn.clientId`
- For Android, you may need to add the SHA-1 fingerprint to your Google Cloud project
- In production, make sure to use the production client ID, not the development one

## Environment Variables (Optional)
Consider using environment variables for the client ID:
```typescript
clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID'
``` 