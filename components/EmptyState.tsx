import { View, Text, Image } from 'react-native'
import React from 'react'
import tw from '@/tailwind.config.native'
import {images} from '../constants';
import CustomButton from './CustomButton';
import { router } from 'expo-router';
const EmptyState = ({title, subtitle} : any) => {
  return (
    <View style={tw`justify-center items-center px-4`}>
      <Image source={images.empty} style={tw`w-[270px] h-[215px]`} resizeMode='contain'/>
        
        <Text style={tw`text-xl text-center font-psemibold text-white mt-2`}>
            {title}
        </Text>
        <Text style={tw`font-pmedium text-sm text-gray-100`}>
            {subtitle}
        </Text>
        <CustomButton 
            title="Create Video"
            handlePress={() => router.push("/create")}
            containerStyles="w-full my-5"
        />
    </View>
  )
}

export default EmptyState