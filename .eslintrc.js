module.exports = {
  // 全局API
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  },
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    'vue/no-mutating-props': 'off'
  },
  overrides: [
    {
      files: ['src/api/**/*.ts'],
      rules: {
        camelcase: 'off'
      }
    },
    {
      files: ['src/**/*.vue'],
      rules: {
        'vue/multi-word-component-names': ['off'],
        'import/prefer-default-export': ['off']
      }
    }
  ]
}
