import { View, Text, FlatList, TouchableOpacity, ImageBackground, ViewStyle, TextStyle, ImageStyle, Image, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import tw from '@/tailwind.config.native'
import * as Animatable from 'react-native-animatable';
import { icons } from '@/constants';
import {Video, ResizeMode, } from 'expo-av';
import {WebView} from 'react-native-webview';

const zoomIn = {
  0: {
    transform: [{ scale: 0.9 }],
  },
  1: {
    transform: [{ scale: 1.1 }],
  },
}// as Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle>;

const zoomOut = {
  0: {
    transform: [{ scale: 1 }],
  },
  1: {
    transform: [{ scale: 0.9 }],
  },
} // as Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle>;

const TrendingItem = ({activeItem, item} : any) => {
  const [play, setPlay] = useState(false);
  const animation = activeItem === item.$id ? zoomIn : zoomOut;

  return (
    <Animatable.View 
      style={tw`mr-5`}
      animation={animation} 
      duration={500}
    >
      {play ? (
        <>
        {}
        <WebView // This should be Video but doesn't work for some reason. So changed it with WebView
          source={{uri: item.video}}
          style={tw`w-52 h-72 rounded-[35px] mt-3 bg-white/10`}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onError={(error) => {
            console.log('Video Error:', error);
            Alert.alert('Error', 'Failed to load video.');
          }}
          onPlaybackStatusUpdate={(status : any) => {
              if (status.didJustFinish) {
                setPlay(false);
              }
          }}
        />
        </>
      ) : (
        <TouchableOpacity style={tw`relative justify-center items-center`} activeOpacity={0.7} onPress={() => setPlay(true)}>
            <ImageBackground 
              source={{uri: item.thumbnail}}
              style={tw`w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40`} 
              resizeMode='cover'
            />
            <Image 
              source={icons.play}
              style={tw`w-12 h-12 absolute`}
              resizeMode='contain'
            />
        </TouchableOpacity>
      )}
    </Animatable.View>
  )
}

const Trending = ({posts} : any) => {
  const flatListRef = useRef<FlatList>(null);
  useEffect(() => {
    // Scroll to offset when the component mounts
    flatListRef.current?.scrollToOffset({ offset: 170, animated: false });
  }, []);

  const [activeItem, setActiveItem] = useState(posts[1]);
  const viewableItemsChange = ({viewableItems} : any) => {
      if (viewableItems.length > 0) {
        setActiveItem(viewableItems[0].key)
      }
  }

  return (
    <FlatList
        ref={flatListRef}
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
            <TrendingItem 
                activeItem={activeItem}
                item={item}
            />
        )}
        onViewableItemsChanged={viewableItemsChange}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70
        }}
        contentOffset={{x: 170}}
        horizontal
    />
  )
}

export default Trending