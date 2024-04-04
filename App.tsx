import React from 'react'
import { SafeAreaView } from 'react-native'

import MainStack from './src/navigation/mainStack'


export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainStack />
    </SafeAreaView>
  )
}
