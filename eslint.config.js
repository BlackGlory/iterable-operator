import js from '@eslint/js'
import ts from 'typescript-eslint'

export default ts.config(
  js.configs.recommended
, ...ts.configs.recommended
, {
    rules: {
      'require-yield': 'off'
    , '@typescript-eslint/no-explicit-any': 'off'
    , '@typescript-eslint/no-unused-vars': 'off'
    }
  }
)
