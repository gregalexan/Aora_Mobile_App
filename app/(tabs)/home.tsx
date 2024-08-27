import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from '@/tailwind.config.native'
import {images} from '../../constants'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import EmptyState from '@/components/EmptyState'
import { getAllPosts, getLatestPosts } from '@/lib/appwrite'
import useAppwrite from '../../lib/useAppwrite';
import VideoCard from '@/components/VideoCard'

const Home = () => {
  const {data: posts, refetch} = useAppwrite(getAllPosts);
  const {data: latestPosts} = useAppwrite(getLatestPosts);
  
  //Alert.alert(String(latestPosts))
  const [refreshing, setRefreshing] = useState(false)
  
  const onRefresh = async () => {
    setRefreshing(true)
    await refetch();
    setRefreshing(false);
  }
  
  return (
    <SafeAreaView style={tw`bg-primary border-2 h-full`}>
      <FlatList 
          data={posts}
          keyExtractor={(item: any) => item.$id} // I don't know why this is an error
          renderItem={({item}) => (
              <VideoCard video={item}/>
          )}
          ListHeaderComponent={() => (
            <View style={tw`my-6 px-4 mb-6`}>
                <View style={tw`justify-between items-start flex-row mb-6`}>
                    <View>
                        <Text style={tw`font-pmedium text-sm text-gray-100`}>
                          Welcome Back
                        </Text>
                        <Text style={tw`text-2xl font-psemibold text-white`}>
                          Gregory
                        </Text>
                    </View>
                    <View style={tw`mt-1.5`}>
                        <Image 
                          source={images.logoSmall}
                          style={tw`w-9 h-10`}
                          resizeMode='contain'
                        />
                    </View>
                </View>
                <SearchInput />
                <View style={tw`w-full flex-1 pt-5 pb-8`}>
                    <Text style={tw`text-gray-100 font-pregular mb-3 text-lg`}>
                      Latest Videos
                    </Text>
                    
                    <Trending 
                      posts={latestPosts}
                    />
                </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState 
              title="No videos found"
              subtitle="Be the first one to upload a video"
            />
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default Home