// @eslint/js - это официальный плагин с рекомендуемыми правилами ESLint
import js from '@eslint/js';

// Другие плагины (примеры)
import globals from 'globals';

export default [
  // Базовые рекомендуемые правила от ESLint
  js.configs.recommended,

  // Дополнительные настройки
  {
    files: ['**/*.js'],
    ignores: ['**/node_modules/**', '**/dist/**', "**/support"],
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      "no-prototype-builtins": "warn",
      "dot-notation": "warn",
      "accessor-pairs": "warn",
      "no-unused-vars": "warn",
      "getter-return": "warn",
      "no-setter-return": "warn"
    }
  }
];