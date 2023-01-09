module.exports = {
  preset: "react-native",
  setupFiles: ["./jest-setup.js"],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@react-native|react-native|react-native-vector-icons|react-native-reanimated)/)",
  ],
  testEnvironment: "node",
  testRunner: "jasmine2",
};
