module.exports = {
  root: true
, parser: '@typescript-eslint/parser'
, plugins: [
    '@typescript-eslint'
  ]
, extends: [
    'eslint:recommended'
  , 'plugin:@typescript-eslint/recommended'
  ]
, rules: {
    'no-constant-condition': 'off'
  , 'require-yield': 'off'
  , 'no-empty': 'off'
  , '@typescript-eslint/no-inferrable-types': 'off'
  , '@typescript-eslint/ban-types': 'off'
  }
}
