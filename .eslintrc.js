module.exports = {
   env: {
      browser: true,
      es2021: true
   },
   extends: ['plugin:react/recommended', 'standard'],
   parser: '@typescript-eslint/parser',
   parserOptions: {
      ecmaFeatures: {
         jsx: true
      },
      ecmaVersion: 'latest',
      sourceType: 'module'
   },
   plugins: ['react', '@typescript-eslint'],
   ignorePatterns: ['**/interfaces/**/*.ts'],
   rules: {
      'indent': ['error', 3],
      'space-before-function-paren': [
         'error',
         {
            anonymous: 'always',
            named: 'never',
            asyncArrow: 'always'
         }
      ]
   }
}
