import { View, Text, ScrollView, Image, Dimensions, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from '@/tailwind.config.native'
import {images} from '../../constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import {createUser} from '../../lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';

const {height: screenHeight} = Dimensions.get('window');
const containerHeight = screenHeight * 0.85 // 85vh

const SignUp = () => {
  const {setUser, setIsLoggedIn} = useGlobalContext();
  
  const [form, setForm] = useState({
      username: '',
      email: '',
      password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all the fields")
    }

    setIsSubmitting(true);
    
    try {
        const result = await createUser(form.email, form.password, form.username);
        
        setUser(result);
        setIsLoggedIn(true);
        
        router.replace("/home")
    } catch (error) {
        Alert.alert("Error", String(error))
    } finally {
      setIsSubmitting(false);
    }

  }
  return (
    <SafeAreaView style={tw`bg-primary h-full`}>
        <ScrollView>
          <View style={[tw`w-full justify-center px-4 my-6`, {minHeight: containerHeight}]}>
                <Image source={images.logo} resizeMode='contain' style={tw`w-[115px] h-[35px]`}/>
                <Text style={tw`text-2xl text-white text-semibold mt-10 font-psemibold`}>Sign Up to Aora</Text>
                <FormField 
                    title="Username"
                    value={form.username}
                    handleChangeText={(e: string) => setForm({...form, username: e})}
                    otherStyles="mt-10"
                />
                <FormField 
                    title="Email"
                    value={form.email}
                    handleChangeText={(e: string) => setForm({...form, email: e})}
                    otherStyles="mt-7"
                    keyboardType="email-address"
                />
                <FormField 
                    title="Password"
                    value={form.password}
                    handleChangeText={(e: string) => setForm({...form, password: e})}
                    otherStyles="mt-7"
                />
                <CustomButton 
                    title="Sign Up"
                    handlePress={submit}
                    containerStyles="mt-7"
                    isLoading={isSubmitting}
                />
                <View style={tw`justify-center pt-5 flex-row gap-2`}>
                    <Text style={tw`text-lg text-gray-100 font-pregular`}>
                      Have an account already ?
                    </Text>
                    <Link href="/sign-in" style={tw`text-lg font-psemibold text-secondary`}>Sign In</Link>
                </View>
          </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp