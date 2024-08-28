import { View, Text, FlatList} from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from '@/tailwind.config.native'
import SearchInput from '@/components/SearchInput'
import EmptyState from '@/components/EmptyState'
import { searchPosts } from '@/lib/appwrite'
import useAppwrite from '../../lib/useAppwrite';
import VideoCard from '@/components/VideoCard'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {
  const {query} = useLocalSearchParams();

  const {data: posts, refetch} = useAppwrite(
    () => searchPosts(query)
  );
  
  useEffect(() => {
    refetch();
  }, [query])
  
  return (
    <SafeAreaView style={tw`bg-primary border-2 h-full`}>
      <FlatList 
          data={posts}
          keyExtractor={(item: any) => item.$id}
          renderItem={({item}) => (
              <VideoCard video={item}/>
          )}
          ListHeaderComponent={() => (
            <View style={tw`my-6 px-4`}>  
                <Text style={tw`font-pmedium text-sm text-gray-100`}>
                  Search Results
                </Text>
                <Text style={tw`text-2xl font-psemibold text-white`}>
                  {query}
                </Text>
                <View style={tw`mt-6 mb-8`}>
                  <SearchInput initialQuery={query}/>
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

export default Search