import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import tw from 'twrnc'; // Tailwind CSS


export default function App() {
  return (
    <View style={tw`flex-1 items-center justify-center bg-white`}>
      <Text style={[tw`text-3xl`, {fontFamily: 'Poppins-Black'}]}>Aora!</Text>
      <StatusBar style='auto' />
      <Link href="/profile" style={{color: 'blue'}}>Go to Profile</Link>
    </View>
  );
}
