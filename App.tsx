import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import MainStack from './src/navigation/mainStack'


export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <MainStack />
    </SafeAreaView>
  )
}
