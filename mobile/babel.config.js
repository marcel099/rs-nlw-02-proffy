module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo'
    ],
    plugins: [
      'inline-dotenv',
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: [
            '.ts',
            '.tsx',
            '.js',
            '.json'
          ],
          alias: {
            '@components': './src/components',
            '@screens': './src/screens',
            '@configs': './src/configs',
            '@contexts': './src/contexts',
            '@dtos': './src/contexts',
            '@routes': './src/routes',
            '@services': './src/services',
            '@assets': './src/assets',
          }
        }
      ]
    ]
  };
};
