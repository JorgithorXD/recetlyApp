import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import MainStack from './src/navigation/StackNavigation'
import { DataProvider } from './src/utils/DataContext'

export default function App() {
  return (
    <DataProvider>
      <SafeAreaView style={{ flex: 1, height: "100%" }}>
        <MainStack />
      </SafeAreaView>
    </DataProvider>
  )
}
