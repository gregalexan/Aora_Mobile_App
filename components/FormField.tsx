import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import tw from '@/tailwind.config.native'
import {icons} from '../constants';

const FormField = ({title, value, placeholder, handleChangeText, otherStyles, ...props} : any) => {
    const [showPassword, setShowPassword] = useState(false)
  return (
    <View style={[tw`-2 ${otherStyles}`]}>
      <Text style={tw`text-base text-gray-100 font-pmedium`}>{title}</Text>
      <View 
        style={tw`border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row`}
        >
            <TextInput 
                style={tw`flex-1 text-white font-psemibold text-base`}
                value={value}
                placeholder={placeholder}
                placeholderTextColor="#7b7b8b"
                onChangeText={handleChangeText}
                secureTextEntry={title==="Password" && !showPassword}
            />
            {title === "Password" && (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image 
                            source={!showPassword ? icons.eye : icons.eyeHide}
                            style={tw`w-6 h-6`}
                            resizeMode='contain'
                        />
                </TouchableOpacity>
            )}
      </View>
    </View>
  )
}

export default FormField