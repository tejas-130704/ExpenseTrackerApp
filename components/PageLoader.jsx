import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { styles } from '@/assets/styles/pageloader.styles'
import SharinganLoader from './SharinganLoader'

const PageLoader = () => {
  return (
    <View style={styles.loaderContainer}>
      <SharinganLoader />
    </View>
  )
}

export default PageLoader