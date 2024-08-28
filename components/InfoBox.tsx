import { View, Text } from 'react-native'
import React from 'react'
import tw from '@/tailwind.config.native'

const InfoBox = ({title, subtitle, containerStyles, titleStyles} : any) => {
  return (
    <View style={tw`${containerStyles}`}>
      <Text style={tw`${titleStyles} text-white text-center font-psemibold`}>{title}</Text>
      <Text style={tw`text-sm text-gray-100 text-center font-pregural`}>{subtitle}</Text>
    </View>
  )
}

export default InfoBox