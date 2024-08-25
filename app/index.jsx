import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '../tailwind.config.native'; // Import custom configuration
import {images} from '../constants';
import CustomButton from '@/components/CustomButton';
import { useGlobalContext } from '@/context/GlobalProvider';

export default function App() {
  const {isLoading, isLoggedIn} = useGlobalContext();
  if (!isLoading && isLoggedIn) {
    return <Redirect href="/home" />
  }
  return (
    <SafeAreaView style={tw`bg-primary h-full`}>
      <ScrollView contentContainerStyle={{height: '100%'}}>
          <View style={tw`w-full justify-center items-center h-full px-4`}>
              <Image 
                source={images.logo}
                style={tw`w-[130px] h-[84px]`}
                resizeMode='contain'
              />
              <Image 
                source={images.cards}
                style={tw`max-w-[380px] w-full h-[300px]`}
                resizeMode='contain'
              />
              <View style={tw`relative mt-5`}>
                  <Text style={tw`text-3xl text-white font-bold text-center`}>
                      Discover Endless Possibilities with {' '}
                      <Text style={tw`text-secondary-200`}>
                        Aora
                      </Text>
                  </Text>
                  <Image 
                    source={images.path}
                    style={tw`w-[136px] h-[15px] absolute -bottom-2 -right-8`}
                    resizeMode='contain'
                  />
              </View>
              <Text style={tw`text-sm font-pregular text-gray-100 mt-7 text-center`}>
                Where creativity meets innovation: embark on a journey of limitless exploration with Aora
              </Text>
              <CustomButton title="Continue with Email" handlePress={() => router.push('/sign-in')} containerStyles="w-full mt-7"/>
          </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  );
}
