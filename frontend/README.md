## Smart Plug App – Frontend

React Native / Expo frontend for the Smart Plug App. This project is configured as an Expo app (see `expo` dependency in `package.json`) and targets iOS, Android, and web.

### Tech stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation (bottom tabs, material top tabs, native stack)
- **Charts & visualizations**: `react-native-chart-kit`, `victory-native`, `@shopify/react-native-skia`
- **Animations**: `lottie-react-native`, `@lottiefiles/dotlottie-react`
- **Forms & validation**: `formik`, `yup`
- **Storage & device APIs**: `@react-native-async-storage/async-storage`, `expo-location`, `expo-secure-store`, `expo-camera`, `expo-linear-gradient`

### Getting started

1. **Install dependencies**

   ```bash
   cd frontend
   npm install
   # or
   yarn
   ```

2. **Set up environment variables**

   Create a `.env` file in the `frontend` directory (do not commit this file). Add any required variables, for example:

   ```bash
   API_BASE_URL=https://your-backend-url.com
   ```

3. **Run the app**

   ```bash
   # Start Expo
   npm start
   # or
   yarn start

   # Platform-specific
   npm run android
   npm run ios
   npm run web
   ```

### Scripts

- **`npm start`**: Start the Expo dev server.
- **`npm run android`**: Run the app on an Android device or emulator.
- **`npm run ios`**: Run the app on an iOS simulator (macOS only).
- **`npm run web`**: Run the Expo app in a web browser.
- **`npm run demo:build`**: Build using the `demo` EAS profile.
- **`npm run demo:deploy`**: Deploy using the `demo` EAS profile.

### Project structure (high level)

Common Expo / React Native layout (your actual folders may differ):

- `app` or `src`: Application screens, navigation, components, hooks, and utilities.
- `assets`: Images, fonts, Lottie files, and other static assets.
- `app.json` / `expo.json`: Expo configuration.

### Notes

- Remember to keep `.env` and other secret files out of Git.
- For building and deploying with EAS, make sure you have the Expo CLI and EAS CLI configured and logged in.

