import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import tw from '@/tailwind.config.native'
import {icons} from '../constants';
import WebView from 'react-native-webview';
import { ResizeMode, Video } from 'expo-av';

const VideoCard = ({video: {title, thumbnail, video, creator: { username, avatar}}} : any) => {
    const [play, setPlay] = useState(false)
  return (
    <View style={tw`flex-col items-center px-4 mb-14`}>
        <View style={tw`flex-row gap-3 items-start`}>
            <View style={tw`justify-center items-center flex-row flex-1`}>
                <View style={tw`w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5`}>
                    <Image 
                        source={{uri: avatar}}
                        style={tw`w-full h-full rounded-lg`}
                        resizeMode='cover'
                    />
                </View>
                <View style={tw`justify-center flex-1 ml-3 gap-y-1`}>
                    <Text style={tw`text-white font-psemibold text-sm`} numberOfLines={1}>
                        {title}
                    </Text>
                    <Text style={tw`text-xs text-gray-100 font-pregular`} numberOfLines={1}>
                        {username}
                    </Text>
                </View>
            </View>
            <View style={tw`pt-2`}>
                <Image source={icons.menu} style={tw`w-5 h-5`} resizeMode='contain'/>
            </View>
        </View>
        {play ? (
            <>
            {}
            <WebView // This should be Video but doesn't work for some reason. So changed it with WebView
                source={{uri: video}}
                style={tw`w-100 h-60 rounded-xl mt-3`}
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
            {}
            </>
        ) : (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setPlay(true)}
                style={tw`w-full h-60 rounded-xl mt-3 relative justify-center items-center`}
            >
                <Image source={{uri: thumbnail}} style={tw`w-full h-full rounded-xl mt-3`} resizeMode='cover'/>
                <Image source={icons.play} style={tw`w-12 h-12 absolute`} resizeMode='contain'/>
            </TouchableOpacity>
        )}
    </View>
  )
}

export default VideoCard