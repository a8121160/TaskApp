import 'dotenv/config';

export default {
  expo: {
    name: "TaskApp",
    slug: "TaskApp",
    scheme: "TaskApp",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      openaiApiKey: process.env.REACT_APP_OPENAI_API_KEY
    },
    plugins: [
      "expo-router"
    ]
  }
};
