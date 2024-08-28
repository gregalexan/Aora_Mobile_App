import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from '@/tailwind.config.native'
import FormField from '@/components/FormField'
import { Video, ResizeMode } from 'expo-av'
import { icons } from '@/constants'
import CustomButton from '@/components/CustomButton'
import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router'


const Create = () => {
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: ''
  })

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync(
      {
        type: selectType === 'image' ? ['image/png', 'image/jpg'] : ['video/mp4', 'video/gif']
      }
    )
    if (!result.canceled) {
      if (selectType === 'image') {
        setForm({...form, thumbnail: result.assets[0]})
      }
      if (selectType === 'video') {
        setForm({...form, video: result.assets[0]})
      }
    } else {
      setTimeout(() => {
        Alert.alert('Document picked', JSON.stringify(result, null, 2))
      }, 100)
    }
  }


  const submit = () => {
      if (!form.prompt || !form.title || !form.thumbnail || !form.video) {
        return Alert.alert("Please fill in all the fields")
      }
      setUploading(true)
      try {  
          
          Alert.alert("Success", 'Post uploaded successfully')
          router.push('/home')

      } catch (error) {
        Alert.alert("Error")
      } finally {
        setForm({
          title: '',
          video: null,
          thumbnail: null,
          prompt: ''
        })
        setUploading(false)
      }
  }
  return (
    <SafeAreaView style={tw`bg-primary h-full`}>
      <ScrollView style={tw`px-4 my-6`}>
          <Text style={tw`text-2xl text-white font-psemibold`}>
            Upload Video
          </Text>
          <FormField 
              title="Video Title"
              value={form.title}
              placeholder="Give your video a catch title"
              handleChangeText={(e: any) => setForm({...form, title: e})}
              otherStyles="mt-10"
          />
          <View style={tw`mt-7 mb-2`}>
              <Text style={tw`text-base text-gray-100 font-pmedium`}>
                Upload Video
              </Text>
              <TouchableOpacity onPress={() => openPicker('video')}>
                {form.video ? (
                  <Video 
                      source={{uri: form.video.uri}}
                      style={tw`w-full h-64 rounded-2xl`}
                      useNativeControls
                      resizeMode={ResizeMode.COVER}
                      isLooping
                  />
                ) : (
                  <View style={tw`w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center`}>
                      <View style={tw`w-14 h-14 border border-dashed border-secondary-100 justify-center items-center`}>
                        <Image 
                          source={icons.upload}
                          resizeMode='contain'
                          style={tw`w-1/2 h-1/2`}
                        />
                      </View>
                  </View>
                )}
              </TouchableOpacity>
          </View>
          <View style={tw`mt-7 mb-2`}>
              <Text style={tw`text-base text-gray-100 font-pmedium`}>
                Thumbnail Image
              </Text>
              <TouchableOpacity onPress={() => openPicker('image')}>
                {form.thumbnail ? (
                  <Image 
                      source={{uri: form.thumbnail.uri}}
                      resizeMode='cover'
                      style={tw`w-full h-64 rounded-2xl`}
                  />
                ) : (
                  <View style={tw`w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row mr-2`}>
                        <Image 
                          source={icons.upload}
                          resizeMode='contain'
                          style={tw`w-5 h-5`}
                        />
                        <Text style={tw`text-sm text-gray-100 font-pmedium ml-2`}>
                          Choose a file
                        </Text>
                  </View>
                )}
              </TouchableOpacity>
          </View>
          <FormField 
              title="AI Prompt"
              value={form.prompt}
              placeholder="The Prompt you used to create this video"
              handleChangeText={(e: any) => setForm({...form, prompt: e})}
              otherStyles="mt-7"
          />
          <CustomButton 
            title="Submit & Publish"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={uploading}
          />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create