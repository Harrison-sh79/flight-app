npm i @types/react-native @types/styled-components-react-native -D

# @types/react-native@0.73.0: This is a stub types definition. react-native provides its own type definitions, so you do not need this installed.

npx expo install expo-blur expo-linear-gradient react-dom react-native-reanimated react-native-web

npm i nativewind
npm i tailwindcss@3.3.2 -D

# global.d.ts文件，添加/// <reference types="nativewind/types" />

npx tailwindcss init

# content: ["./App.{js,jsx,ts,tsx}", "./<custom directory>/**/*.{js,jsx,ts,tsx}"],

#plugins: ["nativewind/babel"],