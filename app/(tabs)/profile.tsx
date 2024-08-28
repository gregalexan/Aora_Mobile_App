import { View, Text, FlatList, TouchableOpacity, Image} from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from '@/tailwind.config.native'
import SearchInput from '@/components/SearchInput'
import EmptyState from '@/components/EmptyState'
import { getUserPosts, searchPosts, signOut } from '@/lib/appwrite'
import useAppwrite from '../../lib/useAppwrite';
import VideoCard from '@/components/VideoCard'
import { useLocalSearchParams } from 'expo-router'
import { useGlobalContext } from '@/context/GlobalProvider'
import { icons } from '@/constants'
import InfoBox from '@/components/InfoBox'
import {router}from 'expo-router';

const Profile = () => {
  const {user, setUser, setIsLoggedIn} = useGlobalContext();

  const {data: posts} = useAppwrite(
    () => getUserPosts(user.$id)
  );
  
  const logout = async () => {
      await signOut();
      setUser(null)
      setIsLoggedIn(null)
      router.replace('/sign-in')
  }
  return (
    <SafeAreaView style={tw`bg-primary border-2 h-full`}>
      <FlatList 
          data={posts}
          keyExtractor={(item: any) => item.$id}
          renderItem={({item}) => (
              <VideoCard video={item}/>
          )}
          ListHeaderComponent={() => (
            <View style={tw`w-full justify-center items-center mt-6 mb-12 px-4`}>
                <TouchableOpacity style={tw`w-full items-end mb-10`} onPress={logout}> 
                  <Image source={icons.logout} resizeMode='contain' style={tw`w-6 h-6`} />
                </TouchableOpacity>
                <View style={tw`w-16 h-16 border border-secondary rounded-lg justify-center items-center`}>
                    <Image source={{uri: user?.avatar}} style={tw`w-[90%] h-[90%] rounded-lg`} resizeMode='cover'/>
                </View>
                <InfoBox 
                  title={user?.username}
                  containerStyles='mt-5'
                  titleStyles="text-lg"
                />
                <View style={tw`mt-5 flex-row`}>
                    <InfoBox 
                      title={posts.length || 0}
                      subtitle="Posts"
                      containerStyles='mr-10'
                      titleStyles="text-xl"
                    />
                    <InfoBox 
                      title="1.2k"
                      subtitle="Followers"
                      titleStyles="text-xl"
                    />  
                </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState 
              title="No videos found"
              subtitle="No videos found for this search query"
            />
          )}
      />
    </SafeAreaView>
  )
}

export default Profile