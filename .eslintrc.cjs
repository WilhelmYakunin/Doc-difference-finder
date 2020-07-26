module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'no-console': 0,
    'import/extensions': 0,
  },
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
};
