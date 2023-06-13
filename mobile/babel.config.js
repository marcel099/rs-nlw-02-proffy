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
            '@configs': './src/shared/configs',
            '@contexts': './src/shared/contexts',
            '@dtos': './src/shared/contexts',
            '@routes': './src/routes',
            '@services': './src/shared/services',
            '@utils': './src/shared/utils',
            '@assets': './src/shared/assets',
          }
        }
      ]
    ]
  };
};
