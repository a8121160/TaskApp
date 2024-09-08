module.exports = function (api) {
  api.cache(true);
  return {
    // 'module:metro-react-native-babel-preset' を削除して 'babel-preset-expo' のみを残す
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv', {
        moduleName: '@env',
        path: '.env',
      }],
    ],
  };
};
